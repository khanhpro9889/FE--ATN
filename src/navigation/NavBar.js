import React, { useState, useEffect } from 'react';
import { 
    Nav, 
    NavItem, 
    WrapItem, 
    Brand, 
    Menu, 
    InnerNav, 
    Icon, 
    LoginButton, 
    WrapItemLogin, 
    IconNoti, 
    Noti, 
    ItemNoti, 
    WrapperLoading,
    Time,
    NoNoti,
    NotiMobile
} from './styles';
import { HOME_PATH, NEAR_BY_PATH, LOGIN_PATH } from '../constants/Path';
import MyButton from '../components/MyButton';
import Drawer from './Drawer';
import AccountMenu from './AccountMenu';
import { getUserProfile, clearProfile } from '../store/Profile/ProfileAction';
import { connect } from 'react-redux';
import { close } from '../store/ChatFrame/ChatFrameAction';
import { useHistory, useLocation } from 'react-router-dom';
import MiniLoadingSpinner from '../components/MiniLoadingSpinner';
import Badge from '@material-ui/core/Badge';
import { getQuantityNotiByUser, getNotiByUser } from '../api/notiApi';
import socketIOClient from 'socket.io-client';
import { parseDate } from '../utils/date';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const NavBar = ({getUserProfile, userProfile, clearProfile, closeChatFrame, loadingProfile}) => {
    //const size = useWindowSize();
    const [open, setOpen] = useState(false);
    const [openNoti, setOpenNoti] = useState(false);
    const history = useHistory();
    const [quantityNoti, setQuantityNoti] = useState(0);
    const [loading, setLoading] = useState(false);
    const [noti, setNoti] = useState(false);
    const location = useLocation();
    const [openNoti1, setOpenNoti1] = useState(false);

    useEffect(() => {
        getUserProfile();
    }, [getUserProfile])

    useEffect(() => {
        if (openNoti) {
            getAllNotiApi();
        }
         // eslint-disable-next-line
    }, [openNoti])

    useEffect(() => {
        setOpenNoti(false);
    }, [location.pathname])

    useEffect(() => {
        const getQuantityNoti = async (id) => {
            try {
                const res = await getQuantityNotiByUser(id);
                setQuantityNoti(res.quantity);
            } catch (error) {
                console.log(error)
            }
        }
        let socket;
        if (userProfile) {
            socket = socketIOClient('http://localhost:3001');
            socket.on(`notification ${userProfile._id}`, data => {
                getQuantityNoti(userProfile._id);
            });
            getQuantityNoti(userProfile._id);
        }
        return () => {
            if(socket)
                socket.close();
        }
    }, [userProfile])

    const getAllNotiApi = async () => {
        try {
            setLoading(true);
            const res = await getNotiByUser(userProfile._id);
            setLoading(false);
            setNoti(res.notifications.reverse());
        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    }

    const signOut = () => {
        clearProfile();
        closeChatFrame();
        history.push(LOGIN_PATH);
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
                <Menu>
                    <WrapItem>
                        <NavItem to={NEAR_BY_PATH}>
                            Gần đây
                        </NavItem>
                    </WrapItem>
                    {!loadingProfile ? <MiniLoadingSpinner /> : userProfile 
                        && 
                        <ClickAwayListener onClickAway={() => setOpenNoti(false)}>
                            <WrapItem>
                                <Badge 
                                    badgeContent={quantityNoti} 
                                    color="primary"
                                    onClick={() =>{
                                        setOpenNoti(!openNoti);
                                    }}
                                >
                                    <IconNoti icon={['fas', 'bell']} />
                                </Badge>
                                {openNoti && <Noti>
                                    {loading ? <WrapperLoading>
                                            <MiniLoadingSpinner />
                                        </WrapperLoading> : 
                                    noti.length > 0 ? noti.map(item => {
                                        return (
                                            <ItemNoti 
                                                key={item._id} 
                                                className={item.unread ? 'unread' : ''}
                                                to={item.type === 4 ? `/admin/approve` : `/detail/${item.gym}`}
                                            >
                                                <span>{item.type === 1 
                                                    ? `Phòng gym của bạn có ${item.quantity} đánh giá mới` 
                                                        : item.type === 2 ? `Đánh giá của bạn có ${item.quantity} trả lời mới` 
                                                            : item.type === 3 ? `Phòng gym của bạn đã được duyệt`
                                                                : item.type === 4 && `Bạn có phòng gym mới cần duyệt`
                                                    }</span>
                                                <Time>{parseDate(item.createAt)}</Time>
                                            </ItemNoti>
                                        )
                                    }) : <NoNoti>Bạn không có thông báo</NoNoti>}
                                </Noti>}
                            </WrapItem>
                        </ClickAwayListener>}
                    <WrapItemLogin>
                        {!loadingProfile ? <MiniLoadingSpinner /> : 
                        (!userProfile ? <LoginButton to={LOGIN_PATH}>Đăng nhập</LoginButton> :
                        <AccountMenu userProfile={userProfile} signOut={signOut}/>)}
                    </WrapItemLogin>
                </Menu>
                <NotiMobile>
                    {!loadingProfile ? <MiniLoadingSpinner /> : userProfile 
                        && 
                        <ClickAwayListener onClickAway={() => setOpenNoti1(false)}>
                            <WrapItem>
                                <Badge 
                                    badgeContent={quantityNoti} 
                                    color="primary"
                                    onClick={() =>{
                                        setOpenNoti1(!openNoti1);
                                    }}
                                >
                                    <IconNoti icon={['fas', 'bell']} />
                                </Badge>
                                {openNoti1 && <Noti>
                                    {loading ? <WrapperLoading>
                                            <MiniLoadingSpinner />
                                        </WrapperLoading> : 
                                    noti.length > 0 ? noti.map(item => {
                                        return (
                                            <ItemNoti 
                                                key={item._id} 
                                                className={item.unread ? 'unread' : ''}
                                                to={`/detail/${item.gym}`}
                                            >
                                                <span>{item.type === 1 
                                                    ? `Phòng gym của bạn có ${item.quantity} đánh giá mới` 
                                                        : item.type === 2 ? `Đánh giá của bạn có ${item.quantity} trả lời mới` 
                                                            : item.type === 3 ? `Phòng gym của bạn đã được duyệt`
                                                                : item.type === 4 && `Bạn có phòng gym mới cần duyệt`
                                                    }</span>
                                                <Time>{parseDate(item.createAt)}</Time>
                                            </ItemNoti>
                                        )
                                    }) : <NoNoti>Bạn không có thông báo</NoNoti>}
                                </Noti>}
                            </WrapItem>
                        </ClickAwayListener>}
                    </NotiMobile>
                <MyButton onClick={() => setOpen(true)} icon={['fas', 'bars']}/>
                <Drawer userProfile={userProfile} isOpen={open} setIsOpen={setOpen} signOut={signOut}/>
            </InnerNav>
        </Nav>
    );
};

const mapStateToProps = (state) => {
    return {
        userProfile: state.ProfileReducer.userProfile,
        loadingProfile: state.ProfileReducer.loaded,
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