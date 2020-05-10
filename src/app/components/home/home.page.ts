import { Component, Output, EventEmitter, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/firebase.auth/auth.service';
import { UserService } from 'src/app/services/firebase.user/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/core/user/user';
import { IonReorderGroup } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit {

  @ViewChild(IonReorderGroup, null) reorderGroup: IonReorderGroup;

  title: string = 'Home';

  // @Output() title = new EventEmitter<string>();

  constructor(
    public authService: AuthService,
    public userService: UserService,
  ) {
  }

  ngOnInit() {}

  doReorder(ev: any) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    console.log(ev)

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }

  // ionViewWillEnter() {
  //   this.title.emit("Hallo");
  // }

}
