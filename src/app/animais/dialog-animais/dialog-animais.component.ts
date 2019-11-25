import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Animal } from '../animal.model';

@Component({
  selector: 'app-dialog-animais',
  templateUrl: './dialog-animais.component.html',
  styleUrls: ['./dialog-animais.component.scss']
})
export class DialogAnimaisComponent implements OnInit {
  nome: string;
  chegada: Date;
  descricao: string;
  adotado: boolean;
  id: string;
  foto: any;
  alterar = false;

  constructor(public dialogRef: MatDialogRef<DialogAnimaisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if (this.data.animal) {
      this.adotado = this.data.animal.adotado;
      this.chegada = this.data.animal.chegada;
      this.descricao = this.data.animal.descricao;
      this.nome = this.data.animal.nome;
      this.id = this.data.animal.id;
      this.alterar = true;
    } else {
      this.adotado = false;
      const dataAtual = new Date();
      this.id = dataAtual.getDate().toString()
        + dataAtual.getMonth().toString()
        + dataAtual.getFullYear().toString()
        + dataAtual.getMilliseconds().toString();
    }
  }

  adicionar() {
    let animal = new Animal();
    animal.adotado = this.adotado;
    animal.chegada = this.chegada;
    animal.descricao = this.descricao;
    animal.id = this.id;
    animal.nome = this.nome;
    animal.foto = this.foto;
    this.dialogRef.close(animal);
  }

  onFileChanged(file: any) {
    this.foto = file;
  }
}
