import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GestioneStaff } from '../../core/Staff/gestione-staff';
import { Staff, UserRole, UserRoleLabel } from '../../core/Staff/staff.model';
import { usernameDisponibileValidator } from '../../core/Staff/username-validator';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Message } from 'primeng/message';
import { Fieldset } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'his-gestione-staff',
  imports: [ReactiveFormsModule, FormsModule, Button, InputText, SelectModule, Message, Fieldset, TableModule, TagModule],
  templateUrl: './gestione-staff.html',
  styleUrl: './gestione-staff.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GestioneStaffComponent {
  readonly gestioneStaff = inject(GestioneStaff);

  readonly roleOptions = (Object.keys(UserRoleLabel) as UserRole[]).map((code) => ({
    code,
    desc: UserRoleLabel[code],
  }));

  submitted = false;

  constructor() {
    this.gestioneStaff.fetchStaff();
  }

  readonly #fb = inject(FormBuilder);
  nuovoOperatore = this.#fb.group({
    username: [
      '',
      [Validators.required, Validators.minLength(3)],
      [usernameDisponibileValidator(this.gestioneStaff)],
    ],
    password: ['', [Validators.required, Validators.minLength(4)]],
    role: ['', [Validators.required]],
  });

  checkFormControl(control: string) {
    const fc = this.nuovoOperatore.get(control);
    return fc?.invalid && (fc.touched || fc.dirty);
  }

  checkFormControlError(control: string, err: string) {
    const fc = this.nuovoOperatore.get(control);
    if (fc && fc.hasError(err)) {
      return fc.getError(err);
    }
    return null;
  }

  onSubmit() {
    this.submitted = true;

    if (!this.nuovoOperatore.valid) {
      this.nuovoOperatore.markAllAsTouched();
      return;
    }

    const value = this.nuovoOperatore.getRawValue();
    this.gestioneStaff
      .createStaff({
        username: value.username ?? '',
        password: value.password ?? '',
        role: value.role as UserRole,
      })
      .subscribe({
        next: () => {
          this.nuovoOperatore.reset();
          this.submitted = false;
          this.gestioneStaff.fetchStaff();
        },
        error: (err) => console.error("Errore durante la creazione dell'operatore:", err),
      });
  }

  onChangeRole(staff: Staff, role: UserRole) {
    this.gestioneStaff.editRole(staff.id, { role }).subscribe({
      next: () => this.gestioneStaff.fetchStaff(),
      error: (err) => console.error("Errore durante il cambio di ruolo:", err),
    });
  }

  toggleActive(staff: Staff) {
    if (staff.isActive) {
      this.gestioneStaff.deactivate(staff.id);
    } else {
      this.gestioneStaff.activate(staff.id);
    }
  }
}
