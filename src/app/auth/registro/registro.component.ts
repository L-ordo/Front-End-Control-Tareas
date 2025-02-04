import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
    standalone: true,
      imports: [FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export default class RegistroComponent {
  nombre: string = '';
  correo: string = '';
  password: string = '';

    private authService = inject(AuthService);
    private router = inject(Router);

 // constructor(private authService: AuthService) {}

  onSubmit(form: any): void {
    if (form.valid) {
      this.authService.register(this.nombre, this.correo, this.password).subscribe(
        (response) => {
          console.log('Usuario registrado:', response);
          this.router.navigate(['/tareas/resumen']);
        },
        (error) => {
          console.error('Error al registrar usuario:', error);
        }
      );
    }
  }
}
