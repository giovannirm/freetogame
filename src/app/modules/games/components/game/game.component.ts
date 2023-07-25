import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { GamesAggregate } from '@core/aggregates/game.aggregate';
import { GameEntity, IGame } from '@core/entities/game.entity';
import { GameService } from '@infrastructure/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{
  public game: IGame
  public isLoading: boolean = true

  constructor(
    private gameService : GameService,
    private router      : ActivatedRoute,
    private title       : Title,
    private meta        : Meta
  ) {
    this.title.setTitle('Game');
    this.meta.updateTag({name:'description',content:'watch free games online'});
    
    this.game = new GameEntity()
  }

  ngOnInit(): void {
    const getParamId = this.router.snapshot.paramMap.get('id');

    this.getGame(getParamId!)
  }

  getGame(id: string): void {
    this.gameService.getGame(id).subscribe((game: GameEntity) => {
      this.game = game
    }).add(() => {
      this.isLoading = false
    })
  }
}