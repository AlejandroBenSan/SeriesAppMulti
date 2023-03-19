import { Component, ViewChild } from '@angular/core';
import { SerieI } from 'src/app/interfaces/series';
import { Constantes } from 'src/app/modelos/Constantes';
import { SerieServicio } from 'src/app/servicios/serie.servicio';
import { AnimationController, ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { ObjectId } from 'mongoose';
import { AlertController } from '@ionic/angular';
import { categoriaI } from 'src/app/interfaces/categoria';

@Component({
  selector: 'app-tab2',
  templateUrl: 'categoriasTab.page.html',
  styleUrls: ['categoriasTab.page.scss']
})
export class CategoriasTabPage {

  numeros: number[] = [1,2,3,4,5,6]
  series: SerieI[] = []
  seriesPorCategoria: SerieI[] = []
  categorias:string[] = []
  enlacesAvatares:string[] = []
  contadorSlide:number = 0
  filtrada: boolean = false;
  @ViewChild('modalPuntuacion', { static: false }) modalPuntuacion: IonModal | undefined;
  serieSeleccionada: SerieI = {} as SerieI
  serieVoto: SerieI = {} as SerieI
  voto: number = 0
  slides: categoriaI[][] = [];
  categoriasObj: categoriaI[] = []
  categoriaActiva: string = ""

  constructor(private serieServicio: SerieServicio, private animationCtrl: AnimationController,
    private modalCtrl: ModalController,private alertController: AlertController,private toastController: ToastController) {
    this.cargarCategorias();
    this.cargarCategoriasImagenes();
    this.rellenarCategorias();
    this.obtenerSeries();
  }

  ngOnInit(){
   this.dividirCategorias();
  }

  obtenerSeries():void{
    fetch(Constantes.HOST_LOCAL + '/api/series',{
      method: "GET",
    })
      .then(response => response.json())
      .then(jsonRespuesta => {
        this.series = jsonRespuesta as SerieI[];
        this.series = this.series.sort((a, b) => (a.year < b.year) ? 1 : -1);
        //this.cargarCategoriaInicial();
        
      })
      .catch(error => console.error(error));
      
  }
  //PRUEBA
  dividirCategorias() {
    this.slides = [];
    const categoriasPorSlide = 3;
    const numSlides = Math.ceil(this.categoriasObj.length / categoriasPorSlide);
    for (let i = 0; i < numSlides; i++) {
      const inicio = i * categoriasPorSlide;
      const fin = inicio + categoriasPorSlide;
      this.slides.push(this.categoriasObj.slice(inicio, fin));
    }
  }

  filtrar(categoria: string){
    this.seriesPorCategoria = []
    this.categoriaActiva = categoria;
    for (let i = 0; i < this.series.length; i++) {
      for (let j = 0; j < this.series[i].categories.length; j++) {
        if(this.series[i].categories[j] == categoria) {
          this.seriesPorCategoria.push(this.series[i]);
          this.filtrada = true
          break;
        }
      }
    }
  }

  loadData(event:any) {
    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        if (this.seriesPorCategoria.length >= this.seriesPorCategoria.length) {
          event.target.complete();
          return;
        }
  
        const image = this.seriesPorCategoria[this.seriesPorCategoria.length];
        this.seriesPorCategoria.push(image);
      }
      event.target.complete();
    }, 500);
  }

  cargarCategorias():void{
    this.categorias = ["Acción","Animes","Británicos","Ciencia y naturaleza","Comedias",
    "Contenido infantil","De adolescentes","De EE.UU.","De España","Europeos","Internacionales",
    "Reality shows y entrevistas","Romances","Bélicas","Histórica","Hechos reales","Salud física","Sci-fi y fantasía",
    "Series documentales","Crimenes","Terror","Thriller"]
  }

  cargarCategoriasImagenes(){
    this.enlacesAvatares = [
      "https://cdn-icons-png.flaticon.com/512/2589/2589332.png",
      "https://w7.pngwing.com/pngs/886/233/png-transparent-anime-computer-icons-desktop-animated-film-anime-logo-cartoon-film-thumbnail.png",
      "https://img.icons8.com/offices/480/british-movies.png",
      "https://thumbs.dreamstime.com/b/icono-logo-design-element-del-laboratorio-de-ciencia-de-eco-de-la-naturaleza-97103855.jpg",
      "https://img.icons8.com/color/480/comedy.png",
      "https://img.freepik.com/vector-premium/nino-lindo-viendo-peliculas-cine_110279-352.jpg",
      "https://cdn-icons-png.flaticon.com/512/306/306337.png",
      "https://cdn-icons-png.flaticon.com/512/323/323310.png",
      "https://previews.123rf.com/images/korionov/korionov1006/korionov100600100/7249597-icono-con-la-bandera-de-espa%C3%B1a-aislado-sobre-fondo-blanco.jpg",
      "https://st.depositphotos.com/1005534/1256/v/600/depositphotos_12563649-stock-illustration-europe-flag-glossy-button.jpg",
      "https://us.123rf.com/450wm/yupiramos/yupiramos1802/yupiramos180224323/96074528-globo-mundo-mundo-tierra-planeta-icono-vector-ilustraci%C3%B3n.jpg",
      "https://i.pinimg.com/736x/57/df/5b/57df5b088e4f7b14e2fb976083524518.jpg",
      "https://previews.123rf.com/images/sonulkaster/sonulkaster1710/sonulkaster171000228/87661503-logotipo-de-icono-de-g%C3%A9nero-de-pel%C3%ADcula-rom%C3%A1ntica-de-corazones-de-amor-y-anillo-de-bodas-vector.jpg",
      "https://w7.pngwing.com/pngs/906/705/png-transparent-weapon-firearm-computer-icons-gun-shot-angle-logo-handgun.png",
      "https://cdn-icons-png.flaticon.com/512/2665/2665931.png",
      "https://thumbs.dreamstime.com/z/icono-del-cine-cinematograf%C3%ADa-y-pel%C3%ADculas-93332779.jpg",
      "https://thumbs.dreamstime.com/b/icono-de-color-curso-yoga-en-l%C3%ADnea-rgb-grupo-disciplina-f%C3%ADsica-mental-y-espiritual-pr%C3%A1ctica-mente-corporal-completa-equilibrio-225424537.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Sci-fi_film_icon.svg/220px-Sci-fi_film_icon.svg.png",
      "https://thumbs.dreamstime.com/z/documentales-streaming-black-glyph-icono-cine-de-no-ficci%C3%B3n-serie-truecrime-servicio-transmisi%C3%B3n-v%C3%ADdeo-demostraciones-218515340.jpg",
      "https://thumbs.dreamstime.com/b/icono-del-vector-cine-crimen-g%C3%A9nero-de-la-pel%C3%ADcula-bala-vicitm-101447323.jpg",
      "https://cdn-icons-png.flaticon.com/512/2589/2589413.png",
      "https://previews.123rf.com/images/pedrolieb/pedrolieb1210/pedrolieb121000031/16084898-clap-pel%C3%ADcula-del-cine-de-g%C3%A9nero-thriller-ilustraci%C3%B3n-clapperboard-texto.jpg"
    ]
  }

  rellenarCategorias()
  {
    for(let i =0;i<this.enlacesAvatares.length;i++){
      let categoria: categoriaI = {nombre: this.categorias[i], imagen: this.enlacesAvatares[i]};
      this.categoriasObj.push(categoria)
    }
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
                this.modalPuntuacion?.dismiss();
                console.log(data);
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

