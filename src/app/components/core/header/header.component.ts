import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from 'src/app/services/firebase.auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  appTitle:string = 'Posts App';
  @Input() siteTitle;

  constructor(
    public authService: AuthService,
    public router: Router,
  ) { }

  ngOnInit() {
  }

  openADM(){
    this.router.navigate(['adm_home']);
  }

}
