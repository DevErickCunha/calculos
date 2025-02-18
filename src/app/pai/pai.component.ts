import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './../modal/modal.component';


export interface form {
  name: string;
  email: string;
  };

@Component({
  selector: 'app-pai',
  templateUrl: './pai.component.html',
  styleUrl: './pai.component.scss'
})
export class PaiComponent {
  listaDeFormularios: form[] = [];
  readonly dialog = inject(MatDialog);

  constructor(){}

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: {} // Você pode passar dados iniciais aqui, se necessário
    });

    dialogRef.afterClosed().subscribe((result: form) => {
      console.log(result);

      if (result) {
        this.listaDeFormularios.push(result);  // Dados retornados do modal
        console.log('Dados recebidos do modal:', this.listaDeFormularios);
      }
    });
  }
}
