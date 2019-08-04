import React from 'react';
import * as Styles from './style';
import Modal from './modal';

export default class Booker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleModal: false,
        }
    };

    toggleModal = () => this.setState({ toggleModal: !this.state.toggleModal });

    render() {
        return (
            <Styles.Container>
                <Styles.Header>
                    Bookings
                </Styles.Header>
                <Styles.ButtonContainer>
                    <Styles.BookingsBtn onClick={this.toggleModal}>
                        Create Booking
                </Styles.BookingsBtn>
                </Styles.ButtonContainer>
                {this.state.toggleModal ?
                    <Modal updateBookings={this.props.updateBookings} toggleModal={this.toggleModal} />
                    :
                    null
                }
            </Styles.Container>
        )
    }
}