import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimaisComponent } from './animais/animais.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { DoacaoComponent } from './doacao/doacao.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/animais',
    pathMatch: 'full'
  },
  {
    path: 'animais',
    component: AnimaisComponent
  },
  {
    path: 'relatorio',
    component: RelatorioComponent
  },
  {
    path: 'doacao',
    component: DoacaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
