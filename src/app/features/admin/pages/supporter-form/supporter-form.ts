import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SupportersService } from '../../../../core/services/supporters/supporters';

@Component({
  selector: 'app-supporter-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './supporter-form.html',
  styleUrl: './supporter-form.scss',
})
export class SupporterFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private supportersService = inject(SupportersService);

  supporterForm: FormGroup;
  isEditMode = signal(false);
  supporterId = signal<number | null>(null);
  imagePreview = signal<string | null>(null);
  isUploading = signal(false);
  selectedFile: File | null = null;

  constructor() {
    this.supporterForm = this.fb.group({
      name: ['', Validators.required],
      link_url: [''],
      tier: ['standard', Validators.required],
      active: [true, Validators.required],
      image_url: [''],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.supporterId.set(id);
      this.isEditMode.set(true);
      this.loadSupporter(id);
    }
  }

  async loadSupporter(id: number): Promise<void> {
    const supporter = await this.supportersService.getSupporterById(id);
    if (supporter) {
      this.supporterForm.patchValue(supporter);
      if (supporter.image_url) {
        this.imagePreview.set(supporter.image_url);
      }
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => this.imagePreview.set(reader.result as string);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.supporterForm.invalid) {
      this.supporterForm.markAllAsTouched();
      return;
    }

    this.isUploading.set(true);
    let imageUrl = this.supporterForm.value.image_url || '';

    if (this.selectedFile) {
      const uploadedUrl = await this.supportersService.uploadLogo(this.selectedFile);
      if (!uploadedUrl) {
        alert('Falha ao fazer upload da logo. O apoiador não foi salvo.');
        this.isUploading.set(false);
        return;
      }
      imageUrl = uploadedUrl;
    }

    if (!imageUrl) {
      alert('A logo do apoiador é obrigatória.');
      this.isUploading.set(false);
      return;
    }

    const formValue = {
      ...this.supporterForm.value,
      image_url: imageUrl,
      active: this.supporterForm.value.active === true || this.supporterForm.value.active === 'true',
    };

    if (this.isEditMode() && this.supporterId()) {
      await this.supportersService.updateSupporter(this.supporterId()!, formValue);
    } else {
      await this.supportersService.createSupporter(formValue);
    }

    this.isUploading.set(false);
    this.router.navigate(['/admin/supporters']);
  }

  isInvalid(controlName: string): boolean {
    const control = this.supporterForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}
