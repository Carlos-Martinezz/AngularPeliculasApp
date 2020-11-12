import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { StarRatingComponent } from 'ng-starrating';
import { Router } from '@angular/router';

@Component({
	selector: 'app-peliculas-poster-grid',
	templateUrl: './peliculas-poster-grid.component.html',
	styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {

	@Input() movies: Movie[];

	constructor( private router: Router ) {

	}

	ngOnInit(): void {

	}

	onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
		alert(`Old Value:${ $event.oldValue }, 
		  New Value: ${ $event.newValue }, 
		  Checked Color: ${ $event.starRating.checkedcolor }, 
		  Unchecked Color: ${ $event.starRating.uncheckedcolor }`);
	}

	onMovieClick( movie: Movie ) {
		this.router.navigate(['/pelicula', movie.id]);
	}
}
