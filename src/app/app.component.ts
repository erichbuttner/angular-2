import { Component } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly menus: Array<PoMenuItem> = [
    // {
      // label: 'Tarefas',
      // icon: 'po-icon-star',
      // shortLabel: 'Tarefas',
      // subItems: [
        { label: 'Todas Tarefa', link: '/' },
        { label: 'Nova Tarefa', link: 'create-task' },
        { label: 'Histórico', link: 'history' }
      // ]
    // }

  ];

}
