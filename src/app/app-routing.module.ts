import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { CryptoComponent } from './crypto/crypto.component';

const routes: Route[] = [
  {path: '', redirectTo: 'crypto', pathMatch: 'full'},
  {path: 'crypto', component: CryptoComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
