import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PostsService } from '../../../../core/services/posts/posts';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-post-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, QuillModule],
  templateUrl: './post-form.html',
  styleUrl: './post-form.scss',
})
export class PostFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private postsService = inject(PostsService);

  postForm: FormGroup;

  isEditMode = signal<boolean>(false);
  postId = signal<number | null>(null);
  imagePreview = signal<string | null>(null);
  isUploading = signal<boolean>(false);
  existingGalleryImages = signal<any[]>([]);

  selectedFile: File | null = null;
  galleryFiles: File[] = [];

  constructor() {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      summary: ['', Validators.required],
      public: [false, Validators.required],
      content: [''],
      image_url: [''],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam) {
      const id = Number(idParam);
      this.postId.set(id);
      this.isEditMode.set(true);
      this.loadPostData(id);
    }
  }

  async loadPostData(id: number): Promise<void> {
    const post = await this.postsService.getPostById(id);
    
    if (post) {
      this.postForm.patchValue(post);

      if (post.image_url) {
        this.imagePreview.set(post.image_url);
      }

      if (post.gallery_img) {
        this.existingGalleryImages.set(post.gallery_img);
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
      const { error } = await this.postsService.deletePostImage(imageToRemove.fileName);

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
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }

    this.isUploading.set(true);
    let imageUrl = this.postForm.value.image_url || '';

    if (this.selectedFile) {
      const uploadedUrl = await this.postsService.uploadPostImage(this.selectedFile);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      } else {
        alert('Falha ao fazer upload da imagem. A notícia não foi salva.');
        this.isUploading.set(false);
        return;
      }
    }

    let finalGalleryImages = [...this.existingGalleryImages()];
    
    if (this.galleryFiles.length > 0) {
      for (const file of this.galleryFiles) {
        const url = await this.postsService.uploadPostImage(file);
        const fileName = url?.split('/').pop();

        if (url && fileName) {
          finalGalleryImages.push({
            itemImageSrc: url,
            thumbnailImageSrc: url,
            alt: this.postForm.value.title,
            title: this.postForm.value.title,
            fileName: fileName,
          });
        }
      }
    }

    const formValue = {
      ...this.postForm.value,
      image_url: imageUrl,
      gallery_img: finalGalleryImages,
    };
    
    formValue.public = formValue.public === 'true' || formValue.public === true;

    let savedPostData;

    if (this.isEditMode() && this.postId()) {
      savedPostData = await this.postsService.updatePost(this.postId()!, formValue);
    } else {
      savedPostData = await this.postsService.createPost(formValue);
    }

    this.isUploading.set(false);

    if (savedPostData && savedPostData.data) {
      const newPostId = savedPostData.data[0].id;
      this.router.navigate(['/post', newPostId]);
    } else {
      this.router.navigate(['/blog']);
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.postForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

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
}