import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    font-family: sans-serif;
`;


export const Header = styled.div`
    display: flex;
    flex-direction: row;
    padding-left: 21px;
    padding-bottom: 10px;
    width: 98%;
`;


export const HeaderItem = styled.span`
    font-size: 14px;
    color: #404040;
    display: flex;
    width: 20%;
`;

export const Table = styled.div`
    background-color: #F5F5F5;
    display: flex;
    flex-direction: column;
    align-self: center;
    width: 98%;
    margin-bottom: 100px;
`;

export const Row = styled.div`
    border-bottom: 1px solid rgb(207, 207, 207);
    padding-bottom: 15px;
    display: flex;
    flex-direction: row;
    padding: 7px 10px 15px;
`;

export const Item = styled.span`
    color: #404040;
    font-size: 12px;
    display: flex;
    width: 20%;
`;

export const Address = styled.div`
    display: flex;
    flex-direction: column;
    width: 20%;
`;

export const BookingsBtn = styled.button`
    font-size: 14px;
    color: #333333;
    width: 128px;
    height: 29px;
    background-color: ${({ disable }) => disable ? "#F29648" : "grey"};
    border-radius: 5px;
`;