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
      // obtenems el ID del usuario logueado
      const userId = this.authService.getUserId();
      if (userId) {
        this.taskService.getCompletedTasks(userId).subscribe(
          (tasks) => {
            //  almacenamos  las tareas en el array
            this.completedTasks = tasks;
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
