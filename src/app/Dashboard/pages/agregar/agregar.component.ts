import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TaskService } from '../../../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export default class AgregarComponent implements OnInit {

  private authservice = inject(AuthService);
  private router = inject(Router);
  private taskService = inject(TaskService);

  titulo: string = '';
  descripcion: string = '';
  userId: number = -1;  // Cambié a 'number' con valor predeterminado -1
  completada: boolean = false;

  ngOnInit(): void {
    // Obtener el userId del usuario logueado al iniciar el componente
    this.userId = this.authservice.getUserId();
    console.log('ID del usuario logueado:', this.userId);
    console.log("Datos de la tarea que se envían: ", this.titulo, this.descripcion, this.userId, this.completada);
  }

  onSubmit(): void {
    console.log("Formulario enviado prueba");

    // Verificamos si 'userId' es diferente al valor predeterminado (-1)
    if (this.userId !== -1) {
      const taskData = {
        titulo: this.titulo,
        descripcion: this.descripcion,
        usuario_id: this.userId,  // Ahora no es null, sino un número
        completada: this.completada
      };

      this.taskService.createTask(taskData).subscribe(
        (response) => {
          console.log('Tarea creada:', response);
          this.router.navigate(['/tareas/resumen']);
        },
        (error) => {
          console.error('Error al crear tarea:', error);
        }
      );
    } else {
      console.error('Error: el ID de usuario no está disponible');
    }
  }
}
