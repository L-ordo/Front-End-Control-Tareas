import { Component, OnInit, inject } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pendientes',
  standalone: true,
  imports: [CommonModule], // ✅ Importar CommonModule
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.css'],
})
export default class PendientesComponent implements OnInit {
  pendingTasks: any[] = []; // Array para almacenar tareas pendientes

  private taskService = inject(TaskService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    const userId = this.authService.getUserId(); // Obtener ID del usuario logueado
    if (userId) {
      this.taskService.getPendingTasks(userId).subscribe(
        (tasks) => {
          this.pendingTasks = tasks;
        },
        (error) => {
          console.error('Error al obtener las tareas pendientes', error);
        }
      );
    } else {
      console.error('No se encontró un usuario logueado.');
    }
  }
}
