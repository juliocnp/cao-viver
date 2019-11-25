import { Component, OnInit, Input } from '@angular/core';
import { Animal } from '../animal.model';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimaisComponent } from '../dialog-animais/dialog-animais.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  userAdmin: boolean;
 
  @Input() animal: Animal;

  constructor(private authService: AuthService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.authService.user.subscribe((user => {
      this.userAdmin = user ? user.admin : false;
    }));
  }

  atualizar() {
    const dialogRef = this.dialog.open(DialogAnimaisComponent, {
      width: '90%',
      data: {
        animal: this.animal
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.foto) {
          this.authService.uploadFoto(result, result.foto.target.files[0]);
        }
        this.authService.adicionarAnimal(result);
      }
    });
  }

  deletar() {
    this.authService.deletarAnimal(this.animal);
  }
}
