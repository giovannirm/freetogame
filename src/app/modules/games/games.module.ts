import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesRoutingModule } from './games-routing.module';
import { GameCardComponent } from './components/game-card/game-card.component';
import { GamesComponent } from './components/games/games.component';
import { GameComponent } from './components/game/game.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MATPaginatorIntlEs } from 'src/app/components/mat-paginator-intl-es/mat-paginator-intl-es';
import { ImageSuffixPipe } from 'src/app/shared/pipes/image-suffix.pipe';
import { SpinnerImageComponent } from 'src/app/components/spinner-image/spinner-image.component';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    GameCardComponent,
    GamesComponent,
    GameComponent,
    SpinnerComponent,
    SpinnerImageComponent,
    ImageSuffixPipe,
    FilterPipe
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MATPaginatorIntlEs }
  ]
})
export class GamesModule { }