import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  
  userDisplay: string;
  userAdmin: boolean;
  
  ngOnInit() { 
    this.authService.user.subscribe((user => {
      this.userDisplay = user ? user.displayName : '';
      this.userAdmin = user ? user.admin : false;
    }));
   }

  constructor(
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar
    ) {
  }

  Login() {
    this.authService.googleLogin();
  }

  Logout() {
    this.authService.signOut();
  }

  animais() {
    this.router.navigate(['/animais']);
  }

  relatorio() {
    if (this.userDisplay) {
      this.router.navigate(['/relatorio']);
    } else {
      this._snackBar.open('Por favor, faça o login.', null, {
        duration: 2000,
      });
    }
  }
  doacao() {
    if (this.userDisplay) {
      this.router.navigate(['/doacao']);
    } else {
      this._snackBar.open('Por favor, faça o login.', null, {
        duration: 2000,
      });
    }
  }
}
