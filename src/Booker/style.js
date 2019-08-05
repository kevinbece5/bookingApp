import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    padding: 10px 10px 10px 0;
    font-family: sans-serif;
`;

export const Header = styled.span`
    font-size: 24px;
    color: #404040;
    width: 90%;
    padding-left: 10px;

`;

export const BookingsBtn = styled.button`
    font-size: 14px;
    color: #333333;
    width: 128px;
    height: 29px;
    background-color: #F29648;
    border-radius: 5px;
`;

export const ButtonContainer = styled.div`
    min-width: 10%;
`;

export const ModalContainer = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.42);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Modal = styled.div`
    width: 622px;
    background-color: #FFF;
    border-radius: 5px;
    padding: 18px;

`;

export const Form = styled.div`
    display: flex;
    padding-top: 10px;
    flex-direction: row;
`;

export const FormHalf = styled.div`
    display: flex;
    flex-direction: column
    width: 50%;
`;

export const ItemHeader = styled.span`
    font-size: 12px;
    color: ${({ error }) => error ? "red" : '#404040'};
    padding: 15px 0 5px 0;
`;

export const Input = styled.input`
    height: 33px;
    border: 1px solid #979797;
    border-radius: 5px;
    padding-left: 5px;
`;

export const FormItem = styled(FormHalf)`
    width: 100%;
`;

export const Select = styled.select`
    height: 33px;
    border: 1px solid #979797;
    border-radius: 5px;
    padding-left: 5px;
`;

export const Option = styled.option`
    padding-left: 5px;
    height: 33px;
    font-size: 12px;
`;

export const Ul = styled.ul`
    display: flex;
    padding: 0;
    flex-direction: row;
`;

export const Li = styled.li`
    width: 20%
    font-size: 12px;
    color: red;
    flex-basis: auto;
    list-style: none;
`;

export const HeaderButton = styled.div`
    padding-right: 10px;
`;