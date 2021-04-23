import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  isError = false;
  message = '';

  constructor(private router: Router, private apollo: Apollo) {}

  ngOnInit(): void {
    let val = localStorage.getItem('isValidUser');

    if (val != null && val == 'true') {
      this.router.navigate(['/Homepage']);
    }
  }

  onSubmit(loginForm: NgForm): void {
    let userName = loginForm.value.username;
    let password = loginForm.value.password;

    this.message = '';
    this.isError = false;
    this.loading = true;
    this.apollo
      .query<any>({
        query: gql`
          query($username: String!) {
            getUser(username: $username) {
              username
              password
              user_id
            }
          }
        `,
        variables: {
          username: userName,
        },
      })
      .subscribe(
        ({ data, loading }) => {
          console.log(data);
          if (data.getUser[0]) {
            let user = data.getUser[0];
            if (
              !!userName &&
              userName == user.username &&
              password == user.password
            ) {
              localStorage.setItem('isValidUser', 'true');
              localStorage.setItem('userId', user.user_id);
              localStorage.setItem('homeMessage', 'Login Successful!');
              localStorage.setItem('isError', 'false');
              this.router.navigate(['/Homepage']);
              location.reload();
            } else {
              localStorage.setItem('isValidUser', 'false');
              alert(' invalid');
            }
          } else {
            this.message =
              'ERROR';
            this.isError = true;
            setTimeout(() => {
              this.message = '';
            }, 3000);
          }
          this.loading = loading;
        },
        (error) => {
          this.message = `ERROR: ${error.message}`;
          this.isError = true;
          setTimeout(() => {
            this.message = '';
          }, 3000);
        }
      );
  }
}
