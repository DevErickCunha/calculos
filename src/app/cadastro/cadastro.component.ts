import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Para navegar para outras páginas

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  cadastroForm!: FormGroup;
  hidePassword = true;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.createForm();
  }

  // Criação do formulário
  createForm() {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      repetirSenha: ['', [Validators.required, this.matchPasswords.bind(this)]]
    });
  }

  // Função para verificar se as senhas coincidem
  matchPasswords(control: any) {
    if (this.cadastroForm && control.value !== this.cadastroForm.get('senha')?.value) {
      return { mismatch: true };
    }
    return null;
  }

  // Função para exibir/ocultar a senha
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  // Envio do formulário (simulação de sucesso)
  onSubmit() {
    if (this.cadastroForm.invalid) {
      return;
    }

    // Simulação de cadastro
    alert('Cadastro realizado com sucesso!');

    // Limpar o formulário
    this.cadastroForm.reset();
  }

  // Função para voltar (exemplo: voltar para a tela de login)
  voltar() {
    this.router.navigate(['/login']); // Altere para a rota desejada
  }
}
