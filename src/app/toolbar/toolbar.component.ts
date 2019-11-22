import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from 'firebase';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  
  userDisplay: string;
  
  ngOnInit() { 
    this.authService.user.subscribe((user => {
      this.userDisplay = user ? user.displayName : '';
    }))
   }

  constructor(
    private router: Router,
    private authService: AuthService
    ) {
  }

  Login() {
    //this.router.navigate(['/login']);
    this.authService.googleLogin();
  }

  Logout() {
    this.authService.signOut();
  }
}
