import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

interface LoginFormControl {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly fb = inject(NonNullableFormBuilder);

  protected form = this.fb.group<LoginFormControl>({
    email: this.fb.control('', {
      validators: [Validators.email, Validators.required],
    }),
    password: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(10)],
    }),
  });

  protected submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      alert(`Login successful for ${this.form.value.email}`);
    }
  }
}
