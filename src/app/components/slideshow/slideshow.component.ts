import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

//Swiper Carrusel
import Swiper from 'swiper';

@Component({
	selector: 'app-slideshow',
	templateUrl: './slideshow.component.html',
	styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

	@Input() movies: Movie[];
	public mySwiper: Swiper;
	
	constructor( ) { 
		
	}

	ngAfterViewInit(): void {

		this.mySwiper = new Swiper('.swiper-container', {
			loop: true,
		});

	}

	ngOnInit(): void {

	}

	//Previous and Next Slide
	nextSlide() {
		this.mySwiper.slideNext();
	}

	prevSlide() {
		this.mySwiper.slidePrev();
	}

}
