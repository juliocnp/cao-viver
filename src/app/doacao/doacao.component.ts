import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-doacao',
  templateUrl: './doacao.component.html',
  styleUrls: ['./doacao.component.scss']
})
export class DoacaoComponent implements OnInit {
  valor: number;
  userId: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.user.subscribe((user => {
      this.userId = user ? user.uid : '';
    }));
  }

  doar() {
    this.authService.doar(this.valor, this.userId);
  }
}
