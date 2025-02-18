import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './../modal/modal.component';

@Component({
  selector: 'app-pai',
  templateUrl: './pai.component.html',
  styleUrl: './pai.component.scss'
})
export class PaiComponent {
  formData: any = null;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: {} // Você pode passar dados iniciais aqui, se necessário
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.formData = result;  // Dados retornados do modal
        console.log('Dados recebidos do modal:', this.formData);
      }
    });
  }
}
