import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../api/api.config';
import { Prioritet, Task } from '../models/task.models';

@Injectable({ providedIn: 'root' })
export class TaskoviService {
	private readonly http = inject(HttpClient);
	private readonly baseUrl = API_CONFIG.baseUrl;

	getTasks(prioritet?: Prioritet): Observable<Task[]> {
		const params = prioritet ? { prioritet: prioritet } : {};
		return this.http.get<Task[]>(`${this.baseUrl}${API_CONFIG.taskovi.sviTaskovi}`, {});
	}

	updateTask(id: string, task: Partial<Task>): Observable<Task> {
		return this.http.patch<Task>(`${this.baseUrl}${API_CONFIG.taskovi.byId(id)}`, task);
	}

	deleteTask(id: string): Observable<void> {
		return this.http.delete<void>(`${this.baseUrl}${API_CONFIG.taskovi.byId(id)}`);
	}

	createTask(task: Task): Observable<Task> {
		return this.http.post<Task>(`${this.baseUrl}${API_CONFIG.taskovi.napraviTask}`, task);
	}
}
