// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { GamesComponent } from './games.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
// import { IGame } from '@core/entities/game.entity';
// import { GamesAggregate } from '@core/aggregates/game.aggregate';
// import { of } from 'rxjs';
// import { GameService } from '@infrastructure/services/game.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { PageEvent } from '@angular/material/paginator';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { GamesComponent } from './games.component';
import { GameService } from '@infrastructure/services/game.service';
import { GamesAggregate } from '@core/aggregates/game.aggregate';
import { IGame } from '@core/entities/game.entity';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { GameCardComponent } from '../game-card/game-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SpinnerImageComponent } from 'src/app/components/spinner-image/spinner-image.component';

describe('(1) TEST del componente "GamesComponent"', () => {
  let component: GamesComponent;
  let fixture: ComponentFixture<GamesComponent>;
  let gameServiceSpy: jasmine.SpyObj<GameService>;
  const testGames: IGame[] = [
    {
      "id": 540,
      "title": "Overwatch 2",
      "thumbnail": "https://www.freetogame.com/g/540/thumbnail.jpg",
      "shortDescription": "A hero-focused first-person team shooter from Blizzard Entertainment.",
      "gameUrl": "https://www.freetogame.com/open/overwatch-2",
      "genre": "Shooter",
      "platform": "PC (Windows)",
      "publisher": "Activision Blizzard",
      "developer": "Blizzard Entertainment",
      "releaseDate": new Date("2022-10-04"),
      "freetogameProfileUrl": "https://www.freetogame.com/overwatch-2"
    },
    {
      "id": 521,
      "title": "Diablo Immortal",
      "thumbnail": "https://www.freetogame.com/g/521/thumbnail.jpg",
      "shortDescription": "Built for mobile and also released on PC, Diablo Immortal fills in the gaps between Diablo II and III in an MMOARPG environment.",
      "gameUrl": "https://www.freetogame.com/open/diablo-immortal",
      "genre": "MMOARPG",
      "platform": "PC (Windows)",
      "publisher": "Blizzard Entertainment",
      "developer": "Blizzard Entertainment",
      "releaseDate": new Date("2022-06-02"),
      "freetogameProfileUrl": "https://www.freetogame.com/diablo-immortal"
    },
    {
      "id": 517,
      "title": "Lost Ark",
      "thumbnail": "https://www.freetogame.com/g/517/thumbnail.jpg",
      "shortDescription": "Smilegate’s free-to-play multiplayer ARPG is a massive adventure filled with lands waiting to be explored, people waiting to be met, and an ancient evil waiting to be destroyed.",
      "gameUrl": "https://www.freetogame.com/open/lost-ark",
      "genre": "ARPG",
      "platform": "PC (Windows)",
      "publisher": "Amazon Games",
      "developer": "Smilegate RPG",
      "releaseDate": new Date("2022-02-11"),
      "freetogameProfileUrl": "https://www.freetogame.com/lost-ark"
    }
  ];

  beforeEach(async () => {
    const gameServiceMock = jasmine.createSpyObj('GameService', ['getGames']);

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatPaginatorModule,
        FormsModule,
        RouterTestingModule,
        // HttpClientTestingModule,
      ],
      declarations: [ 
        GamesComponent,
        FilterPipe,
        GameCardComponent,
        SpinnerImageComponent
      ],
      // providers: [
      //   { provide: GameService, useValue: mockGameService },
      //   { provide: ActivatedRoute, useValue: mockActivatedRoute },
      //   { provide: Router, useValue: mockRouter },
      // ],
      providers: [
        { provide: GameService, useValue: gameServiceMock },
        { provide: ActivatedRoute, useValue: { queryParams: of({ search: '' }) } },
        { provide: Router, useValue: {} },
      ],
    }).compileComponents();

    // fixture = TestBed.createComponent(GamesComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesComponent);
    component = fixture.componentInstance;
    gameServiceSpy = TestBed.inject(GameService) as jasmine.SpyObj<GameService>;
    gameServiceSpy.getGames.and.returnValue(of({ games: testGames } as GamesAggregate));
    fixture.detectChanges();
  });

  it('Debe de existir el GamesComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Debe obtener games en la inicialización', () => {
    expect(gameServiceSpy.getGames).toHaveBeenCalled();
    expect(component.isLoading).toBeFalse();
    expect(component.games).toEqual(testGames);
    expect(component.gamesFiltered).toEqual(testGames);
  });

  it('Debe cambiar la página correctamente', () => {
    const pageIndex = 2;
    const pageSize = component.pageSize;
    const expectedFrom = pageIndex * pageSize;
    const expectedTo = expectedFrom + pageSize;

    component.changePage({ pageIndex } as any);

    expect(component.from).toBe(expectedFrom);
    expect(component.to).toBe(expectedTo);
  });

  it('Debe establecer games y gamesFiltered al llamar a getGames ()', () => {
    const dummyGames: IGame[] = testGames
    const dummyAggregate: GamesAggregate = { games: dummyGames };
    gameServiceSpy.getGames.and.returnValue(of(dummyAggregate));

    component.getGames();

    expect(component.games).toEqual(dummyGames);
    expect(component.gamesFiltered).toEqual(dummyGames);
  });

  it('Debería actualizar gamesFiltered en applyFilters()', () => {
    component.games = testGames;

    component.filterGenre = 'Shooter';
    component.filterPlatform = 'PC (Windows)';
    component.applyFilters();

    expect(component.gamesFiltered).toEqual([testGames[0]]);
  });
});
