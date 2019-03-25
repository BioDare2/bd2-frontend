import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../auth/user.service';
import {FeedbackService} from '../../feedback/feedback.service';

@Component({
  template: `
    <div *ngIf="!token" class="alert alert-danger danger">Use the activation link that was sent in the email</div>
  `,
  styles: []
})
export class AccountActivationComponent implements OnInit {

  token: string;
  activationMsg: string;
  constructor(private route: ActivatedRoute, private router: Router,
              private userService: UserService,
              private feedback: FeedbackService) { }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');

    if (this.token) {

      this.userService.activate(this.token)
        .then(user => {
          this.feedback.success('Your account has been activated, use: ' + user.login + ' to sign in');
          this.router.navigate(['/login']);
        })
        .catch(reason => {
          this.feedback.error(reason);
          this.router.navigate(['/login']);
        });
    }
  }

}
