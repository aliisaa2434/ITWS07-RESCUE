import { Directive, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDigitsOnly]',
  standalone: true,
})
export class DigitsOnlyDirective {
  private readonly ngControl = inject(NgControl, { self: true, optional: true });

  @HostListener('ionInput', ['$event'])
  normalizeInput(event: Event): void {
    const ionEvent = event as CustomEvent<{ value?: string | null }>;
    const rawValue = ionEvent.detail?.value ?? '';
    const normalizedValue = rawValue.replace(/\D/g, '').slice(0, 11);

    if (rawValue === normalizedValue) {
      return;
    }

    const input = ionEvent.target as HTMLIonInputElement;
    input.value = normalizedValue;
    this.ngControl?.control?.setValue(normalizedValue);
  }
}
