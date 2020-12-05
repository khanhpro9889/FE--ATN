import React from 'react';
import { connect } from 'react-redux';
import { LOGIN_PATH } from '../../constants/Path';
import { Redirect, Route } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';

const WithNoLogin = ({ userProfile, loadingProfile, component, ...rest }) => {
    return (
        <>
            {
                !loadingProfile ? <LoadingSpinner /> : 
                (!userProfile ? <Redirect to={LOGIN_PATH}/>
                : <Route component={component} {...rest}/>)
            }
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        userProfile: state.ProfileReducer.userProfile,
        loadingProfile: state.ProfileReducer.loaded
    }
}

export default connect(mapStateToProps, null)(WithNoLogin);