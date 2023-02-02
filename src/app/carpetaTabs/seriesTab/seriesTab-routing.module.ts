import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeriesTabPage } from './seriesTab.page';

const routes: Routes = [
  {
    path: '',
    component: SeriesTabPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
