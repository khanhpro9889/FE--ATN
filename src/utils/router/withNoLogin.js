import React from 'react';

import { connect } from 'react-redux';
import { LOGIN_PATH } from '../../constants/Path';
import { Redirect, Route } from 'react-router-dom';

const WithNoLogin = ({ userProfile, loadingProfile, component, ...rest }) => {
    console.log(userProfile);
    return (
        <>
            {
                !loadingProfile && !userProfile ? <Redirect to={LOGIN_PATH}/>
                : <Route component={component} {...rest}/>
            }
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        userProfile: state.ProfileReducer.userProfile,
        loadingProfile: state.ProfileReducer.loading
    }
}

export default connect(mapStateToProps, null)(WithNoLogin);