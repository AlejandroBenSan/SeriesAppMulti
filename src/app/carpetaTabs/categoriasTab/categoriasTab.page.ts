import { Component } from '@angular/core';
import { SerieI } from 'src/app/interfaces/series';
import { Constantes } from 'src/app/modelos/Constantes';
import { SerieServicio } from 'src/app/servicios/serie.servicio';

@Component({
  selector: 'app-tab2',
  templateUrl: 'categoriasTab.page.html',
  styleUrls: ['categoriasTab.page.scss']
})
export class CategoriasTabPage {

  series: SerieI[] = []
  seriesPorCategoria: SerieI[] = []
  categorias:string[] = []
  enlacesAvatares:string[] = []
  contadorSlide:number = 0
  filtrada: boolean = false;

  constructor(private serieServicio: SerieServicio) {
    this.cargarCategorias();
    this.cargarAvatares();
    this.obtenerSeries();
  }

  ngOnInit(){
   
  }

  obtenerSeries():void{
    fetch(Constantes.HOST_LOCAL + '/api/series',{
      method: "GET",
    })
      .then(response => response.json())
      .then(jsonRespuesta => {
        this.series = jsonRespuesta as SerieI[];
        this.series = this.series.sort((a, b) => (a.year < b.year) ? 1 : -1);
        this.cargarCategoriaInicial();
        
      })
      .catch(error => console.error(error));
      
  }

  cargarCategoriaInicial(){
    console.log(this.series)
    for (let i = 0; i < this.series.length; i++) {
      for (let j = 0; j < this.series[i].categories.length; j++) {
        if(this.series[i].categories[j] == this.categorias[this.contadorSlide]) {
          this.seriesPorCategoria.push(this.series[i]);
          this.filtrada = true
          break;
        }
      }
    }
  }

  filtarPorCategoriaPositiva(){
    this.seriesPorCategoria = [];
    this.contadorSlide++;
    for (let i = 0; i < this.series.length; i++) {
      for (let j = 0; j < this.series[i].categories.length; j++) {
        if(this.series[i].categories[j] == this.categorias[this.contadorSlide]) {
          this.seriesPorCategoria.push(this.series[i]);
          this.filtrada = true
          break;
        }
      }
    }
  }

  filtarPorCategoriaNegativa(){
    this.seriesPorCategoria = [];
    this.contadorSlide--;
    for (let i = 0; i < this.series.length; i++) {
      for (let j = 0; j < this.series[i].categories.length; j++) {
        if(this.series[i].categories[j] == this.categorias[this.contadorSlide]) {
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

  cargarAvatares():void{
    this.enlacesAvatares =[
      "https://img2.freepng.es/20180618/zky/kisspng-action-film-cinema-computer-icons-action-movie-5b285b5a195291.8938386215293714821037.jpg",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      
    ]
  }

}

