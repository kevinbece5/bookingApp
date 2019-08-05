import React from 'react';
import * as Styles from './style';
import axios from 'axios';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import _ from 'lodash';


export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            error: false,
            errors: [],
            date: null,
            name: '',
            email: '',
            address: '',
            city: '',
            state: '',
            zipcode: '',
            type: '',
            time: '',
        }

        this.lettersValidator = /^[a-zA-Z]+$/;
        this.numbersValidator = /^[0-9]+$/;
    }


    updateItem = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        switch (name) {
            case "state":
                if ((this.lettersValidator.test(value) && !(value.length > 2)) || value.length === 0) {
                    this.setState({ [name]: value.toUpperCase() })
                }
                break;
            case 'zipcode':
                if (this.numbersValidator.test(value) && !(value.length > 5) || value.length === 0) {
                    this.setState({ [name]: value })
                }
                break;
            default:
                this.setState({ [name]: value })
                break;

        }87
    };

    checkErrors = () => {
        let formItems = _.omit(this.state, ['showModal', 'focused', 'error', 'errors']);
        let errorsArr = [];
        for (const key in formItems) {
            if (key === 'zipcode') {
                if (formItems[key].length !== 5) {
                    errorsArr.push(key);
                }
            } else if (key === 'state') {
                if (formItems[key].length !== 2) {
                    errorsArr.push(key);
                }
            } else {
                if (!formItems[key]) {
                    errorsArr.push(key);
                }
            }
        }
        if (errorsArr.length) {
            this.setState({ error: true, errors: errorsArr })
            return true;
        }
        return false;
    }



    createBooking = () => {
        let formItems = _.omit(this.state, ['showModal', 'focused', 'error', 'errors']);
        if (!this.checkErrors()) {
            axios.post('/createBooking', formItems)
                .then(() => this.props.updateBookings())
                .then(() => this.props.toggleModal())
        }
    }

    render() {
        return (
            <Styles.ModalContainer>
                <Styles.Modal>
                    <Styles.Header>
                        Create Booking
                    </Styles.Header>

                    {/* {
                        this.state.error &&
                        <Styles.FormItem>
                            <Styles.ItemHeader style={{ fontWeight: 'bold', color: 'red' }}>Items in red have errors</Styles.ItemHeader>
                        </Styles.FormItem>
                    } */}
                    <Styles.Form>
                        <Styles.FormHalf style={{ paddingRight: "20px" }}>
                            <Styles.FormItem>
                                <Styles.ItemHeader error={Boolean(this.state.errors.includes('name'))} >Name</Styles.ItemHeader>
                                <Styles.Input name='name' onChange={this.updateItem} value={this.state.name} />
                            </Styles.FormItem>
                            <Styles.FormItem>
                                <Styles.ItemHeader error={this.state.errors.includes('email')} >Email</Styles.ItemHeader>
                                <Styles.Input name='email' onChange={this.updateItem} value={this.state.email} />
                            </Styles.FormItem>
                            <Styles.FormItem>
                                <Styles.ItemHeader error={this.state.errors.includes('address')} >Street Address</Styles.ItemHeader>
                                <Styles.Input name='address' onChange={this.updateItem} value={this.state.address} />
                            </Styles.FormItem>
                            <Styles.FormItem>
                                <Styles.ItemHeader error={this.state.errors.includes('city')} >City</Styles.ItemHeader>
                                <Styles.Input name='city' onChange={this.updateItem} value={this.state.city} />
                            </Styles.FormItem>
                            <Styles.FormItem style={{ flexDirection: 'row' }}>
                                <Styles.FormItem style={{ flex: 1, paddingRight: "14px" }}>
                                    <Styles.ItemHeader error={this.state.errors.includes('state')} >State</Styles.ItemHeader>
                                    <Styles.Input name='state' onChange={this.updateItem} value={this.state.state} />
                                </Styles.FormItem>
                                <Styles.FormItem>
                                    <Styles.ItemHeader error={this.state.errors.includes('zipcode')} >Zip code</Styles.ItemHeader>
                                    <Styles.Input name='zipcode' onChange={this.updateItem} value={this.state.zipcode} />
                                </Styles.FormItem>
                            </Styles.FormItem>
                        </Styles.FormHalf>
                        <Styles.FormHalf>
                            <Styles.FormItem>
                                <Styles.ItemHeader error={this.state.errors.includes('type')} >Booking Type</Styles.ItemHeader>
                                <Styles.Select name='type' value={this.state.type} id="type-select" onChange={this.updateItem}>
                                    <Styles.Option name='type' value=""></Styles.Option>
                                    <Styles.Option name='type' value="houseKeeping">Housekeeping</Styles.Option>
                                    <Styles.Option name='type' value="dogWalking">Dog Walking</Styles.Option>
                                </Styles.Select>
                            </Styles.FormItem>
                            <Styles.FormItem>
                                <Styles.ItemHeader error={this.state.errors.includes('date')} >Booking Date</Styles.ItemHeader>
                                <SingleDatePicker
                                    numberOfMonths={1}
                                    hideKeyboardShortcutsPanel={true}
                                    id='dateBooker'
                                    date={this.state.date}
                                    onDateChange={date => this.setState({ date })}
                                    focused={this.state.focused}
                                    onFocusChange={({ focused }) => this.setState({ focused })}
                                />
                            </Styles.FormItem>
                            <Styles.FormItem>
                                <Styles.ItemHeader error={this.state.errors.includes('time')} >Booking Time</Styles.ItemHeader>
                                <Styles.Input name='time' onChange={this.updateItem} value={this.state.time} type="time" id="appt" min="9:00" max="18:00" />
                            </Styles.FormItem>
                        </Styles.FormHalf>
                    </Styles.Form>
                    <Styles.BookingsBtn style={{ float: "right" }} onClick={this.createBooking}>
                        Create Booking
                    </Styles.BookingsBtn>
                    <Styles.BookingsBtn style={{ float: "right" }} onClick={this.props.toggleModal}>
                        Close
                    </Styles.BookingsBtn>
                </Styles.Modal>
            </Styles.ModalContainer>
        )
    }
}