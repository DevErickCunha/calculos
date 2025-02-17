import { Component, inject } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      SistemaProducao: ['', [Validators.required, Validators.minLength(3)]],
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
      data: {
        AnimaisMortosPreDesmama: this.AnimaisMortosPreDesmama(),
        IntervaloEntrePartos: this.IntervaloEntrePartos(),
        TaxaNatalidadeMultiparas: this.TaxaNatalidadeMultiparas(),
        TaxaReproducaoDescartesMatrizes: this.TaxaReproducaoDescartesMatrizes(),
        TaxaLotacaoAreaPasto: this.TaxaLotacaoAreaPasto(),
        TaxaLotacaoEmAreaTotal: this.TaxaLotacaoEmAreaTotal(),
      },
    });
  }

  AnimaisMortosPreDesmama(): number {
    return parseFloat((this.form.value.TaxaMortalidadePreDesmama * this.form.value.BezerrosAs).toFixed(2));
  }
  
  IntervaloEntrePartos(): number {
    return parseFloat((this.form.value.TaxaNascMedia === 0 ? 0 : (1 / this.form.value.TaxaNascMedia) * 12).toFixed(2));
  }
  
  TaxaNatalidadeMultiparas(): number {
    return parseFloat(this.form.value.TxNascVacasMultiparas.toFixed(2));
  }
  
  TaxaReproducaoDescartesMatrizes(): number {
    return parseFloat((this.form.value.QuantCabecasAnual === 0 ? 0 : this.form.value.TotalTouroVendido / this.form.value.QuantCabecasAnual).toFixed(2));
  }
  
  TaxaLotacaoAreaPasto(): number {
    return parseFloat((this.form.value.AreaPastagemPerene === 0 ? 0 : (this.form.value.TotalUAPonderado + this.form.value.TotalUATrabalho) / this.form.value.AreaPastagemPerene).toFixed(2));
  }
  
  TaxaLotacaoEmAreaTotal(): number {
    return parseFloat((this.form.value.AreaPastagemPerene === 0 ? 0 : (this.form.value.TotalUAPonderado + this.form.value.TotalUATrabalho) / this.form.value.AreaPastagemPerene).toFixed(2));
  }
  

  salvarValores() {
    if (this.form.invalid) {
      return;
    }
    this.calculado = true;
  }
}

interface DialogData {
  AnimaisMortosPreDesmama: number;
  IntervaloEntrePartos: number;
  TaxaNatalidadeMultiparas: number;
  TaxaReproducaoDescartesMatrizes: number;
  TaxaLotacaoAreaPasto: number;
  TaxaLotacaoEmAreaTotal: number;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
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
