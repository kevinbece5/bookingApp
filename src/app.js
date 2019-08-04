import React from 'react';
import Header from './Header';
import Booker from './Booker';
import Bookings from './Bookings';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateBookings: false,
        }
    }

    updateBookings = () => this.setState({ updateBookings: !this.state.updateBookings });

    render() {
        return (
            // Logo will go here
            // booking component will go here and will handle modal 
            // list of bookings will go here 
            <div >
                <Header />
                <Booker updateBookings={this.updateBookings} />
                <Bookings updateBookings={this.state.updateBookings} bookingsUpdated={this.updateBookings} />
            </div>
        )
    }
}