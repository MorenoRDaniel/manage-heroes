import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService, ConfirmationService } from 'primeng/api';

import { DashboardComponent } from './dashboard.component';
import { Hero } from '../model/hero';
import { HeroService } from '../services/hero.service';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service: HeroService;
  const deleteHero: Hero = { id: 1, name: 'A', power: 'B' };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [MessageService, ConfirmationService],
      declarations: [ DashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(HeroService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter', () => {
    component.filter = 'A';
    component.search();
    const spy = spyOn(service, 'getHeroes').and.callFake(() => {
      return of();
    });
    expect(spy).not.toHaveBeenCalled();
  });

  it('should call getHeroes method by not filter', () => {
    const spy = spyOn(service, 'getHeroes').and.callFake(() => {
      return of();
    });
    component.search();
    expect(spy).toHaveBeenCalled();
  });

  it('should show popup and not continue', () => {
    const spy = spyOn(service, 'delete').and.callFake(() => {
      return of();
    });
    component.deleteHero(deleteHero);
    expect(spy).not.toHaveBeenCalled();
  });
});
