import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';

interface LoginData {
  username: string;
  password: string;
}

@Component({
  selector: 'his-login',
  imports: [Card, FormField, InputText, Message],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  loginModel = signal<LoginData>({
    username: 'piot ',
    password: '',
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    // readonly(schemaPath.username);
    // disabled(schemaPath.password);
    required(schemaPath.username, { message: 'Username is required!' });
    required(schemaPath.password, { message: 'Password is required' });
  });
}
