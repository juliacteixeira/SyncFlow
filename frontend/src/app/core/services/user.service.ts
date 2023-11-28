import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'http://localhost:3001'

  constructor() { }

  getUser() {
    const url = `${this.apiUrl}/user`
    console.log(url);

  }

}
