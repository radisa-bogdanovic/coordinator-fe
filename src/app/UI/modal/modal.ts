import { Component, computed, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalType } from '../../core/models/modal.models';
import { Prioritet, Task } from '../../core/models/task.models';
import { getModalTitle } from '../../core/utils/getModalTitle';
import { Button } from '../button/button/button';

@Component({
	selector: 'app-modal',
	imports: [Button, ReactiveFormsModule],
	templateUrl: './modal.html',
	standalone: true,
})
export class Modal {
	constructor() {
		effect(() => {
			const tasksData = this.activeTask();
			this.formTask.patchValue({
				name: tasksData?.name,
				opis: tasksData?.opis,
				prioritet: tasksData?.prioritet,
			});

			console.log(this.activeTask());
			if (this.loading() === true) {
				this.formTask.disable();
			} else {
				this.formTask.enable();
			}
		});
	}
	action = output<{ type: ModalType; data?: Partial<Task> }>();
	modalType = input<ModalType | null>(null);
	open = input<boolean>(false);
	activeTask = input<Task | null>(null);
	loading = input<boolean>(false);
	category = input<'task' | 'note' | null>(null); //sto od dobijamo od parenta
	close = output<void>(); //ono sto saljemo parentu
	title = computed(() => getModalTitle(this.modalType(), this.category()));
	protected ModalType = ModalType;
	protected prioriteti = Object.values(Prioritet);

	protected readonly formTask = new FormGroup({
		name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
		opis: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
		prioritet: new FormControl<Prioritet>(Prioritet.Mali, { nonNullable: true, validators: [Validators.required] }),
	});

	onBackdropClick(event: MouseEvent): void {
		if (event.target === event.currentTarget) {
			this.close.emit();
		}
	}

	onClose() {
		this.close.emit();
	}
	onAction() {
		if (this.modalType() === ModalType.delete) {
			this.action.emit({ type: ModalType.delete });
			return;
		}

		this.action.emit({
			type: this.modalType()!,
			data: this.formTask.getRawValue(),
		});
	}
}
