import { Component, input, output } from '@angular/core';
import { ModalType } from '../../core/models/modal.models';

@Component({
	selector: 'app-modal',
	imports: [],
	templateUrl: './modal.html',
	standalone: true,
})
export class Modal {
	modalType = input(ModalType);
	open = input<boolean>(false);
	title = input<string>(''); //sto od dobijamo od parenta
	close = output<void>(); //ono sto saljemo parentu

	onBackdropClick(event: MouseEvent): void {
		if (event.target === event.currentTarget) {
			this.close.emit();
		}
	}
}
