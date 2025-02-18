import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<ModalComponent>) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);  // Retorna os dados para o componente pai
    }
  }

  cancel() {
    this.dialogRef.close();  // Fecha sem enviar dados
  }
}
