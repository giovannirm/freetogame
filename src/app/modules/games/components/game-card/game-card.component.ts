import { Component, Input, OnInit } from '@angular/core'
import { GameEntity, IGame } from '@core/entities/game.entity'

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit {
  @Input() game      : IGame

  public   isLoading : boolean = true

  constructor() { 
    this.game = new GameEntity()
  }
  
  ngOnInit(): void {
    this.loadImage()
  }

  loadImage(): void {
    const img = new Image()
    img.onload = () => {
      this.isLoading = false
    }
    img.src = this.game.thumbnail
  }
}