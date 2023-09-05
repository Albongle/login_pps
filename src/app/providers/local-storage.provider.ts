import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageProvider {
  public saveInLocalStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public getFromLocalStorage(key: string) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : undefined;
  }
}
