import React, { useState, useEffect } from 'react';
import { Nav, NavItem, WrapItem, Brand, Menu, InnerNav, Icon, SearchIcon, LoginButton, WrapItemLogin } from './styles';
import { HOME_PATH, RANKING_PATH, LOGIN_PATH } from '../constants/Path';
import MyButton from '../components/MyButton';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Drawer from './Drawer';
import AccountMenu from './AccountMenu';
import { getUserProfile, clearProfile } from '../store/Profile/ProfileAction';
import { connect } from 'react-redux';
import { close } from '../store/ChatFrame/ChatFrameAction';

const NavBar = ({getUserProfile, userProfile, clearProfile, closeChatFrame}) => {
    //const size = useWindowSize();
    const [open, setOpen] = useState(false);

    // useEffect(() => {
    //     if (size.width > 768) {
    //         setOpen(false);
    //     }
    // }, [size.width])

    useEffect(() => {
        getUserProfile();
    }, [])

    const signOut = () => {
        clearProfile();
        closeChatFrame();
        localStorage.removeItem('token');
    }

    return (
        <Nav>
            <InnerNav>
                <Brand>
                    <NavItem to={HOME_PATH}>
                        <Icon icon={['fas', 'dumbbell']}></Icon>Review Gym
                    </NavItem>
                </Brand>
                {769 > 768 && <Menu>
                    <WrapItem>
                        <NavItem to={HOME_PATH}>
                            Tất cả
                        </NavItem>
                    </WrapItem>
                    <WrapItem>
                        <NavItem to={RANKING_PATH}>
                            Bảng xếp hạng
                        </NavItem>
                    </WrapItem>
                    <WrapItem>
                        <Input
                            id="standard-adornment-password"
                            type='text'
                            placeholder="Tìm kiếm"
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                >
                                    <SearchIcon icon={['fas', 'search']}></SearchIcon>
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                    </WrapItem>
                    <WrapItemLogin>
                        {!userProfile && <LoginButton to={LOGIN_PATH}>Đăng nhập</LoginButton>}
                        {userProfile && <AccountMenu userProfile={userProfile} signOut={signOut}/>}
                    </WrapItemLogin>
                </Menu>}
                <MyButton onClick={() => setOpen(true)} icon={['fas', 'bars']}/>
                <Drawer userProfile={userProfile} isOpen={open} setIsOpen={setOpen} signOut={signOut}/>
            </InnerNav>
        </Nav>
    );
};

const mapStateToProps = (state) => {
    return {
        userProfile: state.ProfileReducer.userProfile,
        loadingProfile: state.ProfileReducer.loading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserProfile: () => {
            dispatch(getUserProfile());
        },
        clearProfile: () => {
            dispatch(clearProfile());
        },
        closeChatFrame: () => {
            dispatch(close());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);