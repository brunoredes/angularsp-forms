import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { email, form, FormField, FormRoot, minLength, required, submit } from '@angular/forms/signals';

type LoginSchema = {
  email: string;
  password: string;
}

const loginSchema = signal<LoginSchema>({
  email: '',
  password: '',
});

@Component({
  selector: 'app-login',
  imports: [FormField, FormRoot],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  protected form = form(loginSchema, (path) => {
    required(path.email, {
      when: (form) => form.state.touched() && form.state.dirty(),
      message: 'Email is required',
    });

    email(path.email, {
      message: 'Invalid email address',
    });

    required(path.password, {
      message: 'Password is required',
      when: (form) => form.state.touched() && form.state.dirty() && form.value.length === 0,
    });

    minLength(path.password, 10, {
      message: 'Password must be at least 10 characters long',
    });
  });

  protected async onSubmit() {
    await submit(this.form, async (form) => {
      const value = form().value();
      console.log(value);
      alert(`Login successful for ${value.email}`);
    });
  }
}
