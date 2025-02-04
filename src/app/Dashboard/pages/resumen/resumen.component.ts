import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.css'
})
export default class ResumenComponent implements OnInit {

  completedTasks: any[] = [];
  selectedTask: any = null;
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

// Método para seleccionar una tarea y habilitar la edición
editTask(task: any): void {
   // copiamos los datos de la tarea seleccionada
  this.selectedTask = { ...task };
}

// Método para guardar los cambios realizados a la tarea
saveTask(): void {
  if (this.selectedTask) {
    this.taskService.updateTask(this.selectedTask.id, this.selectedTask).subscribe((response) => {
      // Actualizamos la tarea en el arreglo de tareas
      const index = this.tasks.findIndex((t) => t.id === this.selectedTask.id);
      if (index !== -1) {
        this.tasks[index] = this.selectedTask;
      }
      // Limpiamos la tarea seleccionada después de guardar
      this.selectedTask = null;
    });
  }
}

// Método para cancelar la edición
cancelEdit(): void {
  this.selectedTask = null;
}

}
