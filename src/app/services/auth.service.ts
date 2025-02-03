import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/login';
  private http = inject(HttpClient);

  // Método para realizar el login
  login(correo: string, password: string): Observable<any> {
    console.log('Desde el servicio de login');
    return this.http.post(this.apiUrl, { correo, password });
  }

  // Método para guardar los detalles del usuario al hacer login
  saveUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Método para obtener el id del usuario logueado desde localStorage
  getUserId(): number  {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.id || -1;  // Devuelve -1 si no hay ID de usuario
  }
}
