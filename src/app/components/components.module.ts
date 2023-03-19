import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenuPrincipalComponent } from './menuPrincipal/menuPrincipal.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    HeaderComponent,
    MenuPrincipalComponent
  ],
  exports: [
    HeaderComponent,
    MenuPrincipalComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
