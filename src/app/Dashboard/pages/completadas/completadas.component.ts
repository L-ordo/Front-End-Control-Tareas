import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-completadas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './completadas.component.html',
  styleUrl: './completadas.component.css'
})
export default class CompletadasComponent implements OnInit{

  completedTasks: any[] = [];
    private taskService = inject(TaskService);
    private authService = inject(AuthService);


    ngOnInit(): void {
      const userId = this.authService.getUserId(); // Obtener el ID del usuario logueado
      if (userId) {
        this.taskService.getCompletedTasks(userId).subscribe(
          (tasks) => {
            this.completedTasks = tasks; //  Almacenar las tareas en el array
          },
          (error) => {
            console.error('Error al obtener las tareas completadas', error);
          }
        );
      } else {
        console.error('No se encontró un usuario logueado.');
      }
    }

}
