import { Component } from '@angular/core';
import { Button } from '../../UI/button/button';

enum Prioritet {
  Mali = 'Mali',
  Srednji = 'Srednji',
  Veliki = 'Veliki',
}

type Task = {
  name: string;
  prioritet: Prioritet;
  opis: string;
  id: number;
};

@Component({
  selector: 'app-taskovi',
  imports: [Button],
  templateUrl: './taskovi.html',
  styleUrl: './taskovi.css',
  standalone: true,
})
export class Taskovi {
  protected readonly taskovi: Task[] = [
    {
      id: 1,
      name: 'Task1',
      prioritet: Prioritet.Mali,
      opis: 'ovo je tes sdasakpdnsai [sad[jsaodjsa dosj saojdjsaiiod jsa jisda jasiodojsoj t',
    },
    {
      id: 2,
      name: 'Task2',
      prioritet: Prioritet.Srednji,
      opis: 'ovo je test taska2 sdopasikdnasoduosabdisuabv',
    },
    {
      id: 3,
      name: 'Task3',
      prioritet: Prioritet.Veliki,
      opis: 'ovo je test taska2 sdopasikdnasoduosabdisuabv sadsadsasassa',
    },
  ];

  onClick() {
    alert('kliknuo sam');
    console.log('heej');
  }
}
