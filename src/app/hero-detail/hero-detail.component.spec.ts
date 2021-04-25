import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { MessageService } from 'primeng/api';
import { FormsModule, NgForm } from '@angular/forms';
import { HeroService } from '../services/hero.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let service: HeroService;
  let fixture: ComponentFixture<HeroDetailComponent>;
  const newHero = { id: 1, name: 'A', power: 'B' };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, CommonModule, FormsModule, RouterTestingModule],
      providers: [MessageService, Location],
      declarations: [HeroDetailComponent, DashboardComponent]
    })
      .compileComponents();
  });



  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    service = TestBed.inject(HeroService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call the add method', () => {
    const spy = spyOn(service, 'add').and.callFake((hero) => {
      return of(hero);
    });
    component.save();
    expect(spy).toHaveBeenCalled();
  });


  it('should call the update method', () => {
    const spy = spyOn(service, 'update').and.callFake((hero) => {
      return of([hero]);
    });
    component.hero = newHero;
    component.save();
    expect(spy).toHaveBeenCalled();
  });


  it('should call the validate method', () => {
    const spy = spyOn(service, 'delete').and.callFake(() => {
      return of();
    });
    const testForm = new NgForm([], []);

    component.hero = newHero;
    component.validate(testForm);
    expect(spy).not.toHaveBeenCalled();
  });
});
