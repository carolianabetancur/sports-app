import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Home } from '@styled-icons/remix-fill/Home';
import { Timer2 } from '@styled-icons/remix-fill/Timer2';
import { ExitToApp } from '@styled-icons/material-rounded/ExitToApp';

const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const Root = styled.div`
    position:sticky;
    bottom: 12%;    
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    `;

    const Footer = styled.footer`
    display:flex;
    justify-content:space-between;
    align-items: center;
    align-content:center;
    width:90%;
    margin: auto;
    height: 85px;
    padding: 12px;
    border-radius: 24px;
    `;

    const Button = styled.button.attrs(props=>({
        background: props.background
    }))`
    height: 59px;
    width: 59px;
    border: none;
    cursor: pointer;
    padding: 10px;
    border-radius: 16px;
    background-color: ${props=>props.background?"#1F1F31":"transparent"};
    &:hover {
        background: #1F1F31; 
    }
`;

    const HomeIcon = styled(Home)`
    width: 18.75px;
    height: 19.26px;
    color: #777777;
    background-color: transparent;
    &:hover {
        color: #FFFFFF; 
    }
`;

    const TimerIcon = styled(Timer2)`
    width: 18.75px;
    height: 18.75x;
    color: #777777;
    background-color: transparent;
    &:hover {
        color: #FFFFFF; 
    }
`;

    const ExitIcon = styled(ExitToApp)`
    width: 20.83px;
    height: 18.75x;
    color: #777777;
    background-color: transparent;
    &:hover {
        color: #FFFFFF; 
    }
`;
useEffect(()=>{
    console.log()
},[])

    return (
        <Root>
            <Footer>
                <Button background={location.pathname.includes("details")}>
                    <HomeIcon onClick={() => navigate(`/details/${1}`)} />
                </Button>
                <Button background={location.pathname.includes("history")}>
                    <TimerIcon onClick={() => navigate(`/history`)} />
                </Button>
                <Button background={location.pathname.includes("login")}>
                    <ExitIcon onClick={() => navigate(`/login`)} />
                </Button>
            </Footer>
        </Root >
    )
}

export default Footer;