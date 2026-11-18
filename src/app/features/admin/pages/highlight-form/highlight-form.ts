import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HighlightsService } from '../../../../core/services/highlights/highlights';

@Component({
  selector: 'app-highlight-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './highlight-form.html',
  styleUrl: './highlight-form.scss',
})
export class HighlightFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private highlightsService = inject(HighlightsService);

  highlightForm: FormGroup;
  isEditMode = signal(false);
  highlightId = signal<number | null>(null);
  imagePreview = signal<string | null>(null);
  existingFileUrl = signal<string | null>(null);
  isUploading = signal(false);

  selectedImageFile: File | null = null;
  selectedPdfFile: File | null = null;

  constructor() {
    this.highlightForm = this.fb.group({
      title: ['', Validators.required],
      summary: [''],
      cta_label: ['Baixar documento', Validators.required],
      link_url: [''],
      image_url: [''],
      file_url: [''],
      starts_at: [''],
      ends_at: [''],
      sort_order: [0, Validators.required],
      active: [true, Validators.required],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.highlightId.set(id);
      this.isEditMode.set(true);
      this.loadHighlight(id);
    }
  }

  async loadHighlight(id: number): Promise<void> {
    const highlight = await this.highlightsService.getHighlightById(id);
    if (!highlight) return;

    this.highlightForm.patchValue({
      ...highlight,
      starts_at: this.toDatetimeLocal(highlight.starts_at),
      ends_at: this.toDatetimeLocal(highlight.ends_at),
    });

    if (highlight.image_url) {
      this.imagePreview.set(highlight.image_url);
    }
    if (highlight.file_url) {
      this.existingFileUrl.set(highlight.file_url);
    }
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImageFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => this.imagePreview.set(reader.result as string);
      reader.readAsDataURL(this.selectedImageFile);
    }
  }

  onPdfSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedPdfFile = input.files[0];
    }
  }

  clearPdf(): void {
    this.selectedPdfFile = null;
    this.existingFileUrl.set(null);
    this.highlightForm.patchValue({ file_url: '' });
  }

  async onSubmit(): Promise<void> {
    if (this.highlightForm.invalid) {
      this.highlightForm.markAllAsTouched();
      return;
    }

    this.isUploading.set(true);

    let imageUrl = this.highlightForm.value.image_url || null;
    let fileUrl = this.highlightForm.value.file_url || this.existingFileUrl() || null;
    const linkUrl = (this.highlightForm.value.link_url || '').trim() || null;

    if (this.selectedImageFile) {
      const uploadedUrl = await this.highlightsService.uploadImage(this.selectedImageFile);
      if (!uploadedUrl) {
        alert('Falha ao fazer upload da imagem. O destaque não foi salvo.');
        this.isUploading.set(false);
        return;
      }
      imageUrl = uploadedUrl;
    }

    if (this.selectedPdfFile) {
      const uploadedUrl = await this.highlightsService.uploadDocument(this.selectedPdfFile);
      if (!uploadedUrl) {
        alert('Falha ao fazer upload do PDF. O destaque não foi salvo.');
        this.isUploading.set(false);
        return;
      }
      fileUrl = uploadedUrl;
    }

    if (!fileUrl && !linkUrl) {
      alert('Informe um PDF para download ou um link de destino.');
      this.isUploading.set(false);
      return;
    }

    const formValue = {
      title: this.highlightForm.value.title,
      summary: this.highlightForm.value.summary || null,
      cta_label: this.highlightForm.value.cta_label,
      link_url: linkUrl,
      image_url: imageUrl,
      file_url: fileUrl,
      starts_at: this.fromDatetimeLocal(this.highlightForm.value.starts_at),
      ends_at: this.fromDatetimeLocal(this.highlightForm.value.ends_at),
      sort_order: Number(this.highlightForm.value.sort_order) || 0,
      active:
        this.highlightForm.value.active === true || this.highlightForm.value.active === 'true',
      status: true,
    };

    if (this.isEditMode() && this.highlightId()) {
      await this.highlightsService.updateHighlight(this.highlightId()!, formValue);
    } else {
      await this.highlightsService.createHighlight(formValue);
    }

    this.isUploading.set(false);
    this.router.navigate(['/admin/highlights']);
  }

  isInvalid(controlName: string): boolean {
    const control = this.highlightForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  private toDatetimeLocal(value?: string | null): string {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';

    const pad = (n: number) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  private fromDatetimeLocal(value?: string | null): string | null {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return date.toISOString();
  }
}
