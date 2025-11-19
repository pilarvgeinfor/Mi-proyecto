import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coin } from '../models/coin.model';
import { CryptoService } from '../services/crypto.service';


@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.sass']
})

export class CryptoComponent implements OnInit {

  coins: Coin[] = [];
  filteredCoins: Coin[] = [];

  constructor(
    private http: HttpClient,
    private cryptoService: CryptoService
  ) {}

  ngOnInit() {
    this.loadCoins();
    this.cryptoService.searchTerm$.subscribe(term => {
      this.filterCoins(term);
    });
  }

    //Cargar las criptomonedas desde la API
  loadCoins() {
    const url = '/api/coins/markets?vs_currency=usd';
    this.http.get<Coin[]>(url).subscribe(data => {
      //orden descendente según marketcap
      this.coins =data.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
      this.filteredCoins = this.coins;
  });
}

filterCoins(term: string) {
  if (!term) {
    this.filteredCoins = this.coins;
    return;
  }
  const lowerTerm = term.toLowerCase();
  this.filteredCoins = this.coins.filter(coin =>
    coin.name.toLowerCase().includes(lowerTerm) ||
    coin.symbol.toLowerCase().includes(lowerTerm)
  );
}
}