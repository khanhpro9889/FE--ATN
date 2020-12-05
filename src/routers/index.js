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
import WithAdmin from '../utils/router/withAdmin';
import ProfilePage from './ProfilePage';
import Detail from './Detail';
import AddStep1 from './AddStep1';
import AddStep2 from './AddStep2';
import AddStep3 from './AddStep3';
import AddStep4 from './AddStep4';
import AddStep5 from './AddStep5';
import AddStep6 from './AddStep6';
import AddStep7 from './AddStep7';
import AddStep8 from './AddStep8';
import NearBy from './NearBy';
import SearchResult from './SearchResult';
import Saves from './Saves';
import AdminApprove from './AdminApprove';
import AdminUsers from './AdminUsers';
import AdminGyms from './AdminGyms';
import NotFound from './NotFound';
import VerifyRegister from './VerifyRegister';
import Reviews from './Reviews';
import AdminReviews from './AdminReviews';

const Routes = (props) => {
    return (
        <>
            <Switch>
                {
                    [
                        Home,
                        Detail,
                        ProfilePage,
                        NearBy,
                        SearchResult,
                        Saves,
                        Reviews
                    ].map((item) => (<Route key={item.path} exact path={item.path} component={item.component} />))
                }
                {
                    [
                        AdminApprove,
                        AdminUsers,
                        AdminGyms,
                        AdminReviews
                    ].map((item) => (<WithAdmin key={item.path} exact path={item.path} component={item.component}/>))
                }
                {
                    [
                        Login,
                        Register,
                        Confirm,
                        ResetPassword,
                        ResetPassword2nd,
                        VerifyRegister
                    ].map((item) => (<WithLogin key={item.path} exact path={item.path} component={item.component}/>))
                }
                {
                    [
                        AddStep1,
                        AddStep2,
                        AddStep3,
                        AddStep4,
                        AddStep5,
                        AddStep6,
                        AddStep7,
                        AddStep8
                    ].map((item) => (<WithNoLogin key={item.path} exact path={item.path} component={item.component}/>))
                }
                <Route component={NotFound} />
            </Switch>
        </>
    )
}

export default Routes;