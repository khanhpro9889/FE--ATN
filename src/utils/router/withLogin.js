import React from 'react';

import { connect } from 'react-redux';
import { HOME_PATH } from '../../constants/Path';
import { Redirect, Route } from 'react-router-dom';

const WithLogin = ({ userProfile, loadingProfile, component, ...rest }) => {

    return (
        <>
            {
                !loadingProfile && userProfile ? <Redirect to={HOME_PATH}/>
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

export default connect(mapStateToProps, null)(WithLogin);