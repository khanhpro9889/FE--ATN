import React, { useState }from 'react';
import {
    Wrapper,
    Left, 
    Right,
    FlexBox,
    Avatar,
    Header,
    Body,
    Footer,
    Stars,
    Icon,
    Date,
    Name,
    Button,
    OptionChoice,
    Menu,
    MenuItem
} from './styles';

const ReviewItem = ({isReply}) => {
    const [open, setOpen] = useState(false);

    return (
        <Wrapper isReply={!isReply}>
            <FlexBox>
                <Left>
                    <Avatar src="https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png"/>
                </Left>
                <Right>
                    <Header>
                        <Name>Hồ Gia Khánh</Name>
                        {!isReply && <Stars>
                            <Icon icon={['fas', 'star']} />
                            <Icon icon={['fas', 'star']} />
                            <Icon icon={['fas', 'star']} />
                            <Icon icon={['fas', 'star']} />
                            <Icon icon={['fas', 'star']} />
                        </Stars>}
                        <OptionChoice>
                            <Button onClick={() => setOpen(!open)}><Icon icon={['fas', 'ellipsis-v']}/></Button>
                            {open && <Menu>
                                <MenuItem>Xoá</MenuItem>
                                <MenuItem>Sửa</MenuItem>
                            </Menu>}
                        </OptionChoice>
                    </Header>
                    <Date>2020/09/27</Date>
                </Right>
            </FlexBox>
            <Body>
                Dhanula shared good information about leopard behavior, habitat and thaught identification techniques. He shared wonderful stories about them. Hope to see them soon in wild. It was a fun session, good for family.
            </Body>
            <Footer>
                <Button><Icon icon={['fas', 'thumbs-up']}/> 12</Button>
                {!isReply && <Button><Icon icon={['fas', 'reply']}/></Button>}
            </Footer>
        </Wrapper>
    );
};

export default ReviewItem;