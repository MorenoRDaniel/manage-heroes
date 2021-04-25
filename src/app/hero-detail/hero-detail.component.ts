import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../model/hero';
import { HeroService } from '../services/hero.service';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero = new Hero();

  constructor(
    private heroService: HeroService, private route: ActivatedRoute, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.heroService.getHero(Number(id))
        .subscribe(hero => this.hero = hero);
    }
  }

  validate(form: NgForm): void {
    this.hero.name = this.hero.name.trim();
    this.hero.power = this.hero.power.trim();
    if (form.invalid || !this.hero.name || !this.hero.power) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid form', life: 3000 });
      return;
    }
    this.save();
  }

  save(): void {
    if (this.hero.id) {
      this.heroService.update(this.hero).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: `${this.hero.name} Hero Updated`, life: 3000 });
          this.goDashboard();
        });
    } else {
      this.heroService.add(this.hero).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: `${this.hero.name} Hero Created`, life: 3000 });
          this.goDashboard();
        });
    }
  }

  goDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
