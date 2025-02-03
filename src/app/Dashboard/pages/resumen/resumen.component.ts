import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.css'
})
export default class ResumenComponent implements OnInit {

  completedTasks: any[] = [];
  tasks: any[] = [];
  userId: number = 0;

  private taskService = inject(TaskService);
  private authService = inject(AuthService);


  ngOnInit(): void {
    // Obtener el ID del usuario logueado
    this.userId = this.authService.getUserId();

    // Verificar que el usuario tenga un ID válido
    if (this.userId) {
      this.taskService.getTasksByUser(this.userId).subscribe(
        (data) => {
          this.tasks = data;
          console.log('Tareas del usuario:', this.tasks);
        },
        (error) => console.error('Error al obtener tareas:', error)
      );
    }
  }


}
