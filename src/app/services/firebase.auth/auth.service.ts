import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { UserService } from '../firebase.user/user.service';
import { User } from 'src/app/models/core/user/user';
import { AuthRole } from 'src/app/models/core/authRole/authRole';
import { AuthGroup } from 'src/app/models/core/authGroup/authGroup';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userRef$: Observable<firebase.User>;
  user$: Observable<User> = null;
  adm_allUsers$: Observable<User[]> = null;
  adm_allAuthRoles$: Observable<string[]> = null;
  adm_allAuthGroups$: Observable<string[]> = null;
  adm_Blacklist$: Observable<any[]> = null;

  private userRefSubs: any;
  private userSubs: any;
  private allUsersSubs: any;
  private balcklistSub: any;
  private allAuthGroups: any;

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private firestore: AngularFirestore,
    private router: Router,
    private ngZone: NgZone,
  ) {
    this.userRef$ = afAuth.authState;
    if (this.userRefSubs) { this.userRefSubs.unsubscribe(); }
    this.userRefSubs = this.userRef$.subscribe(userAutState => {
      if (userAutState === null) {
        if (this.userSubs) { this.userSubs.unsubscribe(); }
        if (this.balcklistSub) { this.balcklistSub.unsubscribe(); }
        if (this.allUsersSubs) { this.allUsersSubs.unsubscribe(); }
        if (this.allAuthGroups) { this.allAuthGroups.unsubscribe(); }
        this.userService.closeAllProfiles();
      }
      if (userAutState) {
        if (this.balcklistSub) { this.balcklistSub.unsubscribe(); }
        this.adm_Blacklist$ = this.getBlacklist();
        this.balcklistSub = this.adm_Blacklist$.pipe(map(action => action.includes(userAutState.uid))).subscribe(
          isBlackListed => { 
            if(isBlackListed){
              alert('You are Blacklisted: please contact your admin');
              this.logout();
            }
          },
          err => { throw err; }
        );
        this.user$ = this.userService.initUser$(userAutState);
        this.userService.initAllProfiles();
        if (this.userSubs) { this.userSubs.unsubscribe(); }
        this.userSubs = this.user$.subscribe(
          user => {
            if (user.roles.includes("admin") || user.roles.includes("authWriter") || user.roles.includes("authRead")) {
              this.adm_allUsers$ = this.userService.getAllUsers();
              if (this.allUsersSubs) { this.allUsersSubs.unsubscribe(); }
              this.allUsersSubs = this.adm_allUsers$.subscribe()
              this.adm_allAuthRoles$ = this.getAuthRoles();
              this.adm_allAuthGroups$ = this.getAuthGroups();
            }
          },
          err => {
            if (err.code === 'blacklisted') {
              alert('You are Blacklisted: please contact your admin');
              this.logout();
            } else {
              throw err;
            }
          }
        );

      }
    })
  }

  private getAuthGroups() {
    return this.firestore.collection('authGroup').doc('theAuthGroup').snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data() as AuthGroup;
        return data.groups;
      })
    );
  }

  addAuthGroup(groupName){
    if (this.allAuthGroups) { this.allAuthGroups.unsubscribe(); }
    this.allAuthGroups = this.adm_allAuthGroups$.subscribe(groups => {
      if(!groups.includes(groupName)){
        groups.push(groupName);
        this.firestore.collection('authGroup').doc('theAuthGroup').set({groups:groups});
      }
    })
  }

  deleteAuthGroup(groupName){
    if (this.allAuthGroups) { this.allAuthGroups.unsubscribe(); }
    this.allAuthGroups = this.adm_allAuthGroups$.subscribe(groups => {
      groups = groups.filter(e => e !== groupName);
      this.firestore.collection('authGroup').doc('theAuthGroup').set({groups:groups});
    })
  }

  private getBlacklist() {
    return this.firestore.collection('blacklist').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        return a.payload.doc.id
      }))
    );
  }

  addUserToBlacklist(user: User) {
    this.firestore.collection('blacklist').doc(user.id).set({});
  }

  removeUserToBlacklist(user: User) {
    this.firestore.collection('blacklist').doc(user.id).delete();
  }

  private getAuthRoles() {
    return this.firestore.collection('authRole').doc('theAuthRole').snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data() as AuthRole;
        return data.roles;
      })
    );
  }

  signup(email: string, password: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        this.router.navigate(['home']);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        this.router.navigate(['home']);
      });
  }

  login(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        this.router.navigate(['home']);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        this.router.navigate(['home']);
      });
  }

  loginWithGoogle() {
    var provider = new auth.GoogleAuthProvider();
    this.afAuth.signInWithRedirect(provider)
      .then((result) => {
        console.log('Nice, it worked!');
        this.router.navigate(['home']);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        this.router.navigate(['home']);
      });
  }

  logout() {
    if (this.userSubs) { this.userSubs.unsubscribe(); }
    if (this.balcklistSub) { this.balcklistSub.unsubscribe(); }
    if (this.allUsersSubs) { this.allUsersSubs.unsubscribe(); }
    if (this.allAuthGroups) { this.allAuthGroups.unsubscribe(); }
    this.userService.closeAllProfiles();
    this.afAuth.signOut();
    this.router.navigate(['home']);
  }

}
