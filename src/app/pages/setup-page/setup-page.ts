import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-setup-page',
  styleUrl: './setup-page.css',
  templateUrl: './setup-page.html',
})
export class SetupPage {
  private fb: FormBuilder = inject(FormBuilder);
  setupForm = this.fb.group({
    timeLimit: [0, Validators.required],
    size: ['', Validators.required],
  });
}
