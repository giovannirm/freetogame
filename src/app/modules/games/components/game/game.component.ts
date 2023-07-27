import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorEntity, IError } from '@core/entities/error.entity';
import { GameEntity, IGame } from '@core/entities/game.entity';
import { GameService } from '@infrastructure/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{
  public game      : IGame
  public isLoading : boolean
  public error     : IError

  constructor(
    private gameService : GameService,
    private router      : ActivatedRoute,
  ) {    
    this.game      = new GameEntity()
    this.isLoading = true
    this.error     = new ErrorEntity()
  }

  ngOnInit(): void {
    const getParamId = this.router.snapshot.paramMap.get('id');

    this.getGame(getParamId!)
  }

  getGame(id: string): void {
    this.gameService.getGame(id).subscribe((gameOrError: GameEntity | ErrorEntity) => {
      if(gameOrError instanceof GameEntity) {
        this.game = gameOrError
      } else {
        this.error = gameOrError
      }
      this.isLoading = false
    })
  }
}