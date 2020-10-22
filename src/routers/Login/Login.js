import React, {useState}from 'react';
import LoginBanner from '../../assets/images/login-banner.jpg';
import Divider from '@material-ui/core/Divider';
import {
    Parents,
    LoginWrap,
    Title,
    Left,
    Right,
    FlexBox,
    LoginWithGoogle,
    LoginWithFacebook,
    Icon
} from './styles';
import LoginForm from './LoginForm';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';
import { loginSocial, login } from '../../api/authApi';
import SnackBar from '../../components/SnackBar';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserProfile } from '../../store/Profile/ProfileAction';
import { HOME_PATH } from '../../constants/Path';

const Login = ({getUserProfile, loadingProfile}) => {
    const history = useHistory();
    const [openSnackBarLoginFail, setOpenSnackBarLoginFail] = useState(false);
    const [openSnackBarLoginFailOther, setOpenSnackBarLoginFailOther] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLoginGoogle = async (response) => {
        const res = await loginSocial({
            name: response.profileObj.name,
            email: response.profileObj.email,
            id: response.googleId,
            profileImg: response.profileObj.imageUrl,
            socialType: 'google'
        })
        localStorage.setItem('token', res.token);
        getUserProfile();
        history.push(HOME_PATH);
    }

    const handleLoginFacebook = async (response) => {
        const res = await loginSocial({
            name: response.name,
            email: null,
            id: response.id,
            profileImg: response.picture.data.url,
            socialType: 'facebook'
        })
        localStorage.setItem('token', res.token);
        getUserProfile();
        history.push(HOME_PATH);
    }

    const handleLogin = async (value) => {
        setLoading(true);
        const res = await login(value);
        setLoading(false);
        if(res.message === 'Sai tên đăng nhập hoặc mật khẩu') {
            setOpenSnackBarLoginFail(true);
        } else {
            if(res.message === 'Tài khoản chưa được xác nhận') {
                history.push(`/confirm?id=${res.uid}&type=reconfirm`);
            } else {
                if (res.message === 'Auth successful') {
                    localStorage.setItem('token', res.token);
                    getUserProfile();
                    history.push(HOME_PATH);
                } else {
                    setOpenSnackBarLoginFailOther(true);
                }
            }
        }
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBarLoginFail(false);
        setOpenSnackBarLoginFailOther(false);
    }

    return (
        <>
        <SnackBar open={openSnackBarLoginFailOther} message="Có lỗi xảy ra" handleClose={handleCloseSnackBar} type="error"/>
        <SnackBar open={openSnackBarLoginFail} message="Sai tên đăng nhập hoặc mật khẩu" handleClose={handleCloseSnackBar} type="error"/>
        <Parents src={LoginBanner}>
            <LoginWrap>
                <Title>Đăng nhập</Title>
                <FlexBox>
                    <Left>
                        <LoginForm onSubmit={handleLogin} loading={loading}/>
                    </Left>
                    <Right>
                        Hoặc đăng nhập với   
                        <FacebookLogin
                            appId="2688883084718471"
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={handleLoginFacebook}
                            render={renderProps => (
                                <LoginWithFacebook onClick={renderProps.onClick}>
                                    <Icon icon={['fab', 'facebook']} />Facebook
                                </LoginWithFacebook>
                            )}
                        />
                        <Divider />
                        <GoogleLogin
                            clientId="432278265369-6qkn2n488ckiadipp3lhahu7t76pb1er.apps.googleusercontent.com"
                            render={renderProps => (
                                <LoginWithGoogle onClick={renderProps.onClick}>
                                    <Icon icon={['fab', 'google']} />Google
                                </LoginWithGoogle>
                            )}
                            buttonText="Login"
                            onSuccess={handleLoginGoogle}
                            onFailure={(response) => {
                                console.log(response);
                            }}
                        />
                    </Right>
                </FlexBox>
            </LoginWrap>
        </Parents>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        userProfile: state.ProfileReducer.userProfile,
        loadingProfile: state.ProfileReducer.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserProfile: () => {
            dispatch(getUserProfile());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);