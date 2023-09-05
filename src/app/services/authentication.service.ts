import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { LocalStorageProvider } from '../providers/local-storage.provider';
@Injectable({
  providedIn: 'root',
})
export class AuthenticatoinService {
  constructor(
    private readonly firestore: Firestore,
    private readonly localStorage: LocalStorageProvider
  ) {}

  public async singInWithEmailAndPassword(email: string, password: string) {
    const colRef = collection(this.firestore, 'users');
    const usersCollection = collectionData(colRef);
    const users = await firstValueFrom(usersCollection);

    const userFind = users.find(
      (user) => user['email'] === email && user['password'] == password
    );

    if (userFind) {
      this.localStorage.saveInLocalStorage('login', {
        ...userFind,
        password: '*****',
      });
      return true;
    }
    return false;
  }
}
