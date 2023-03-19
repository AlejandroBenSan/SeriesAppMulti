import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeriesTabPage } from './seriesTab.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { Tab1PageRoutingModule } from './seriesTab-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    ComponentsModule
  ],
  declarations: [SeriesTabPage]
})
export class Tab1PageModule {}
