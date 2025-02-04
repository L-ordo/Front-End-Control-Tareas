import { Component, OnInit, inject } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pendientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.css'],
})
export default class PendientesComponent implements OnInit {
  pendingTasks: any[] = [];

  private taskService = inject(TaskService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.loadPendingTasks(); // Cargar tareas al iniciar
  }

  // Método para obtener las tareas pendientes del usuario logueado
  loadPendingTasks(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.taskService.getPendingTasks(userId).subscribe(
        (tasks) => {
          this.pendingTasks = tasks;
        },
        (error) => {
          console.error('Error al obtener las tareas pendientes', error);
        }
      );
    }
  }

  // Método para completar una tarea
  completeTask(taskId: number): void {
    this.taskService.markAsCompleted(taskId).subscribe(
      (response) => {
        console.log('Tarea completada:', response);
        // filtramos solo las tareas pendientes
        this.pendingTasks = this.pendingTasks.filter(task => task.id !== taskId);
      },
      (error) => {
        console.error('Error al completar la tarea', error);
      }
    );
  }
}
