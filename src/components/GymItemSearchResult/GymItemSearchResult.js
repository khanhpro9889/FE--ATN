import React from 'react';
import { 
    Wrap, 
    WrapRight, 
    WrapLeft,
    Thumnail,
    Name,
    Icon,
    Address,
    ClearFix,
    Item,
} from './styles';
import image from '../../assets/images/gym-category.jpg';
import { roundNumber } from '../../utils/number';

const GymItemSearchResult = ({gym}) => {
    //console.log(gym.utilities);
    return (
        <Wrap>
            <WrapLeft>
                <Thumnail src={gym.gallery.length > 0 ? gym.gallery[0].path : image}>
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
                <Name to={`/detail/${gym._id}`}>{gym.title}</Name>
                <Address><Icon icon={['fas', 'map-marker-alt']}/>{gym.addresses.address}, {gym.addresses.district.path_with_type}</Address>
                <Address><Icon icon={['fas', 'star']}/>{gym.reviews.length > 0 ? roundNumber(gym.reviews.reduce((sum, item) => {
                        return sum + item.rating;
                    }, 0) / gym.reviews.length) : 0} ({gym.reviews.length} đánh giá)</Address>
            </WrapRight>
        </Wrap>
    );
};

export default GymItemSearchResult;