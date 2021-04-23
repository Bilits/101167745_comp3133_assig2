const Booking = require('./models/booking');
const User = require('./models/user');
const Hotel = require('./models/hotel');

exports.resolvers = {
    Query: {
        getHotel: async (parent, args) => {
            return await Hotel.find({});
        },
        getHotelByCity: async (parent, args) => {
            return await Hotel.find({"city" : args.city});
        },
        getHotelByName: async (parent, args) => {
            return await Hotel.find({"hotel_name" : args.name});
        },
        getUser: async (parent, args) => {
            return await User.find({});
        },  
        getBooking: async (parent, args) => {
            return await Booking.find({});
        },
    },
    Mutation: {
        addHotel: async (parent, args) => {
            console.log(args)
            const emailExpression = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            const isValidEmail =  emailExpression.test(String(args.email).toLowerCase())
            
            if(!isValidEmail){
                throw new Error("email not in proper format")
            }

            let newHotel = new Hotel({
                hotel_id: args.hotel_id,
                hotel_name: args.hotel_name,
                street: args.street,
                city: args.city,
                postal_code: args.postal_code,
                price: args.price,
                email: args.email,
            });
            return await newHotel.save();
        },

        addUser: async (parent, args) => {
            console.log(args)
            const emailExpression = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            const isValidEmail =  emailExpression.test(String(args.email).toLowerCase())
            
            if(!isValidEmail){
                throw new Error("email not in proper format")
            }

            let newUser = new User({
                user_id: args.user_id,
                email: args.email,
                username: args.username,
                password: args.password,
            });
            return await newUser.save();
        },

        addBooking: async (parent, args) => {
            console.log(args)

            let newBooking = new Booking({
                hotel_id: args.hotel_id,
                user_id: args.user_id,
                booking_date: args.booking_date,
                booking_start: args.booking_start,
                booking_end: args.booking_end
            });
            return await newBooking.save();
        },
    }
}