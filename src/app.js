import React from 'react';
import Header from './Header';
import Booker from './Booker';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            // Logo will go here
            // booking component will go here and will handle modal 
            // list of bookings will go here 
            <div style={{ backgroundColor: "rgb(207,207,207)" }} >
                <Header />
                <Booker />
            </div>
        )
    }
}