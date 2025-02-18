import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  cadastroForm!: FormGroup; // Asserção de atribuição definitiva
  hidePassword = true;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      repetirSenha: ['', [Validators.required, this.matchPasswords.bind(this)]]
    });
  }

  matchPasswords(control: any) {
    if (this.cadastroForm && control.value !== this.cadastroForm.get('senha')?.value) {
      return { mismatch: true };
    }
    return null;
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    if (this.cadastroForm.invalid) {
      return;
    }

    // Exibe o alerta de sucesso
    alert('Cadastro realizado com sucesso!');

    // Limpa o formulário
    this.cadastroForm.reset();

    // Opcional: Navega para a página de login após o cadastro
    this.router.navigate(['/app/login']);
  }

  voltar() {
    this.router.navigate(['/app/login']);
  }
}
