import React from 'react';
import { 
    Wrap, 
    WrapRight, 
    WrapLeft,
    Thumnail,
    Name,
    Icon,
    Address,
    Name1,
    ClearFix,
    Item,
} from './styles';
import image from '../../assets/images/gym-category.jpg';
import { roundNumber } from '../../utils/number';
import { parseDate } from '../../utils/date';

const GymItem = ({gym, approve}) => {
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
                {gym.complete ? <Name to={`/detail/${gym._id}`}>{gym.title || 'Tiêu đề'}</Name> : <Name1>{gym.title || 'Tiêu đề'}</Name1>}
                <Address><Icon icon={['fas', 'map-marker-alt']}/>{gym.addresses.address || 'Địa chỉ'}, {gym.addresses.district ? gym.addresses.district.path_with_type : 'Tỉnh thành'}</Address>
                <Address><Icon icon={['fas', 'star']}/>{gym.reviews.length > 0 ? roundNumber(gym.reviews.reduce((sum, item) => {
                        return sum + item.rating;
                    }, 0) / gym.reviews.length) : 0} ({gym.reviews.length} đánh giá)</Address>
                {approve && <Address>Ngày cập nhật: {parseDate(gym.updateAt)}</Address>}
            </WrapRight>
        </Wrap>
    );
};

export default GymItem;