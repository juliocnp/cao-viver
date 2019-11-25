import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of, Subject } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import { User } from '../login/user.model';
import { Animal } from '../animais/animal.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;
  user$: User;
  listaAnimais = new Subject<Array<Animal>>();
  totalDoado = new Subject<number>();

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private fireStorage: AngularFireStorage,
    private _snackBar: MatSnackBar
  ) {
      //// Get auth data, then get firestore user document || null
      this.user = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
          } else {
            return of(null)
          }
        })
      );

      this.user.subscribe((user) => this.user$ = user);
    }

  getAdmin(): boolean {
    this.afs.collection('users').get().subscribe((querySnapShot) => {
      querySnapShot.forEach(element => {
        if (element.data().uid === this.user$.uid)
        return element.data().admin;
      });
    })

    return false;
  }

  getRedirectResult() {
    this.afAuth.auth.getRedirectResult().then(function(result) {
      if (result && result.user) {
        this.updateUserData(result.user);
        this.getAdmin();
      }
    }.bind(this));
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  private async oAuthLogin(provider) {
    await this.afAuth.auth.signInWithRedirect(provider);
  }


  private updateUserData(user) {
    // Sets user data to firestore on login

     const admin = this.getAdmin();

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    return userRef.set(data, { merge: true })

  }


  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
    });
  }

  uploadFoto(animal: Animal, file: any) {
    const ref = this.fireStorage.ref(animal.id);
    ref.put(file);
    this.listarAnimais();
  }

  deletarAnimal(animal: Animal) {
    const ref = this.afs.collection('animal');
    ref.doc(animal.id).delete().then(function() {
      this._snackBar.open('Animal deletado.', null, {
        duration: 2000,
      });
    }.bind(this))
    .catch(function() {
      this._snackBar.open('Erro ao deletar animal.', null, {
        duration: 2000,
      });
    }.bind(this));
    this.listarAnimais();
  }

  adicionarAnimal(animal: Animal) {
    const ref = this.afs.collection('animal');
    ref.doc(animal.id).set({
      nome: animal.nome,
      chegada: animal.chegada,
      descricao: animal.descricao,
      adotado: animal.adotado,
      id: animal.id
    }).then(function() {
      this._snackBar.open('Animal adicionado.', null, {
        duration: 2000,
      });
    }.bind(this)).catch(function() {
      this._snackBar.open('Erro ao adicionar animal', null, {
        duration: 2000,
      });
    }.bind(this));
    this.listarAnimais();
  }

  doar(valor: number, uid: string) {
    const ref = this.afs.collection('doacao');
    const date = new Date();
    const id = date.getDate().toString() + date.getMonth().toString() + date.getFullYear().toString() + date.getMilliseconds().toString();
    ref.doc(id).set({
      uid: uid,
      valor: valor
    }).then(function() {
      this._snackBar.open('Doação efetuada, obrigado!', null, {
        duration: 2000,
      });
    }.bind(this)).catch(function() {
      this._snackBar.open('Erro ao efetuar doação, tente novamente', null, {
        duration: 2000,
      });
    }.bind(this));
  }

  getTotalDoado() {
    let total = 0;
    this.afs.collection('doacao').get().subscribe((result) => {
      result.forEach(element => {
        total += element.data().valor;
      });
      setTimeout(function() {
        this.totalDoado.next(total);
      }.bind(this), 0);
    });
  }

  listarAnimais() {
    const listaAnimais = Array<Animal>();
    this.afs.collection('animal').get().subscribe((querySnapShot) => {
      querySnapShot.forEach(element => {
        let animal = new Animal();
        animal.adotado = element.data().adotado;
        animal.chegada = new Date(element.data().chegada.seconds * 1000);
        animal.descricao = element.data().descricao;
        animal.nome = element.data().nome;
        animal.id = element.data().id;
        this.fireStorage.storage.refFromURL('gs://cao-viver.appspot.com/')
          .child(animal.id).getDownloadURL().then(function(url) {
            animal.fotoURL = url;
          });
        listaAnimais.push(animal);
      });
      setTimeout(function() {
        this.listaAnimais.next(listaAnimais);
      }.bind(this), 0);
    })
  }
}
