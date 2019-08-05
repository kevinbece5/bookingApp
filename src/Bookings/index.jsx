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
    }

    updateList = () => {
        return axios.get('/getBookings')
            .then(({ data }) => {
                let sorted = data.sort((a, b) => {
                    return moment(a.date).format('YYYYMMDDHHmm') - moment(b.date).format('YYYYMMDDHHmm')
                });
                this.setState({ bookings: sorted })
            })
    }

    render() {
        return (
            <Styles.Container>
                <Styles.Header>
                    <Styles.HeaderItem>Customer</Styles.HeaderItem>
                    <Styles.HeaderItem>Email</Styles.HeaderItem>
                    <Styles.HeaderItem>Address</Styles.HeaderItem>
                    <Styles.HeaderItem>Booking Type</Styles.HeaderItem>
                    <Styles.HeaderItem>Booking Date/Time</Styles.HeaderItem>
                </Styles.Header>
                <Styles.Table>
                    {
                        this.state.bookings.length ?
                            this.state.bookings.map((i) => {
                                if (i.type === this.props.filter || this.props.filter === 'all') {
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
                                }
                            })
                            :
                            null
                    }
                </Styles.Table>
            </Styles.Container>
        )
    }
}