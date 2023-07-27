import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCardComponent } from './game-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SpinnerImageComponent } from 'src/app/components/spinner-image/spinner-image.component';
import { GameEntity } from '@core/entities/game.entity';

describe('(1) TEST del componente "GameCardComponent"', () => {
  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ 
        GameCardComponent,
        SpinnerImageComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe de existir el GameCardComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Debe de existir el SpinnerImageComponent', () => {
    const fixture = TestBed.createComponent(SpinnerImageComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Debe establecer isLoading en falso después de cargar la imagen', () => {
    component.game = new GameEntity();
    component.game.thumbnail = 'https://ahseeit.com/spanish/king-include/uploads/2021/03/72626232_511467742767359_3932267352281969931_n-1441150537.jpg';
    expect(component.isLoading).toBeTrue();

    const img = new Image();
    img.onload = () => {
      expect(component.isLoading).toBeFalse();
    }
    img.src = component.game.thumbnail;
  });
});
