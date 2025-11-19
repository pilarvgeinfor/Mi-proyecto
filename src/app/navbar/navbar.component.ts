import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../services/crypto.service';
import { HttpClient } from '@angular/common/http';
import { Coin } from '../models/coin.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
    coins: Coin[] = [];
    filteredCoins: Coin[] = [];
    searchTerm: string = '';
    searchSuggestions: Coin[] = [];

constructor(private http: HttpClient, private CryptoService: CryptoService) {}

ngOnInit(): void {
  this.loadCoins();
}

  loadCoins() {
    const url = '/api/coins/markets?vs_currency=usd';
    this.http.get<Coin[]>(url).subscribe(data => {
      this.coins =data.sort((a, b) => a.market_cap_rank - b.market_cap_rank);
      this.filteredCoins = this.coins;
    });
  }

  getSearchSuggestions() {
    const term = this.searchTerm.toLowerCase().trim();

    if (term === '') {
        this.searchSuggestions = [];
        return;
    }

    this.searchSuggestions = this.coins.filter(coin =>
        coin.name.toLowerCase().includes(term) ||
        coin.symbol.toLowerCase().includes(term)
      ).slice(0, 5); // Limitar a 5 sugerencias

}

   searchCoins() {
    this.CryptoService.updateSearchTerm(this.searchTerm); 
    this.searchSuggestions = [];
  }

  selectSuggestion(coinName: string) {
    this.searchTerm = coinName;
    this.searchCoins();
  }

  clearSearch() {
    this.searchTerm = '';
    this.searchSuggestions = [];
    this.CryptoService.updateSearchTerm('');
  }
} 