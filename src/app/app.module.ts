import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from './services/firebase.auth/auth.service';
import { UserService } from './services/firebase.user/user.service';
import { HomePage } from './components/home/home.page';
import { HeaderComponent } from './components/core/header/header.component';
import { DragulaModule } from 'ng2-dragula';
import { Adm_GroupsComponent } from './components/admin/adm.groups/adm.groups.component';
import { Adm_UsersComponent } from './components/admin/adm.users/adm.users.component';
import { Adm_MainComponent } from './components/admin/adm.main/adm.main.component';
import { Adm_HomeComponent } from './components/admin/core/adm.home/adm.home.component';
import { PopoverComponent } from './components/admin/adm.main/popover/popover.component';
import { Adm_BlacklistComponent } from './components/admin/adm.blacklist/adm.blacklist.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    HeaderComponent,
    Adm_UsersComponent,
    Adm_GroupsComponent,
    Adm_MainComponent,
    Adm_HomeComponent,
    Adm_BlacklistComponent,
    PopoverComponent,
  ],
  entryComponents: [
    PopoverComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    DragulaModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
