import { Component, Input, OnInit } from '@angular/core'
import { IGame } from '@core/entities/game.entity'

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit {
  @Input() game!     : IGame

  public   isLoading : boolean = true

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