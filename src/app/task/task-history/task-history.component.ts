import { Component, OnInit } from '@angular/core';
import { PoDialogService, PoNotificationService, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.scss']
})
export class TaskHistoryComponent implements OnInit {
  items = [];
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
  actions: Array<PoTableAction> = [
    { action: this.delete.bind(this), label: 'Excluir' }
  ];
  constructor(private task: TaskService, private poAlert: PoDialogService, private poNotification: PoNotificationService) { }

  ngOnInit() {
    this.getTasks()
  }

  getTasks() {
    this.loading = true;
    this.task.getHistoryTasks(this.page).subscribe(items => {
      this.items = [...this.items, ...Object.values(items.body)];
      if (this.items.length < parseInt(items.headers.get('X-Total-Count'))) {
        this.buttonShowMoreEnabled = true;
          this.loading = false;
      } else {
        this.buttonShowMoreEnabled = false;
          this.loading = false;
      }
    })
  }

  showMore() {
    this.page++;
    this.getTasks();
  }

  delete(task) {
    this.poAlert.confirm({
      title: 'Deseja apagar essa tarefa?',
      message: 'Essa operação é irreversível',
      confirm: () => this.deleteTask(task),
    });
  }

  deleteTask(task) {
    const { id } = task;
    this.task.deleteTask(id).subscribe(() => {
      this.page = 1;
      this.items = [];
      this.getTasks();

      this.poNotification.success('Tarefa excluída com sucesso');
    }, error => {
      this.poNotification.error('Erro ao excluir Tafefa');
    });
  }
}
