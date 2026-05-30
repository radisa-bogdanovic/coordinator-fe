import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'Button',
  imports: [],
  templateUrl: './button.html',
  standalone: true,
})
export class Button {
  title = input('Click');
  customClass = input('');
  type = input<'button' | 'submit'>('button');
  disabled = input(false);

  clicked = output<void>();

  buttonClasses = computed(() => {
    return `block rounded-lg px-3 py-2 text-sm no-underline transition-colors hover:bg-gray-800 bg-blue-600 text-white cursor-pointer max-w-50 ${this.customClass()}`;
  });
}
