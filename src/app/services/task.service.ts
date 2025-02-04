import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

 private apiUrl = 'http://127.0.0.1:8000/api/tasks';

  private http = inject( HttpClient );

  constructor() { }


  // Método para crear una tarea
  createTask(taskData: any): Observable<any> {
    console.log('Datos de la tarea:', taskData);
    return this.http.post(this.apiUrl, taskData);
  }


  //Metodo para mostrar las tareas
   getTasksByUser(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }


    // Método para obtener las tareas completadas del usuario logueado
    getCompletedTasks(userId: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/completed/${userId}`);
    }

    // Método para obtener las tareas incompletas del usuario logueado
    getPendingTasks(userId: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/pendientes/${userId}`);
    }

    //Metodo para completar una tarea
    markAsCompleted(taskId: number): Observable<any> {
      return this.http.put(`${this.apiUrl}/${taskId}/completar`, { completada: true });
    }

    // Método para editar una tarea
    updateTask(taskId: number, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${taskId}`, updatedData);
      }

}
