import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { GameService } from '@infrastructure/services/game.service';
import { ActivatedRoute } from '@angular/router';
import { GameEntity } from '@core/entities/game.entity';
import { of } from 'rxjs';
import { ErrorEntity } from '@core/entities/error.entity';

describe('(1) TEST del componente "GameComponent"', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let mockGameService: jasmine.SpyObj<GameService>;

  beforeEach(async () => {

    mockGameService = jasmine.createSpyObj('GameService', ['getGame']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ GameComponent, SpinnerComponent ],
      providers: [
        { provide: GameService, useValue: mockGameService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (param: string) => '1', // Simulamos que el parámetro de ruta es '1'
              },
            },
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('Debe de existir el GameComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Debe establecer el juego al obtener datos del juego', () => {
    const mockGame: GameEntity = new GameEntity();

    mockGameService.getGame.and.returnValue(of(mockGame));

    fixture.detectChanges();
    
    expect(component.game).toEqual(mockGame);
    expect(component.isLoading).toBe(false);
    expect(component.error).toEqual(jasmine.any(ErrorEntity)); // El error debe ser una instancia de ErrorEntity vacío
  });

  it('Debe establecer un error al no poder obtener los datos del juego', () => {
    const mockError: ErrorEntity = new ErrorEntity();

    mockGameService.getGame.and.returnValue(of(mockError));

    fixture.detectChanges();

    expect(component.game).toEqual(jasmine.any(GameEntity)); // El juego debe ser una instancia de GameEntity vacío
    expect(component.isLoading).toBe(false);
    expect(component.error).toEqual(mockError);
  });

});
