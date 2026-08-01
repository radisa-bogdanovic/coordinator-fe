import { Component, inject, OnInit, signal } from '@angular/core';
import { Button } from '../../UI/button/button';
import { TaskoviService } from '../../core/services/taskovi.sevice';
import { Task } from '../../core/models/task.models';



@Component({
  selector: 'app-taskovi',
  imports: [Button],
  templateUrl: './taskovi.html',
  styleUrl: './taskovi.css',
  standalone: true,
})
export class Taskovi implements OnInit {
private readonly TasksService = inject(TaskoviService)
protected readonly loading = signal(false)
protected readonly taskovi = signal<Task[]>([])

  ngOnInit(): void {
    this.loading.set(true)
    this.TasksService.getTasks().subscribe({
      next: (tasks) => {
        this.taskovi.set(tasks)
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
        this.taskovi.set([])
      }, complete: () => {
        this.loading.set(false)
      }
    })
  }

  onClick() {
    alert('kliknuo sam');
    console.log('heej');
  }
}
