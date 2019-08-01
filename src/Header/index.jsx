import React from 'react';
import * as Styles from './style';
import Logo from '../assets/logo.jsx'


export const Header = () => (
    <Styles.Container>
        <Styles.Logo>
            <Logo />
        </Styles.Logo>
    </Styles.Container>
)

export default Header