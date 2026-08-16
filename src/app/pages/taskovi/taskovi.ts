import { Component, inject, OnInit, signal } from '@angular/core';
import { ModalType } from '../../core/models/modal.models';
import { Task } from '../../core/models/task.models';
import { TaskoviService } from '../../core/services/taskovi.sevice';
import { getModalTitle } from '../../core/utils/getModalTitle';
import { Button } from '../../UI/button/button/button';
import { Loader } from '../../UI/loader/loader';
import { Modal } from '../../UI/modal/modal';

@Component({
	selector: 'app-taskovi',
	imports: [Button, Modal, Loader],
	templateUrl: './taskovi.html',
	styleUrl: './taskovi.css',
	standalone: true,
})
export class Taskovi implements OnInit {
	private readonly TasksService = inject(TaskoviService);
	protected readonly loading = signal(false);
	protected readonly taskovi = signal<Task[]>([]);
	protected readonly modalIsOpen = signal(false);
	protected readonly modalTitle = signal<string>('');

	protected activeTask = signal(null);
	protected ModalType = ModalType;
	ngOnInit(): void {
		this.loading.set(true);
		this.TasksService.getTasks().subscribe({
			next: tasks => {
				this.taskovi.set(tasks);
			},
			error: error => {
				console.error('Error fetching tasks:', error);
				this.taskovi.set([]);
			},
			complete: () => {
				this.loading.set(false);
			},
		});
	}

	protected onClick(modalType: ModalType) {
		this.modalTitle.set(getModalTitle(modalType, 'task'));
		this.modalIsOpen.set(true);
	}

	protected closeModal() {
		this.modalIsOpen.set(false);
	}
}
