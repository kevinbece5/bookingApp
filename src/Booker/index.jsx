import React from 'react';
import * as Styles from './style';
import Modal from './modal';

export default class Booker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleModal: false,
            filter: 'all'
        }
    };

    toggleModal = () => this.setState({ toggleModal: !this.state.toggleModal });

    updateItem = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        this.setState({ [name]: value }, () => {
            this.props.updateFilter(this.state.filter);
        });
    }

    render() {
        return (
            <Styles.Container>
                <Styles.Header>
                    Bookings
                </Styles.Header>
                <Styles.HeaderButton>
                    <Styles.ItemHeader>Filter by Booking Type</Styles.ItemHeader>
                    <Styles.Select name='filter' value={this.state.filter} id="type-select" onChange={this.updateItem}>
                        <Styles.Option name='filter' value="all">All</Styles.Option>
                        <Styles.Option name='filter' value="houseKeeping">Housekeeping</Styles.Option>
                        <Styles.Option name='filter' value="dogWalking">Dog Walking</Styles.Option>
                    </Styles.Select>
                </Styles.HeaderButton>
                <Styles.HeaderButton >
                    <Styles.BookingsBtn onClick={this.toggleModal}>
                        Create Booking
                </Styles.BookingsBtn>
                </Styles.HeaderButton>
                {this.state.toggleModal ?
                    <Modal updateBookings={this.props.updateBookings} toggleModal={this.toggleModal} />
                    :
                    null
                }
            </Styles.Container>
        )
    }
}