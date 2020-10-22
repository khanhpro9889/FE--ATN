import React from 'react';

import { 
    Wrap, 
    WrapRight, 
    WrapLeft,
    Thumnail,
    Name,
    Icon,
    Address
} from './styles';

const GymItem = ({gym}) => {
    return (
        <Wrap>
            <WrapLeft>
                <Thumnail src={gym.gallery[0].path}></Thumnail>
            </WrapLeft>
            <WrapRight>
                <Name to={`/detail/${gym._id}`}>{gym.title}</Name>
                <Address><Icon icon={['fas', 'map-marker-alt']}></Icon>{gym.address}, {gym.district.path_with_type}</Address>
                <Icon icon={['fas', 'star']}/>8.5
            </WrapRight>
        </Wrap>
    );
};

export default GymItem;