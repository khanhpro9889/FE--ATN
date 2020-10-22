import React from 'react';

import { Btn, Icon } from './styles';

const MyButton = (props) => {
    const {text, icon} = props;
    return (
        <Btn variant="contained" {...props}>
            {icon && <Icon icon={icon}/>}
            {text && <span>{text}</span>}
        </Btn>
    );
};

export default MyButton;