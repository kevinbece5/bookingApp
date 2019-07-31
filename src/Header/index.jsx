import React from 'react';
import * as Styles from './style';
import Logo from '../assets/logo.jsx'




export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            //Conatiner
            //IMG tag for logo
            <Styles.Container>
                <Styles.Logo>
                    <Logo />
                </Styles.Logo>
            </Styles.Container>
        )
    }
}