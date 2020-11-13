import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

constructor(private http: HttpClient) { }



  getOpenTasks(page = 1){
    return this.http.get(`http://localhost:3000/tasks?status=active&_page=${page}`,{observe: 'response'});
  }

  getHistoryTasks(page = 1){
    return this.http.get(`http://localhost:3000/tasks?status=inactive&_page=${page}`,{observe: 'response'});
  }

  deleteTask(id){
    return this.http.delete(`http://localhost:3000/tasks/${id}`)
  }

  createTask(task){
    return this.http.post(`http://localhost:3000/tasks`, task);
  }

  updateTask(id, task){
    return this.http.put(`http://localhost:3000/tasks/${id}`, task);
  }

}
