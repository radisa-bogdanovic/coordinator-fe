import { Component, inject, OnInit, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ModalType } from '../../core/models/modal.models';
import { Task } from '../../core/models/task.models';
import { TaskoviService } from '../../core/services/taskovi.sevice';
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
	private readonly tasksService = inject(TaskoviService);
	protected loading = signal(false);
	protected readonly taskovi = signal<Task[]>([]);
	protected readonly modalIsOpen = signal(false);
	protected readonly modalTypeValue = signal<ModalType | null>(null);

	protected activeTask = signal<Task | null>(null);
	protected ModalType = ModalType;

	ngOnInit(): void {
		this.loadTasks();
	}

	loadTasks() {
		this.loading.set(true);
		this.tasksService.getTasks().subscribe({
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

	protected onActionClick(modalType: ModalType, task?: Task) {
		this.activeTask.set(task ?? null);

		this.modalTypeValue.set(modalType);
		this.modalIsOpen.set(true);
	}

	protected closeModal() {
		this.modalIsOpen.set(false);
	}

	async onModalAction(event: { type: ModalType; data?: Partial<Task> }) {
		try {
			this.loading.set(true);
			switch (event.type) {
				case ModalType.create:
					await firstValueFrom(this.tasksService.createTask(event.data as Task));
					break;
				case ModalType.update:
					await firstValueFrom(this.tasksService.updateTask(this.activeTask()!.id, event.data!));
					break;

				case ModalType.delete:
					await firstValueFrom(this.tasksService.deleteTask(this.activeTask()!.id));
					break;
			}
			this.modalIsOpen.set(false);
			this.activeTask.set(null);
			this.loadTasks();
			this.loading.set(false);
		} catch (err: any) {
			this.loading.set(false);
			console.log(err);
		}
	}
}
