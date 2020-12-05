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
import { roundNumber } from '../../utils/number';

const GymItemV2 = ({gym}) => {
    return (
        <Wrap to={`/detail/${gym._id}`}>
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
                <Span><Icon icon={['fas', 'star']}/>
                    {gym.reviews.length > 0 ? roundNumber(gym.reviews.reduce((sum, item) => {
                        return sum + item.rating;
                    }, 0) / gym.reviews.length) : 0} ({gym.reviews.length} đánh giá)
                </Span>
                <Name>{gym.title}</Name>
                <Address>{gym.addresses.address}, {gym.addresses.district.path_with_type}</Address>
            </WrapRight>
        </Wrap>
    );
};

export default GymItemV2;