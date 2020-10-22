import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import React from 'react';
import Login from './Login';
import Register from './Register';
import Confirm from './Confirm';
import ResetPassword from './ResetPassword';
import ResetPassword2nd from './ResetPassword2nd';
import WithLogin from '../utils/router/withLogin';
import WithNoLogin from '../utils/router/withNoLogin';
import AddGym from './AddGym';
import ProfilePage from './ProfilePage';
import Detail from './Detail';

const Routes = (props) => {
    return (
        <>
            <Switch>
                {
                    [
                        Home,
                        Detail,
                        ProfilePage
                    ].map((item) => (<Route key={item.path} exact path={item.path} component={item.component} />))
                }
                {
                    [
                        Login,
                        Register,
                        Confirm,
                        ResetPassword,
                        ResetPassword2nd,
                    ].map((item) => (<WithLogin key={item.path} exact path={item.path} component={item.component} />))
                }
                {
                    [
                        AddGym,
                    ].map((item) => (<WithNoLogin key={item.path} exact path={item.path} component={item.component} />))
                }
            </Switch>
        </>
    )
}

export default Routes;