import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../model/hero';


@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(): { heroes: Hero[] } {
    const heroes: Hero[] = [
      { id: 1, name: 'Goku', power: 'Kamehameha' },
      { id: 2, name: 'Iroman', power: 'Money' },
      { id: 3, name: 'Spiderman', power: 'Spider' },
      { id: 4, name: 'Thor', power: 'Hammer' }
    ];
    return { heroes };
  }
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
