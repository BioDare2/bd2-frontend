import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {BD2User} from '../user.dom';

@Component({
  selector: 'bd2-login-form',
  templateUrl: './login-form.component.html',
  styles: []
})
export class LoginFormComponent implements OnInit {

  username: string;
  password: string;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
  }

  get currentUser(): BD2User {
    return this.userService.currentUser;
  }

  login() {
    if (this.username && this.username.trim()) {
      this.userService.login(this.username, this.password)
        .then( u => this.clearForm())
        .catch( reason => console.error(reason));
    }
  }

  logout() {
    this.userService.logout()
      .then( u => this.clearForm())
      .catch( reason => console.error(reason));

    /*
      .then( state => {
        if (state) this.feedback.success("You are logged out");
        this.clearForm();
      })
      .then(() => this.router.navigate(['/']))
      .catch( reason => this.feedback.error(reason));
    */
  }

  clearForm() {
    this.username = undefined;
    this.password = undefined;
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  goBack() {
    window.history.back();
  }

    /*
  refreshView() {
    let path = window.location.pathname;
    this.router.navigate(['/refresh',{path:path}]);
  }*/


}
