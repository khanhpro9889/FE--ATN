import React from 'react';

import { Wrapper, Name, Contact, Icon, Left, ImgBox, Right } from './styles';

const ItemPT = props => {
    return (
        <Wrapper>
            <Left>
                <ImgBox src="https://lh3.googleusercontent.com/a-/AOh14GgV4IqNfkAegSLWK1Q2sX4QIt1_zj_HLJmxR-jq=s96-c"></ImgBox>
            </Left>
            <Right>
                <Name>Hồ Gia Khánh</Name>
                <Contact href="tel:0335941792">0335941792</Contact>
                <Contact><Icon icon={['fab', 'facebook']}></Icon></Contact>
            </Right>
        </Wrapper>
    );
};

export default ItemPT;