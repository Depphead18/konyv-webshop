import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, collection, query, where, getDocs, updateDoc, setDoc, deleteDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../users/User';
import { TBR } from '../models/TBR';
import { deleteUser } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) { }

  getUserProfile(): Observable<{
    user: User | null,
    tbr: TBR[],
  }> {
    return this.authService.currentUser.pipe(
      switchMap(authUser => {
        if (!authUser) {
          return of({
            user: null,
            tbr: []
          });
        }

        return from(this.fetchUserWithTasks(authUser.uid));
      })
    );
  }

  private async fetchUserWithTasks(userId: string): Promise<{
    user: User | null,
    tbr: TBR[]
  }> {
    try {
      const userDocRef = doc(this.firestore, 'Users', userId);
      const userSnapshot = await getDoc(userDocRef);
      
      if (!userSnapshot.exists()) {
        return {
          user: null,
          tbr: []
        };
      }

      const userData = userSnapshot.data() as User;
      const user = { ...userData, id: userId };

      if (!user.tbr || user.tbr.length === 0) {
        return { user, tbr: [] };
      }

      const tasksCollection = collection(this.firestore, 'tbr');
      const q = query(tasksCollection, where('id', 'in', user.tbr));
      const tasksSnapshot = await getDocs(q);
      
      const tbrs: TBR[] = [];
      tasksSnapshot.forEach(doc => {
        tbrs.push({ ...doc.data(), id: doc.id } as unknown as TBR);
      });

      return { user, tbr: tbrs };

    } catch (error) {
      console.error('Hiba a felhasználói adatok betöltése során:', error);
      return {
        user: null,
        tbr: []
      };
    }
  }


  deleteUserProfile(): Promise<void> {
  return this.authService.currentUser.toPromise().then(async authUser => {
    if (!authUser) {
      throw new Error("Nincs bejelentkezett felhasználó.");
    }

    const uid = authUser.uid;
    const userDocRef = doc(this.firestore, 'Users', uid);

    await deleteDoc(userDocRef);

    await deleteUser(authUser);
  });
}
}
