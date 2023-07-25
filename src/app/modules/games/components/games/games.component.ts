import { Component, OnInit } from '@angular/core'
import { GamesAggregate } from '@core/aggregates/game.aggregate'
import { IGame } from '@core/entities/game.entity'
import { GameService } from '@infrastructure/services/game.service'
import { PageEvent } from '@angular/material/paginator'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html'
})
export class GamesComponent implements OnInit {
  public gamesFiltered   : IGame[]
  public games           : IGame[]
  public genres          : string[]
  public platforms       : string[]
  public isLoading       : boolean

  public pageSize        : number
  public from            : number
  public to              : number

  public filterTitle     : string
  public filterGenre     : string
  public filterPlatform  : string

  constructor(
    private route       : ActivatedRoute,
    private router      : Router,
    private gameService : GameService
  ) {
    this.gamesFiltered  = []
    this.games          = []
    this.genres         = []
    this.platforms      = []
    this.isLoading      = true
    this.pageSize       = 48
    this.from           = 0
    this.to             = this.pageSize
    this.filterTitle    = ''
    this.filterGenre    = ''
    this.filterPlatform = ''
  }

  ngOnInit(): void {
    this.getGames()

    this.route.queryParams.subscribe(params => {
      this.filterTitle = params['search'] || ''
    })
  }

  getGames(): void {
    this.gameService.getGames().subscribe((games: GamesAggregate) => {
      this.gamesFiltered  = games.games
      this.games          = games.games

      this.genres         = games.games.map(game => game.genre).filter((genre, index, self) => self.indexOf(genre) === index)
      this.platforms      = games.games.map(game => game.platform).filter((platform, index, self) => self.indexOf(platform) === index)
    }).add(() => {
      this.isLoading = false
    })
  }

  changePage(e: PageEvent): void {
    this.from = e.pageIndex * this.pageSize
    this.to   = this.from + this.pageSize
  }

  applyFilters() {
    this.gamesFiltered = this.games.filter((game) => {
      const genreMatch = this.filterGenre ? game.genre === this.filterGenre : true
      const platformMatch = this.filterPlatform ? game.platform === this.filterPlatform : true
      return genreMatch && platformMatch
    })
  }
}
