import { PokeApiService } from './../../service/poke-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private urlPokemon: string = `https://pokeapi.co/api/v2/pokemon`;
  private urlName: string = `https://pokeapi.co/api/v2/pokemon-species`;

  public pokemon: any;
  public isLoading: boolean = false;
  public apiError: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokeService:  PokeApiService
  ) { }

  ngOnInit(): void {
    this.getpokemon();
  }
  public getpokemon(){
    const id = this.activatedRoute.snapshot.params['id'];
    const pokemon = this.pokeService.getPokemons(`${this.urlPokemon}/${id}`);
    const name = this.pokeService.getPokemons(`${this.urlName}/${id}`);

    return forkJoin([pokemon, name]).subscribe(
      res =>{
        this.pokemon = res;
        this.isLoading = true;
      },
      error => {

        this.apiError = true

      }
    )


  }
}
