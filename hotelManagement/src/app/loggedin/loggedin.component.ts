import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent implements OnInit {

  hotels!: any[];
  loading = true;
  message = localStorage.getItem('homeMessage');
  isError = localStorage.getItem('isError') === 'true';
  isValidUser = localStorage.getItem('isValidUser') === 'true';
  userId = localStorage.getItem('userId');


  constructor(private apollo: Apollo, private apollo2: Apollo) {}

  ngOnInit() {
    this.apollo
      .query<any>({
        query: gql`
          query {
            getHotel {
              hotel_name
              price
              city
              hotel_id
            }
          }
        `,
      })
      .subscribe(({ data, loading }) => {
        this.hotels = data && data.getHotel;
        this.loading = loading;
      });
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  bookPlace(bookingForm: NgForm, id: string, name: string) {
    let booking_id = Math.round(Math.random() * 1000000000),
      hotel_id = id,
      booking_date = new Date().toISOString(),
      booking_start = bookingForm.value.start,
      booking_end = bookingForm.value.end,
      user_id = this.userId;

    if (!!booking_start && !!booking_end) {
      this.apollo2
        .mutate({
          mutation: gql`
            mutation(
              $hotel_id: ID!
              $user_id: ID!
              $booking_date: String!
              $booking_start: String!
              $booking_end: String!
            ) {
              addBooking(
                hotel_id: $hotel_id
                user_id: $user_id
                booking_date: $booking_date
                booking_start: $booking_start
                booking_end: $booking_end
              ) {
                hotel_id
                user_id
              }
            }
          `,
          variables: {
            booking_id: booking_id,
            hotel_id: hotel_id,
            booking_date: booking_date,
            booking_start: booking_start,
            booking_end: booking_end,
            user_id: user_id,
          },
        })
        .subscribe(
          ({ data }) => {
            if (!!data) {
              this.isError = false;
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
    } else {
      this.message = 'ERROr';
      this.isError = true;
      setTimeout(() => {
        this.message = '';
      }, 3000);
    }
  }

}
