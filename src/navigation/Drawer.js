import React from 'react';
import { 
    Wrapper,
    WrapItemDrawer, 
    NavItemDrawer, 
    WrapperMenu, 
    LoginDrawer,
    LeftLogin,
    RightLogin,
    ImgProfile,
    IconBtn,
    SignOutButton
} from './styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { HOME_PATH, LOGIN_PATH, APPROVE_PATH, NEAR_BY_PATH, USERS_PATH } from '../constants/Path';
import Divider from '@material-ui/core/Divider';
import Avatar from '../assets/images/avatar.jpg';

const Drawer = ({isOpen, setIsOpen, signOut, userProfile}) => {
    return (
        <Wrapper>
            <SwipeableDrawer
                anchor="right"
                open={isOpen}
                onClose={() => setIsOpen(false)}
                onOpen={() => setIsOpen(true)}
            >
                <WrapperMenu onClick={() => setIsOpen(false)}> 
                    <LoginDrawer>
                        <LeftLogin>
                            <ImgProfile src={userProfile ? userProfile.profileImg : Avatar}/>
                        </LeftLogin>
                        {!userProfile ? <RightLogin>
                            <NavItemDrawer to={LOGIN_PATH}><IconBtn icon={['fas', 'sign-in-alt']}></IconBtn>Login/Signup</NavItemDrawer>
                            <SignOutButton onClick={() => signOut()}><IconBtn icon={['fas', 'sign-out-alt']}></IconBtn>Đăng xuất</SignOutButton>
                        </RightLogin> : <RightLogin>
                            <NavItemDrawer to={`/profile/${userProfile && userProfile._id}`}>My profile</NavItemDrawer>
                            <SignOutButton onClick={() => signOut()}>Đăng xuất</SignOutButton>
                        </RightLogin>}
                    </LoginDrawer>
                    <Divider />
                    <WrapItemDrawer>
                        <NavItemDrawer to={HOME_PATH}>
                            <IconBtn icon={['fas', 'home']}></IconBtn>Trang chủ
                        </NavItemDrawer>
                    </WrapItemDrawer>
                    <WrapItemDrawer>
                        <NavItemDrawer to={NEAR_BY_PATH}>
                            <IconBtn icon={['fas', 'medal']}></IconBtn>Gần đây
                        </NavItemDrawer>
                    </WrapItemDrawer>
                    <Divider />
                    {userProfile && userProfile.role === 'admin' && <><WrapItemDrawer>
                        <NavItemDrawer to={APPROVE_PATH}>
                            <IconBtn icon={['fas', 'plus-circle']}></IconBtn>Duyệt phòng gym
                        </NavItemDrawer>
                    </WrapItemDrawer>
                    <WrapItemDrawer>
                        <NavItemDrawer to={USERS_PATH}>
                            <IconBtn icon={['fas', 'list-ol']}></IconBtn>Tất cả người dùng
                        </NavItemDrawer>
                    </WrapItemDrawer></>}
                </WrapperMenu>
          </SwipeableDrawer>
        </Wrapper>
    );
};

export default Drawer;