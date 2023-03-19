import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'seriesTab',
        loadChildren: () => import('../seriesTab/seriesTab.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'categoriasTab',
        loadChildren: () => import('../categoriasTab/categoriasTab.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'busquedaTab',
        loadChildren: () => import('../busquedaTab/busquedaTab.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/seriesTab',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/seriesTab',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
