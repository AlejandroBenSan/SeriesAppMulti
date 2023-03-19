import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriasTabPage } from './categoriasTab.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { Tab2PageRoutingModule } from './categoriasTab-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    ComponentsModule
  ],
  declarations: [CategoriasTabPage]
})
export class Tab2PageModule {}
