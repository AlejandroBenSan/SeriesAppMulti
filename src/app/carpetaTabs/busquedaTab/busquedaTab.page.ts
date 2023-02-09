import { Component, ViewChild } from '@angular/core';
import { SerieI } from 'src/app/interfaces/series';
import { Constantes } from 'src/app/modelos/Constantes';
import { SerieServicio } from 'src/app/servicios/serie.servicio';
import { AnimationController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'busquedaTab.page.html',
  styleUrls: ['busquedaTab.page.scss']
})
export class BusquedaTabPage {

  series: SerieI[] = []
  seriesFiltradas: SerieI[] = []
  nombreSerie:string = ""
  serieSeleccionada: SerieI = {} as SerieI
  @ViewChild('modalPuntuacion', { static: false }) modalPuntuacion: IonModal | undefined;
  voto: number = 0

  constructor(private serieServicio: SerieServicio, private animationCtrl: AnimationController,private modalCtrl: ModalController) {
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

  busquedaNombre(){
    this.seriesFiltradas = this.series.filter(serie => {
      return serie.title.toLowerCase().includes(this.nombreSerie.toLowerCase());
    });
  }

  //MODAL

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root!.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root!.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };

  //MODAL PUNTUACIÓN


}

