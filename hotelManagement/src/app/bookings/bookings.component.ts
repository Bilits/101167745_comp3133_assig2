import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent implements OnInit {
  bookings!: any[];
  userId = localStorage.getItem('userId');
  error!: string;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    if (!!this.userId)
      this.apollo
        .query<any>({
          query: gql`
            query($id: ID!) {
              getBooking(user_id: $id) {
                hotel_id
                booking_date
                booking_start
                booking_end
              }
            }
          `,
          variables: {
            id: this.userId,
          },
        })
        .subscribe(({ data }) => {
          if (data.getBooking && data.getBooking.length > 0) {
            this.bookings = data.getBooking;
            this.bookings.forEach((i) => {
              this.apollo
                .query<any>({
                  query: gql`
                    query($id: ID!) {
                      getHotelByHotelID(hotel_id: $id) {
                        hotel_name
                        street
                        city
                        postal_code
                        price
                      }
                    }
                  `,
                  variables: {
                    id: i.hotel_id,
                  },
                })
                .subscribe(({ data }) => {
                  if (data.getHotelByHotelID[0]) {
                    let hotel = data.getHotelByHotelID[0];
                    i.hotel_name = hotel.hotel_name;
                    i.price = hotel.price;
                    i.location = `${hotel.street}, ${hotel.city}   ${hotel.postal_code}`;
                  } else this.error = "error";
                });
            });
          } else this.error = 'No bookings';
        });
  }
}
