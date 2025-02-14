import { Component, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-calculos',
  templateUrl: './calculos.component.html',
  styleUrls: ['./calculos.component.scss'],
})
export class CalculosComponent {
  form!: FormGroup
  calculado = false

  constructor(public formBuilder: FormBuilder) {
    this.creatForm()
  }

  creatForm(){
  this.form= this.formBuilder.group({
    SistemaProducao: ['',[Validators.required,Validators.minLength(3)]],
    TaxaMortalidadePreDesmama: [0, [Validators.min(1)]],
    BezerrosAs: [0, [Validators.min(1)]],  
    TaxaNascMedia: [0, [Validators.min(1)]],
    TxNascVacasMultiparas: [0, [Validators.min(1)]],
    TotalTouroVendido: [0, [Validators.min(1)]],
    QuantCabecasAnual: [0, [Validators.min(1)]],
    TotalUAPonderado: [0, [Validators.min(1)]],
    AreaPastagemPerene: [0, [Validators.min(1)]],
    TotalUATrabalho: [0, [Validators.min(1)]],
  });

  }
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {AnimaisMortosPreDesmama: this.AnimaisMortosPreDesmama() },
    });
  }

  AnimaisMortosPreDesmama(): number {
    return parseFloat((this.form.value.TaxaMortalidadePreDesmama * this.form.value.BezerrosAs).toFixed(2));
  }

  IntervaloEntrePartos(): number {
    return parseFloat((this.form.value.TaxaNascMedia === 0 ? 0 : (1 / this.form.value.TaxaNascMedia) * 12).toFixed(2));
  }

  TaxaNatalidadeMultiparas(): number {
    return  this.form.value.TxNascVacasMultiparas;
  }

  TaxaReproducaoDescartesMatrizes(): number {
    return this.form.value.QuantCabecasAnual === 0 ? 0 : this.form.value.TotalTouroVendido / this.form.value.QuantCabecasAnual;
  }

  TaxaLotacaoAreaPasto(): number {
    return this.form.value.AreaPastagemPerene === 0 ? 0 : (this.form.value.TotalUAPonderado + this.form.value.TotalUATrabalho) / this.form.value.AreaPastagemPerene;
  }

  TaxaLotacaoEmAreaTotal(): number {
    return this.form.value.AreaPastagemPerene === 0 ? 0 : (this.form.value.TotalUAPonderado + this.form.value.TotalUATrabalho) / this.form.value.AreaPastagemPerene;
  }



  salvarValores() {
    if (this.form.invalid) {
      return;
    }
    this.calculado = true;
}
}

interface   DialogData {
  AnimaisMortosPreDesmama: number;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  standalone: true,
})
export class DialogOverviewExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close();
  }
}