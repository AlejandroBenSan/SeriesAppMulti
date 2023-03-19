import { Component, ViewChild } from '@angular/core';
import { SerieI } from 'src/app/interfaces/series';
import { Constantes } from 'src/app/modelos/Constantes';
import { SerieServicio } from 'src/app/servicios/serie.servicio';
import { AnimationController, ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { ObjectId } from 'mongoose';
import { AlertController } from '@ionic/angular';

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
  serieVoto: SerieI = {} as SerieI

  constructor(private serieServicio: SerieServicio, private animationCtrl: AnimationController,
    private modalCtrl: ModalController,private alertController: AlertController,private toastController: ToastController) {
    this.obtenerSeries();
  }

  //OBTENEMOS LAS SERIES
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

  //CARGAMOS LAS TRES SERIES 
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

  //FLITRAMS POR EL NOMBRE
  busquedaNombre(){
    this.seriesFiltradas = this.series.filter(serie => {
      const nombreSerie = this.nombreSerie.toLowerCase();
      const sinopsis = serie.synopsis.toLowerCase();
      return serie.title.toLowerCase().includes(nombreSerie) || sinopsis.includes(nombreSerie);
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

  async guardarPuntuacion(id: string | ObjectId){
    const emailUser = (<HTMLInputElement>document.getElementById("emailVoto")).value;
    const votoUser = this.voto;
    console.log(votoUser)

    this.alertConfirmVote(emailUser,this.serieVoto,votoUser);

    }

    //COMPROBAMOS EL EMAIL DE VALIDACIÓN
  comprobarEmail(email: string, serie: SerieI){
    for (let i = 0; i < serie.scoring.length; i++) {
      if (serie.scoring[i].email === email) {
        this.alertaEmail();
      return true;
      }
    }
    return false;
  }

  //ALERT EMAIL YA INTRODUCIDO
  async alertaEmail() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Email',
      message: 'Ya se ha votado esta serie con el email proporcionado',
      buttons: ['OK'],
    });

    await alert.present();
  }

  //ALERT VOTO CONFIRMACIÓN
  async alertConfirmVote(emailUser :string,serie: SerieI,votoUser: number) {
    //MOSTRAMOS LAS DOS OPCIONES DE CONFIRMAR O CANCELAR
    const alert = await this.alertController.create({
      header: '¿Desea confirmar el voto?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //EN EL CASO DE CANCELAR
          },
        },
        {
          text: 'Confirmar',
          role: 'Confirmar',
          handler: async () => {
            //EN EL CASO DE CONFIRMAR
            if(!this.comprobarEmail(emailUser,this.serieVoto)){
              try {
                // Primero, hacemos una petición GET para obtener los datos de la serie
                const respuesta = await fetch(`http://localhost:3000/api/obtenerSerie/${this.serieVoto._id}`);
                const serie = await respuesta.json();
            
                // Agregamos los nuevos valores al array
                serie.scoring.push({ email: emailUser, vote: votoUser });
            
                // Petición PUT para actualizar la serie en la base de datos
                const response = await fetch(`http://localhost:3000/api/series/scoring/${this.serieVoto._id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(serie),
                });
                //MOSTRAMOS EL TOAST
                this.presentToast('top');
                const data = await response.json();
                console.log(data);
                this.modalPuntuacion?.dismiss();
              } catch (err) {
                console.error(err);
              }
            }
          },
        },
      ],
    });

    await alert.present();
  }

  //CALCULAMOS LA MEDIA DE LA NOTA
  calcularMediaNota(serie: SerieI){
    let sumaVotos = 0;
    for (let i = 0; i < serie.scoring.length; i++) {
      sumaVotos += serie.scoring[i].vote;
    }
    return (sumaVotos / serie.scoring.length).toFixed(2);
  }

  //FUNCION PARA MOSTRAR TOAST
  async presentToast(position:any) {
    const toast = await this.toastController.create({
      message: 'Serie votada con extito',
      duration: 1500,
      position: position
    });

    await toast.present();
  }
}