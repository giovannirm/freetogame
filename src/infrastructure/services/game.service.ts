import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IErrorDTO, IGameDTO } from '@infrastructure/dtos/game.dto';
import { Observable, catchError, map } from 'rxjs';
import { GamesAggregate } from '@core/aggregates/game.aggregate';
import { GameEntity, IGame } from '@core/entities/game.entity';
import { environment } from 'src/environments/environment';
import { ErrorEntity } from '@core/entities/error.entity';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly baseEndpoint = environment.baseEndpoint

  constructor(
    private http: HttpClient
  ) { }

  getGames(): Observable<GamesAggregate>{
    return this.http.get<IGameDTO[]>(`${this.baseEndpoint}/games`).pipe(
      map((gamesDTO: IGameDTO[]) => {
        const games: IGame[] = gamesDTO.map((gameDTO: IGameDTO) => {
          const gameEntity = new GameEntity()
          gameEntity.setEntityFromDTO(gameDTO)
          return gameEntity
        })

        return new GamesAggregate(games)
      })
    )
  }

  getGame(id: string): Observable<GameEntity | ErrorEntity>{
    return this.http.get<IGameDTO>(`${this.baseEndpoint}/game/?id=${id}`).pipe(
      map((gameDTO: IGameDTO) => {
        const gameEntity = new GameEntity()
        gameEntity.setEntityFromDTO(gameDTO)
        return gameEntity
      }),
      catchError(({ error } : { error: IErrorDTO }) => {
        const errorEntity = new ErrorEntity()
        errorEntity.setEntityFromDTO(error)
        return new Observable<ErrorEntity>(subscriber => subscriber.next(errorEntity))
      })
    )
  }

}
