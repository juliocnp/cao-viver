import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Animal } from '../animais/animal.model';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss']
})
export class RelatorioComponent implements OnInit {
  totalDoado = 0;
  totalAnimais = 0;
  totalDoados = 0;
  totalADoar = 0;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.listarAnimais();
    this.authService.listaAnimais.subscribe((lista => {
      this.totalAnimais = lista.length;
      lista.forEach(animal => {
        if (animal.adotado) {
          this.totalDoados++;
        } else {
          this.totalADoar++;
        }
      })
    }).bind(this));
    this.authService.getTotalDoado();
    this.authService.totalDoado.subscribe((total => {
      this.totalDoado = total ? total : null;
    }));
  }

}
