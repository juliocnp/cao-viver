import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimaisComponent } from './dialog-animais/dialog-animais.component';
import { Animal } from './animal.model';

@Component({
  selector: 'app-animais',
  templateUrl: './animais.component.html',
  styleUrls: ['./animais.component.scss']
})
export class AnimaisComponent implements OnInit {
  userAdmin: boolean;
  animalSelecionado: Animal;
  listaAnimais: Array<Animal>;

  constructor( private authService: AuthService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.authService.listarAnimais();
    this.authService.user.subscribe((user => {
      this.userAdmin = user ? user.admin : false;
    }));
    this.authService.listaAnimais.subscribe((lista => {
      this.listaAnimais = lista ? lista : null;
    }));
  }

  openModal() {
    const dialogRef = this.dialog.open(DialogAnimaisComponent, {
      width: '90%',
      data: {
        animal: this.animalSelecionado
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

}
