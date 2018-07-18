import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService implements OnInit {

 private _users: BehaviorSubject<User[]>; 
  
  private dataStore: {
    users: User[]
  }
  
  constructor(private http: HttpClient) { 
    this.dataStore = { users: [] };
    this._users = new BehaviorSubject<User[]>([])
  }

  get users(): Observable<User[]> {
    return this._users.asObservable();
  }

  loadAll() {
    const usersUrl = 'https://angular-material-api.azurewebsites.net/users'
    this.http.get<User[]>(usersUrl)
      .subscribe((data) => {
        this.dataStore.users = data;
        this._users.next(Object.assign({}, this.dataStore).users)
      }, (error) => {
        console.log("failed to fetch users")
     });
  }

  ngOnInit() {
  }

}

// Behaviorsubject explanation

// There are a few different types of subjects in RxJS, but the most common one that pops up when building real world applications is the BehaviorSubject.

// Lets say we want to store what a user's name is, but we also want them to be able to change it. We'd want to store an initial name, have the ability to update it, and also be able to access whatever the current name is set to at any given time.

// This is precisely what BehaviorSubject allows you to do. Lets see how this example use case would actually work:

// Instantiate a new BehaviorSubject with an initial value
// In this example, the initial value will be a string (Eric)

// let currentNameSubject = new BehaviorSubject('Eric');
// To get the current value, invoke the getValue method:
// currentNameSubject.getValue();
// // => 'Eric'
// To change the value of an existing BehaviorSubject, call the next method with a new value:
// currentNameSubject.next('Obama');
// And if we were to call getValue again:
// currentNameSubject.getValue();
// // => 'Obama'
// Subscribing to value changes
// The whole point of using RxJS is to asynchronously update & share data across your application. This is done by subscribing to the Observable instead of calling getValue synchronously:

// let currentNameSubject = new BehaviorSubject('Eric');

// currentNameSubject.subscribe((val) => {
//     console.log(val);
// })
// // => 'Eric'

// currentNameSubject.next('Obama');
// // => 'Obama'

// currentNameSubject.next('Jacob');
// // => 'Jacob'