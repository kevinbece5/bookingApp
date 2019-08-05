import React from 'react';
import * as Styles from './style';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

export default class Bookings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [],
            displayedBookings: [],
            current: [],
            page: 20
        }
        this.type = {
            dogWalking: "Dog Walking",
            houseKeeping: "Housekeeping"
        }
    }

    componentDidMount() {
        this.updateList();
    }


    componentDidUpdate(prevProps, prevState) {
        if (!_.isEqual(prevProps.updateBookings, this.props.updateBookings)) {
            if (this.props.updateBookings) {
                this.updateList()
                    .then(() => this.props.bookingsUpdated());
            }
        }

        if (!_.isEqual(prevProps.filter, this.props.filter)) {
            this.setState({ page: 20 }, this.updateDisplayedList)

        }

    }

    updateList = () => {
        return axios.get('/getBookings')
            .then(({ data }) => {
                let sorted = data.sort((a, b) => {
                    return moment(a.date).format('YYYYMMDDHHmm') - moment(b.date).format('YYYYMMDDHHmm')
                });
                this.setState({ bookings: sorted }, this.updateDisplayedList)
            })
    }

    updateDisplayedList = () => {
        let newDisplay = [];
        let filteredArr = [];
        this.state.bookings.map((i) => {
            if (this.props.filter === 'all') {
                filteredArr.push(i);
            } else if (i.type === this.props.filter) {
                filteredArr.push(i);
            }
        });
        let loopLength = Math.min(this.state.page, filteredArr.length);
        for (let i = this.state.page - 20; i < loopLength; i++) {
            newDisplay.push(filteredArr[i]);
        }
        this.setState({ current: newDisplay, displayedBookings: filteredArr });
    }

    navigatePages = (direction) => {
        if (direction === 'prev' && this.state.page - 20 > 0) {
            this.setState((state) => state.page -= 20, () => this.updateDisplayedList());
        }
        if (direction === 'next' && this.state.page < this.state.displayedBookings.length) {
            this.setState((state) => state.page += 20, () => this.updateDisplayedList());
        }
    }

    render() {
        return (
            <Styles.Container>
                <Styles.Header>
                    <Styles.HeaderItem>Page {this.state.page / 20}</Styles.HeaderItem>
                    <Styles.BookingsBtn onClick={() => this.navigatePages('prev')}>
                        Previous Page
                    </Styles.BookingsBtn>
                    <Styles.BookingsBtn onClick={() => this.navigatePages('next')}>
                        Next Page
                    </Styles.BookingsBtn>
                </Styles.Header>
                <Styles.Header>
                    <Styles.HeaderItem>Customer</Styles.HeaderItem>
                    <Styles.HeaderItem>Email</Styles.HeaderItem>
                    <Styles.HeaderItem>Address</Styles.HeaderItem>
                    <Styles.HeaderItem>Booking Type</Styles.HeaderItem>
                    <Styles.HeaderItem>Booking Date/Time</Styles.HeaderItem>
                </Styles.Header>
                <Styles.Table>
                    {
                        this.state.current.length ?
                            this.state.current.map((i) => {
                                return (
                                    <Styles.Row>
                                        <Styles.Item>{i.name}</Styles.Item>
                                        <Styles.Item>{i.email}</Styles.Item>
                                        <Styles.Address>
                                            <Styles.Item style={{ width: "100%" }}>{i.address}</Styles.Item>
                                            <Styles.Item style={{ width: "100%" }}>{i.city}, {i.state}, {i.zipcode}</Styles.Item>
                                        </Styles.Address>
                                        <Styles.Item>{this.type[i.type]}</Styles.Item>
                                        <Styles.Item>{moment(i.date).format('MMMM Do YYYY, [at] h:mm a')}</Styles.Item>
                                    </Styles.Row>
                                )
                            })
                            :
                            null
                    }
                </Styles.Table>
            </Styles.Container>
        )
    }
}