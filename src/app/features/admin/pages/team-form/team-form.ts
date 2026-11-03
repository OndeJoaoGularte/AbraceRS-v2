import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TeamService } from '../../../../core/services/team/team';

@Component({
  selector: 'app-team-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './team-form.html',
  styleUrl: './team-form.scss',
})
export class TeamFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private teamService = inject(TeamService);

  teamForm: FormGroup;
  isEditMode = signal(false);
  memberId = signal<number | null>(null);
  imagePreview = signal<string | null>(null);
  isUploading = signal(false);
  selectedFile: File | null = null;

  constructor() {
    this.teamForm = this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      order_index: [0, [Validators.required, Validators.min(0)]],
      active: [true, Validators.required],
      photo_url: [''],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.memberId.set(id);
      this.isEditMode.set(true);
      this.loadMember(id);
    }
  }

  async loadMember(id: number): Promise<void> {
    const member = await this.teamService.getTeamMemberById(id);
    if (member) {
      this.teamForm.patchValue(member);
      if (member.photo_url) {
        this.imagePreview.set(member.photo_url);
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
    if (this.teamForm.invalid) {
      this.teamForm.markAllAsTouched();
      return;
    }

    this.isUploading.set(true);
    let photoUrl = this.teamForm.value.photo_url || '';

    if (this.selectedFile) {
      const uploadedUrl = await this.teamService.uploadPhoto(this.selectedFile);
      if (!uploadedUrl) {
        alert('Falha ao fazer upload da foto. O membro não foi salvo.');
        this.isUploading.set(false);
        return;
      }
      photoUrl = uploadedUrl;
    }

    if (!photoUrl) {
      alert('A foto do membro é obrigatória.');
      this.isUploading.set(false);
      return;
    }

    const formValue = {
      ...this.teamForm.value,
      photo_url: photoUrl,
      order_index: Number(this.teamForm.value.order_index) || 0,
      active: this.teamForm.value.active === true || this.teamForm.value.active === 'true',
    };

    if (this.isEditMode() && this.memberId()) {
      await this.teamService.updateTeamMember(this.memberId()!, formValue);
    } else {
      await this.teamService.createTeamMember(formValue);
    }

    this.isUploading.set(false);
    this.router.navigate(['/admin/team']);
  }

  isInvalid(controlName: string): boolean {
    const control = this.teamForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}
