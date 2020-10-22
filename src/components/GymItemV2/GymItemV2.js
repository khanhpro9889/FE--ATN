import React from 'react';

import { 
    Wrap, 
    WrapRight, 
    WrapLeft,
    Thumnail,
    Name,
    Icon,
    Address,
    Span,
    ClearFix,
    Item
} from './styles';

const GymItemV2 = ({gym}) => {
    return (
        <Wrap>
            <WrapLeft>
                <Thumnail src={gym.gallery[0].path}>
                    <ClearFix>
                        {gym.services && gym.services.map(item => {
                            return (
                                <Item key={item._id}>{item.name}</Item>
                            )
                        })}
                    </ClearFix>
                </Thumnail>
            </WrapLeft>
            <WrapRight>
                <Span><Icon icon={['fas', 'star']}/>8.5 (21)</Span>
                <Name to={`/detail/${gym._id}`}>{gym.title}</Name>
                <Address>{gym.address}, {gym.district.path_with_type}</Address>
            </WrapRight>
        </Wrap>
    );
};

export default GymItemV2;