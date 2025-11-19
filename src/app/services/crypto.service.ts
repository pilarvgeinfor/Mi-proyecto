import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Coin } from '../models/coin.model';

@Injectable({ providedIn: 'root'})
export class CryptoService {
  private apiUrl = 'https://api.coingecko.com/api/coins/markets';

  constructor(private http: HttpClient) {}

  getCoins(vs_currency: string, per_page: number): Observable<Coin[]> {
    return this.http.get<Coin[]>(this.apiUrl, {
      params: {
        vs_currency,
        per_page: per_page.toString(),
        page: '1',
        sparkline: 'false'
      }
    }).pipe(
      catchError(error => {
        console.error('Error fetching coins:', error);
        return of([]);
      })
    );
  }

  private searchTermSource = new BehaviorSubject<string>(''); 
  searchTerm$ = this.searchTermSource.asObservable();

  updateSearchTerm(term: string) {
    this.searchTermSource.next(term);
  }
}