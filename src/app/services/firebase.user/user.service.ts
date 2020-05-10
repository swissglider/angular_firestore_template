import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, catchError } from 'rxjs/operators';
import { User } from 'src/app/models/core/user/user';
import { Profile } from 'src/app/models/core/profile/profile';
import { Observable, throwError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private allProfiles = []

  private allProfilesSub: any;

  constructor(
    private firestore: AngularFirestore,
    private ngZone: NgZone,
  ) { }

  initAllProfiles() {
    this.allProfilesSub = this.firestore.collection('profiles').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Profile;
        data.id = a.payload.doc.id;
        return data
      }))
    ).subscribe(
      profiles => {
        this.ngZone.run(() => {
          this.allProfiles = profiles;
        });
      },
      err => {
        this.allProfiles = [];
      }
    );
  }

  closeAllProfiles() {
    if (this.allProfilesSub) { this.allProfilesSub.unsubscribe(); }
  }

  getProfile(userID: string) {
    return this.allProfiles.find(e => e.id == userID)
  }

  getUser$(userID: string): Observable<User> {
    return this.firestore.collection('users').doc(userID).snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists) {
          const data = action.payload.data() as User;
          data.id = action.payload.id;
          return data;
        } else {
          console.log('£££££££££££££££££££££££££££££');
          console.log(action);
          return null;
        }
      }),
      catchError(err => {
        if (err.code === 'permission-denied') {
          err.code = 'blacklisted';
          err.message = 'This user is blacklisted - UserService.getUser() not possible !';
        }
        return throwError(err);
      })
    );
  }

  initUser$(userRef): Observable<User> {
    let user = this.getUser$(userRef.uid);
    return user.pipe(
      map(u => {
        if (u) {
          return u;
        }
        if (u === null) {
          console.log('!!!!!!!!!!!!!!!!!!!!!!!!!')
          this.createUser$(userRef).then(a => {
            return this.getUser$(userRef.uid);
          });
        }
      }),
      catchError(err => {
        return throwError(err);
      })
    )
  }

  createUser$(userRef) {
    let user: User = {
      roles: [],
      groups: []
    }
    let profile: Profile = {
      displayName: userRef.displayName,
      photoURL: userRef.photoURL
    }
    this.firestore.collection('profiles').doc(userRef.uid).set(profile);
    return this.firestore.collection('users').doc(userRef.uid).set(user);
  }

  setUser(user) {
    let user1: User = {
      roles: user.roles,
      groups: user.groups
    }
    this.firestore.collection('users').doc(user.id).set(user1);
  }

  getProfile$(userID: string): Observable<Profile> {
    return this.firestore.collection('profiles').doc(userID).snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists) {
          return action.payload.data() as Profile;
        } else {
          return null;
        }
      })
    );
  }

  getAllUsers() {
    return this.firestore.collection('users').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        data.id = a.payload.doc.id;
        return data
      }))
    );
  }

}
