import React from 'react';

import { Spinner, Wrap } from './styles';

const FixedMiniLoadingSpinner = props => {
    return (
        <Wrap>
            <Spinner
                variant="indeterminate"
                disableShrink
                size={40}
                thickness={4}
                {...props}
            />
        </Wrap>
    );
};

export default FixedMiniLoadingSpinner;