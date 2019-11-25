import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AnimaisComponent } from './animais/animais.component';
import { CardComponent } from './animais/card/card.component';
import { DialogAnimaisComponent } from './animais/dialog-animais/dialog-animais.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule }   from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { DoacaoComponent } from './doacao/doacao.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { config } from 'config';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    AnimaisComponent,
    CardComponent,
    DialogAnimaisComponent,
    DoacaoComponent,
    RelatorioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatSnackBarModule,
    AngularFireStorageModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatNativeDateModule,
    FormsModule,
    MatCardModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogAnimaisComponent
  ]
})
export class AppModule { }
