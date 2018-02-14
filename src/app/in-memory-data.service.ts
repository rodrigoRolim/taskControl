import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
  createDb(){
    const  tasks = [
      {id:1, tarefa:'Tarefa A', descricao:'Realizar Tarefa A', color:'#DA5EFD', state: 1},
      {id:2, tarefa:'Tarefa B', descricao:'Realizar Tarefa B', color:'#5EFDDA', state: 1},
      {id:3, tarefa:'Tarefa C', descricao:'Realizar Tarefa C', color:'#5EFDDA', state: 2},
      {id:4, tarefa:'Tarefa D', descricao:'Realizar Tarefa D', color:'#DA5EFD', state: 3},
      {id:5, tarefa:'Tarefa E', descricao:'Realizar Tarefa E', color:'#FDDA5E', state: 3},
      {id:6, tarefa:'Tarefa F', descricao:'Realizar Tarefa F', color:'#5EFDDA', state: 1},
     ];
     return { tasks };
  }
  constructor() { }

}
