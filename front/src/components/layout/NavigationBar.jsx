import React from "react";
import styled from "styled-components";
import {COLORS} from "../../constants/colors";
import {useNavigate, useLocation} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const Container = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
`;

const ContainerElements = styled.div`
width: 100%;
max-width: 1200px;
display: flex;
align-items: center;
justify-content: space-between;
margin: 0 auto;
`;
const Logo = styled.div`
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    color: ${COLORS.sig};
`;

const MenuContainer = styled.div`
    display: flex;

`;

const MenuButton = styled.div`
    padding: 8px 16px;
    cursor: pointer;
    color: ${props => props.isActive ? COLORS.sig : 'gray'};
    position: relative;
    
    div {
        display: inline-block;
        transform: ${props => props.isActive ? 'scale(1.1)' : 'scale(1)'};
        transition: 0.3s;
        &:hover {
            transform: scale(1.1);
            color: ${COLORS.sig};
        }
    }

    &:not(:last-child)::after {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        height: 15px;
        width: 1px;
        background-color: #e0e0e0;
    }
`;

const LoginButton = styled.div`
    padding: 8px 20px;
    border: 2px solid ${COLORS.sig};
    border-radius: 20px;
    color: white;
    background-color: ${COLORS.sig};
    cursor: pointer;
    margin-right: 40px;
    &:hover {
        transform: scale(1.05);
        transition: 0.3s;
        background-color: white;
        color: ${COLORS.sig};
    }
`;

const LogoutButton = styled(LoginButton)`
    background-color: white;
    color: ${COLORS.sig};
    
    &:hover {
        background-color: ${COLORS.sig};
        color: white;
    }
`;

export default function NavigationBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const user = useSelector(state => state.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <Container>
            <ContainerElements>
            <Logo onClick={() => navigate("/")}>DevConf</Logo>
            <MenuContainer>
                <MenuButton isActive={location.pathname === "/"} onClick={() => navigate("/")}>
                    <div>메인 화면</div>
                </MenuButton>
                <MenuButton isActive={location.pathname === "/dev-conf"} onClick={() => navigate("/dev-conf")}>
                    <div>컨퍼런스 일정</div>
                </MenuButton> 
                <MenuButton isActive={location.pathname === "/dev-board"} onClick={() => navigate("/dev-board")}>
                    <div>게시판</div>
                </MenuButton>
                <MenuButton isActive={location.pathname === "/mypage"} onClick={() => navigate("/mypage")}>
                    <div>마이 페이지</div>
                </MenuButton>
            </MenuContainer>
            {user.id ? (
                <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            ) : (
                <LoginButton onClick={() => navigate("/signin")}>로그인</LoginButton>
            )}
            </ContainerElements>
        </Container>
    )
}
