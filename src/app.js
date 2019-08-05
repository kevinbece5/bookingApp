import React from 'react';
import Header from './Header';
import Booker from './Booker';
import Bookings from './Bookings';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateBookings: false,
            filter: 'all',
        }
    }

    updateBookings = () => this.setState({ updateBookings: !this.state.updateBookings });
    updateFilter = (value) => this.setState({ filter: value });


    render() {
        return (
            // Logo will go here
            // booking component will go here and will handle modal 
            // list of bookings will go here 
            <div >
                <Header />
                <Booker updateFilter={this.updateFilter} updateBookings={this.updateBookings} />
                <Bookings filter={this.state.filter} updateBookings={this.state.updateBookings} bookingsUpdated={this.updateBookings} />
            </div>
        )
    }
}