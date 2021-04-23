import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  message = '';
  isError = false;

  constructor(private apollo: Apollo, private router: Router) {}

  ngOnInit(): void {
    let val = localStorage.getItem('isValidUser');

    if (val != null && val == 'true') {
      this.router.navigate(['/Homepage']);
    }
  }

  onSubmit(signUpForm: NgForm): void {
    let username = signUpForm.value.username;
    let password = signUpForm.value.password;
    let email = signUpForm.value.email;
    let user_id = Math.round(Math.random() * 1000000000);

    this.isError = false;
    this.apollo
      .mutate({
        mutation: gql`
        mutation{
          addUser(user_id: $user_id, username: $username, email: $email, password: $password){
           user_id
           username
           email
           password
         }
         }
        `,
        variables: {
          id: user_id,
          username: username,
          password: password,
          email: email,
        },
      })
      .subscribe(
        ({ data }) => {
          if (!!data) {
            this.message = `Account Created.`;
          } else {
            this.message = 'ERROR';
            this.isError = true;
            setTimeout(() => {
              this.message = '';
            }, 3000);
          }
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
