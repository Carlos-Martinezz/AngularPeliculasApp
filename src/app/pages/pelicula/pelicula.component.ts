import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MovieResponse } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Cast } from 'src/app/interfaces/credits-response';
import { combineLatest } from 'rxjs';

@Component({
	selector: 'app-pelicula',
	templateUrl: './pelicula.component.html',
	styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

	public pelicula : MovieResponse;
	public cast: Cast[] = [];

	constructor( private activatedRoute: ActivatedRoute, 
				 private peliculasService: PeliculasService,
				 private location: Location,
				 private router: Router ) { 

	}

	ngOnInit(): void {

		const ID = this.activatedRoute.snapshot.params.id;

		combineLatest([

			this.peliculasService.getPeliculaDetalle( ID ),
			this.peliculasService.getCast( ID )

		]).subscribe( ([ movie, cast ]) => {
			
			if( !movie ) {
				this.router.navigateByUrl('/home');
				return;
			}

			this.pelicula = movie;

			this.cast = cast.filter( actor => actor.profile_path !== null );

		});

		/* this.peliculasService.getPeliculaDetalle( ID ).subscribe( movie => {

			if( !movie ) {
				this.router.navigateByUrl('/home');
				return;
			}

			this.pelicula = movie;

		});

		this.peliculasService.getCast( ID ).subscribe( cast => this.cast = cast.filter( actor => actor.profile_path !== null ) ); */
		
	}

	onRegresar() {
		this.location.back();
	}

}
