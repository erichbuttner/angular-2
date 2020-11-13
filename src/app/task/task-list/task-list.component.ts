import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoNotificationService, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  items = [];
  actions: Array<PoTableAction> = [
    { action: this.finish.bind(this), label: 'Concluír' }
  ];
  buttonShowMoreEnabled = false;
  page = 1;
  search = '';
  loading = false;
  columns: PoTableColumn[] = [
    { property: 'title', label: 'Tarefa' },
    { property: 'description', label: 'Descrição' },
    { property: 'deadline', label: 'Data limite', type: 'date', format: 'dd-MM-yyyy' },
    {
      property: 'status', label: 'Status', type: 'label', labels: [
        { value: 'active', color: 'color-11', label: 'Ativo' },
        { value: 'inactive', color: 'color-08', label: 'Desativado' }
      ]
    }

  ];
  constructor(private router: Router, private task: TaskService, private poNotification: PoNotificationService) { }


  ngOnInit() {
    this.getTasks()
  }
  showMore() {
    this.page++;
    this.getTasks();
  }
  getTasks() {
    this.loading = true;
    this.task.getOpenTasks(this.page).subscribe(items => {
      this.loading = false;
      this.items = [...this.items, ...Object.values(items.body)];
      if (this.items.length < parseInt(items.headers.get('X-Total-Count'))) {
        this.buttonShowMoreEnabled = true;
      } else {
        this.loading = false;
        this.buttonShowMoreEnabled = false;
      }
    })
  }

  createTask() {
    this.router.navigate(['create-task']);
  }
  finish(task) {
    const { id } = task;
    task.status = 'inactive';
    this.task.updateTask(id, task).subscribe(() => {
      this.poNotification.success('Tarefa concluída com sucesso.');
      this.items = [];
      this.getTasks();
    })
  }

}
