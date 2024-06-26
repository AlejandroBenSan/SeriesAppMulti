import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusquedaTabPage } from './busquedaTab.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { Tab3PageRoutingModule } from './busquedaTab-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab3PageRoutingModule,
    ComponentsModule
  ],
  declarations: [BusquedaTabPage]
})
export class Tab3PageModule {}
