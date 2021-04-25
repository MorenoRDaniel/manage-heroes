import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, } from '@angular/core/testing';
import { Hero } from '../model/hero';
import { HeroService } from './hero.service';


describe('HeroService', () => {

  let service: HeroService;
  let httpTestingController: HttpTestingController;
  let expectedHeroes: Hero[];
  let hero: Hero;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HeroService);
    httpTestingController = TestBed.inject(HttpTestingController);
    expectedHeroes = [
      { id: 1, name: 'A', power: 'B' },
      { id: 2, name: 'A', power: 'B' },
    ];
    hero = { id: 1, name: 'A', power: 'B' };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#CRUD', () => {

    it('should update the hero', () => {
      const updateHero: Hero = { id: 1, name: 'A', power: 'B' };
      service.update(updateHero).subscribe(
        data => expect(data).toEqual(updateHero, 'should return the hero'),
        fail
      );

      const req = httpTestingController.expectOne(service.mocksUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updateHero);
      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: updateHero });
      req.event(expectedResponse);
    });

    it('should create a new hero', () => {
      const newHero: Hero = { id: 1, name: 'A', power: 'B' };
      service.add(newHero).subscribe(
        data => expect(data).toEqual(newHero, 'should return the hero'),
        fail
      );

      const req = httpTestingController.expectOne(service.mocksUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(newHero);
      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: newHero });
      req.event(expectedResponse);
    });


    it('should return expected heroes (called once)', () => {
      service.getHeroes().subscribe(
        heroes => expect(heroes).toEqual(expectedHeroes, 'should return expected heroes'),
        fail
      );
      const req = httpTestingController.expectOne(service.mocksUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedHeroes);
    });

    it('should search expected heroes', () => {
      const updateHero: Hero = { id: 1, name: 'A', power: 'B' };
      service.search(updateHero.name).subscribe(heroes =>
        expect(heroes).toEqual(expectedHeroes),
      );
      const req = httpTestingController.expectOne({ method: 'GET' });
      expect(req.request.method).toBe('GET');
      req.flush(expectedHeroes);
    });

    it('should delete a Hero', () => {
      service.delete(hero.id).subscribe();
      const req = httpTestingController.expectOne({ method: 'DELETE' });
      expect(req.request.method).toEqual('DELETE');
      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK' });
      req.event(expectedResponse);
    });
  });

});
