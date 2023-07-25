import { IGame } from "@core/entities/game.entity";

export interface IGamesAggregate {
    readonly games: IGame[]
}

export class GamesAggregate implements IGamesAggregate {
    public readonly games: IGame[]

    constructor(games: IGame[]) {
        this.games = games
    }
}