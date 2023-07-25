import { Pipe, PipeTransform } from '@angular/core';
import { IGame } from '@core/entities/game.entity';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(games: IGame[], arg: string): IGame[] {
    if (arg === '') return games

    const resultGames: IGame[] = games.filter((game: IGame) => {
      return game.title.toLowerCase().includes(arg.toLowerCase())
    })
    
    return resultGames;
  }

}
