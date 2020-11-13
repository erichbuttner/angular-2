import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
  taskForm: any = {
    title: '',
    description: '',
    deadline: '',
    statusSwitch: true,
    status: undefined
  };
  constructor(private task: TaskService, private router: Router, private poNotification: PoNotificationService) { }

  ngOnInit() {
  }

  save(){
    this.taskForm.status = this.taskForm.statusSwitch ? 'active' : 'inactive';
    this.task.createTask(this.taskForm).subscribe(() => {
      this.restore();
      this.poNotification.success('Tarefa criada com sucesso!');
      this.router.navigate(['/']);
    }, error => {
      this.poNotification.success('Erro ao criar tarefa.');
    } )
  }

  restore(){
    this.taskForm = {
      title: '',
      description: '',
      deadline: '',
      statusSwitch: true,
      status: undefined
    };
  }

}
