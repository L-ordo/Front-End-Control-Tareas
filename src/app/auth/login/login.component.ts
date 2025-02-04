import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export default class LoginComponent {
  correo: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Método para manejar el login
  login(): void {
    console.log('Intentando hacer login con', this.correo, this.password);
    this.authService.login(this.correo, this.password).subscribe(
      (response) => {
        console.log('Login exitoso', response);
        // guardamos  el usuario en localStorage
        this.authService.saveUser(response.user);

        // verificamos el id del usuario
        const userId = this.authService.getUserId();
        console.log('ID del usuario logueado:', userId);

        this.router.navigate(['tareas/resumen']);
      },
      (error) => {
        console.error('Error al hacer login', error);
      }
    );
  }
}
