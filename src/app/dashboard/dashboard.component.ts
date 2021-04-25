import { Component, OnInit } from '@angular/core';
import { HeroService } from '../services/hero.service';
import { Hero } from '../model/hero';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];
  selectedHeroes: Hero[] = [];
  heroes$!: Observable<Hero[]>;
  filter = '';
  private searchTerms = new Subject<string>();

  constructor(
    private heroService: HeroService,  private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.search(term)),
    ).subscribe(heroes => this.heroes = heroes);

    this.getHeroes();

  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  deleteHero(hero: Hero): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + hero.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.heroService.delete(hero.id).subscribe(() => {
          this.heroes = this.heroes.filter(h => h !== hero);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: `${hero.name} Hero Deleted`, life: 3000 });
        });
      }
    });
  }

  search(): void {
    (this.filter) ?
      this.heroService.search(this.filter).subscribe(heroes => this.heroes = heroes) : this.getHeroes();
  }


}
