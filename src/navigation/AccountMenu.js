import React from 'react';

import { 
    AccountMenuWrapper, 
    ImgProfileNav, 
    SubMenu, 
    SubmenuItemWrapper,
    SubmenuItem,
    SignOutButton
 } from './styles';
import Avatar from '../assets/images/avatar.jpg';

const AccountMenu = ({userProfile, signOut}) => {
    return (
        <AccountMenuWrapper>
            <ImgProfileNav src={userProfile.profileImg || Avatar}></ImgProfileNav>
            <SubMenu>
                <SubmenuItemWrapper>
                    <SubmenuItem to={`/profile/${userProfile._id}`}>My profile</SubmenuItem>
                </SubmenuItemWrapper>
                <SubmenuItemWrapper>
                    <SignOutButton onClick={() => {
                        signOut();
                    }}>
                        Đăng xuất
                    </SignOutButton>
                </SubmenuItemWrapper>
            </SubMenu>
        </AccountMenuWrapper>
    );
};

export default React.memo(AccountMenu);