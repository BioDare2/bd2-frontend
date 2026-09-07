import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../auth/user.service';
import {FeedbackService} from '../../feedback/feedback.service';

/**
 * Account Activation Component
 *
 * Monitor the success of account activation.
 * If activation is successful, the user is notified and redirected to the login page.
 * If activation fails or the token is missing, an error message is displayed and the user is redirected to the login page.
 */
@Component({
    template: `
    @if (!token) {
      <div class="alert alert-danger danger">Use the activation link that was sent in the email</div>
    }
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AccountActivationComponent implements OnInit {

  token: string;
  activationMsg: string;

  constructor(private route: ActivatedRoute, private router: Router,
              private userService: UserService,
              private feedback: FeedbackService) {
  }

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
