import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormSubmittedEvent, ReactiveFormsModule, Validators } from '@angular/forms';
import { TimeLimitOptionKeys, TimeLimitOptions } from '../../types/data.types';
import { MazeSizeOptions } from '../../types/maze.types';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-setup-page',
  styleUrl: './setup-page.css',
  templateUrl: './setup-page.html',
})
export class SetupPage implements OnDestroy {
  private fb: FormBuilder = inject(FormBuilder);
  private router = inject(Router);
  private readonly subs: Array<Subscription> = [];

  setupForm = this.fb.group({
    timeLimit: [0, Validators.required],
    size: ['', Validators.required],
  });

  timeLimitOptionKeys = Object.keys(TimeLimitOptions);
  timeLimitOptions = TimeLimitOptions;

  mazeSizeOptionKeys = Object.keys(MazeSizeOptions);
  mazeSizeOptions = MazeSizeOptions;

  constructor() {
    this.subs.push(
      this.setupForm.events.subscribe((e) => {
        if (e instanceof FormSubmittedEvent) {
          const { timeLimit, size } = this.setupForm.value;
          if (timeLimit && size) {
            const timeLimitValue = this.timeLimitOptions[timeLimit];
            const sizeValue = this.mazeSizeOptions[size];
            console.log('Yo! ', timeLimitValue, sizeValue);

            this.router.navigate(['/game',{timeLimit: timeLimitValue,size: sizeValue}]);

          }
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
    while (this.subs.length > 0) this.subs.pop();
  }
}
