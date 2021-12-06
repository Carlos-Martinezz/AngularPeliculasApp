import { HttpClient } from '@angular/common/http';
import { Injectable   } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { Cast, CreditsResponse } from '../interfaces/credits-response';
import { MovieResponse } from '../interfaces/movie-response';

@Injectable({
	providedIn: 'root'
})
export class PeliculasService {

	private BASE_URL = "https://api.themoviedb.org/3"
	private carteleraPage = 1;
	public cargando: boolean = false;

	constructor( private http: HttpClient ) {

	}

	get params() {
		return {
			api_key: '',
			language: 'es-ES',
			page: this.carteleraPage.toString()
		}
	}

	resetCarteleraPage() {
		this.carteleraPage = 1;
	}

	getCartelera(): Observable<Movie[]> {

		if( this.cargando ) {
			return of([]);
		}

		return this.http.get<CarteleraResponse>(`${ this.BASE_URL }/movie/now_playing`, { params: this.params })
						.pipe(
							map( (response) => response.results ),
							tap( res => {
								this.carteleraPage += 1;
								this.cargando = false;
							})
						);

	}

	getPeliculas( texto: string ): Observable<Movie[]> {

		const params = { ...this.params, page: '1', query: texto }

		return this.http.get<CarteleraResponse>(`${ this.BASE_URL }/search/movie`, { params })
					.pipe(
						map( response => response.results )
					)

	}

	getPeliculaDetalle( id: string ) {
		return this.http.get<MovieResponse>(`${ this.BASE_URL }/movie/${ id }`, { 
			params: this.params 
		}).pipe(
			catchError( error => of( null ) )
		)
	}

	getCast( id: string ): Observable<Cast[]> {
		return this.http.get<CreditsResponse>(`${ this.BASE_URL }/movie/${ id }/credits`, { 
			params: this.params 
		}).pipe(
			map( res => res.cast ),
			catchError( error => of( null ) )
		)
	}

}
