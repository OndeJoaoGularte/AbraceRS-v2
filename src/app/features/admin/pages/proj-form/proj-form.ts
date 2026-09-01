import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { ProjectsService } from '../../../../core/services/projects/projects';

@Component({
  selector: 'app-proj-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, QuillModule],
  templateUrl: './proj-form.html',
  styleUrl: './proj-form.scss',
})
export class ProjFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private projectsService = inject(ProjectsService);

  projectForm: FormGroup;

  isEditMode = signal<boolean>(false);
  projectId = signal<number | null>(null);
  imagePreview = signal<string | null>(null);
  isUploading = signal<boolean>(false);
  existingGalleryImages = signal<any[]>([]);

  selectedFile: File | null = null;
  galleryFiles: File[] = [];

  editorModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image', 'video'],
      ['clean'],
      [{ 'align': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }]
    ]
  };

  constructor() {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: [true, Validators.required],
      public: [false, Validators.required],
      started_at: ['', Validators.required],
      finished_at: [''],
      content: [''],
      image_url: [''],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam) {
      const id = Number(idParam);
      this.projectId.set(id);
      this.isEditMode.set(true);
      this.loadProjectData(id);
    }
  }

  async loadProjectData(id: number): Promise<void> {
    const project = await this.projectsService.getProjectById(id);
    
    if (project) {
      project.started_at = project.started_at ? new Date(project.started_at).toISOString().split('T')[0] : '';
      project.finished_at = project.finished_at ? new Date(project.finished_at).toISOString().split('T')[0] : '';
      
      this.projectForm.patchValue(project);

      if (project.image_url) {
        this.imagePreview.set(project.image_url);
      }

      if (project.gallery_img) {
        this.existingGalleryImages.set(project.gallery_img);
      }
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview.set(reader.result as string);
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onGalleryFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.galleryFiles = Array.from(input.files);
    }
  }

  async removeExistingGalleryImage(imageToRemove: any, index: number): Promise<void> {
    if (confirm('Tem certeza que deseja remover esta imagem da galeria?')) {
      const { error } = await this.projectsService.deleteProjectImage(imageToRemove.fileName);

      if (error) {
        alert('Ocorreu um erro ao remover a imagem.');
      } else {
        this.existingGalleryImages.update(images => {
          const newImages = [...images];
          newImages.splice(index, 1);
          return newImages;
        });
      }
    }
  }

  async onSubmit(): Promise<void> {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    this.isUploading.set(true);
    let imageUrl = this.projectForm.value.image_url || '';

    if (this.selectedFile) {
      const uploadedUrl = await this.projectsService.uploadProjectImage(this.selectedFile);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      } else {
        alert('Falha ao fazer upload da imagem. O projeto não foi salvo.');
        this.isUploading.set(false);
        return;
      }
    }

    let finalGalleryImages = [...this.existingGalleryImages()];
    
    if (this.galleryFiles.length > 0) {
      for (const file of this.galleryFiles) {
        const url = await this.projectsService.uploadProjectImage(file);
        const fileName = url?.split('/').pop();

        if (url && fileName) {
          finalGalleryImages.push({
            itemImageSrc: url,
            thumbnailImageSrc: url,
            alt: this.projectForm.value.name,
            title: this.projectForm.value.name,
            fileName: fileName,
          });
        }
      }
    }

    const formValue = {
      ...this.projectForm.value,
      image_url: imageUrl,
      gallery_img: finalGalleryImages,
    };

    formValue.status = formValue.status === 'true' || formValue.status === true;
    formValue.public = formValue.public === 'true' || formValue.public === true;

    let savedProjectData;

    if (this.isEditMode() && this.projectId()) {
      savedProjectData = await this.projectsService.updateProject(this.projectId()!, formValue);
    } else {
      savedProjectData = await this.projectsService.createProject(formValue);
    }

    this.isUploading.set(false);

    if (savedProjectData && savedProjectData.data) {
      const newProjectId = savedProjectData.data[0].id;
      this.router.navigate(['/project', newProjectId]);
    } else {
      this.router.navigate(['/como-atuamos']);
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.projectForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}
