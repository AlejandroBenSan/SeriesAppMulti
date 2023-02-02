import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeriesTabPage } from './seriesTab.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { Tab1PageRoutingModule } from './seriesTab-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule
  ],
  declarations: [SeriesTabPage]
})
export class Tab1PageModule {}