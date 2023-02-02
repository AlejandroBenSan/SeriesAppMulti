import { Component } from '@angular/core';
import { SerieI } from 'src/app/interfaces/series';
import { Constantes } from 'src/app/modelos/Constantes';
import { SerieServicio } from 'src/app/servicios/serie.servicio';

@Component({
  selector: 'app-tab1',
  templateUrl: 'seriesTab.page.html',
  styleUrls: ['seriesTab.page.scss']
})
export class SeriesTabPage {

  series: SerieI[] = []

  constructor(private serieServicio: SerieServicio) {
    this.obtenerSeries();
    
  }

  obtenerSeries():void{
    fetch(Constantes.HOST_LOCAL + '/api/series',{
      method: "GET",
    })
      .then(response => response.json())
      .then(jsonRespuesta => {
        this.series = jsonRespuesta as SerieI[];
        this.series = this.series.sort((a, b) => (a.year < b.year) ? 1 : -1);
      })
      .catch(error => console.error(error));
  }

  loadData(event:any) {
    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        if (this.series.length >= this.series.length) {
          event.target.complete();
          return;
        }
  
        const image = this.series[this.series.length];
        this.series.push(image);
      }
      event.target.complete();
    }, 500);
  }

}
