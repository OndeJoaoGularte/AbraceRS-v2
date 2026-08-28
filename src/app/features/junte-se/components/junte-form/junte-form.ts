import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MembershipService } from '../../../../core/services/membership/membership';

@Component({
  selector: 'app-junte-form',
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './junte-form.html',
  styleUrl: './junte-form.scss',
})
export class JunteFormComponent {
  private fb = inject(FormBuilder);
  private membershipService = inject(MembershipService);

  activeForm = input<'associate' | 'volunteer' | null>(null);
  
  onBack = output<void>();

  isSubmitting = signal<boolean>(false);
  submittedSuccessfully = signal<boolean | null>(null);
  submittedFormType = signal<string>('');

  associateForm: FormGroup;
  volunteerForm: FormGroup;

  constructor() {
    this.associateForm = this.fb.group({
      person_type: ['PESSOA_FISICA', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      document: ['', Validators.required],
      contact_person: [''],
    });

    this.volunteerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      cpf: ['', Validators.required],
      how_to_help: ['', Validators.required],
    });

    this.associateForm.get('person_type')?.valueChanges.subscribe((type) => {
      this.onPersonTypeChange(type);
    });
  }

  // Função interna para limpar o form e avisar o PAI para voltar
  goBack(): void {
    this.submittedSuccessfully.set(null);
    this.associateForm.reset({ person_type: 'PESSOA_FISICA' });
    this.volunteerForm.reset();
    this.onBack.emit(); // <--- Grita pro componente pai!
  }

  onPersonTypeChange(type: string): void {
    const contactPersonControl = this.associateForm.get('contact_person');
    if (type === 'PESSOA_JURIDICA') {
      contactPersonControl?.setValidators([Validators.required]);
    } else {
      contactPersonControl?.clearValidators();
    }
    contactPersonControl?.updateValueAndValidity();
  }

  isInvalid(form: FormGroup, controlName: string): boolean {
    const control = form.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  async onSubmit(): Promise<void> {
    const currentFormType = this.activeForm();
    const form = currentFormType === 'associate' ? this.associateForm : this.volunteerForm;
    
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    let result;

    if (currentFormType === 'associate') {
      this.submittedFormType.set('de associação');
      result = await this.membershipService.submitAssociateForm(form.value);
    } else {
      this.submittedFormType.set('de voluntariado');
      result = await this.membershipService.submitVolunteerForm(form.value);
    }

    this.submittedSuccessfully.set(result.success);
    
    if (!result.success) {
      alert(`Ocorreu um erro ao enviar seu formulário ${this.submittedFormType()}. Tente novamente.`);
    }

    this.isSubmitting.set(false);
  }
}