import React, {useState} from 'react';
import { 
    AccountMenuWrapper, 
    ImgProfileNav, 
    SubMenu, 
    SubmenuItemWrapper,
    SubmenuItem,
    SignOutButton
 } from './styles';
import Avatar from '../assets/images/avatar.jpg';
import { ALL_PATH, APPROVE_PATH, USERS_PATH } from '../constants/Path';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const AccountMenu = ({userProfile, signOut}) => {
    const [open, setOpen] = useState(false);

    return (
        <AccountMenuWrapper>
            <ClickAwayListener onClickAway={() => setOpen(false)}>
                <div>   
                    <ImgProfileNav src={userProfile.profileImg || Avatar} onClick={() => setOpen(!open)}></ImgProfileNav>
                    {open && <SubMenu admin={userProfile && userProfile.role === 'admin'}>
                        <SubmenuItemWrapper>
                            <SubmenuItem to={`/profile/${userProfile._id}`}>My profile</SubmenuItem>
                        </SubmenuItemWrapper>
                        {userProfile && userProfile.role === 'admin' && <>
                        <SubmenuItemWrapper>
                            <SubmenuItem to={USERS_PATH}>Tất cả user</SubmenuItem>
                        </SubmenuItemWrapper>
                        <SubmenuItemWrapper>
                            <SubmenuItem to={ALL_PATH}>Tất cả phòng gym</SubmenuItem>
                        </SubmenuItemWrapper>
                        <SubmenuItemWrapper>
                            <SubmenuItem to={APPROVE_PATH}>Duyệt phòng gym</SubmenuItem>
                        </SubmenuItemWrapper></>}
                        <SubmenuItemWrapper>
                            <SignOutButton onClick={() => {
                                signOut();
                            }}>
                                Đăng xuất
                            </SignOutButton>
                        </SubmenuItemWrapper>
                    </SubMenu>}
                </div>
            </ClickAwayListener>
        </AccountMenuWrapper>
    );
};

export default React.memo(AccountMenu);