import React, { useState }from 'react';
import { parseDate } from '../../utils/date';
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
    MenuItem,
    IconButtonWrap,
    BtnIcon,
    HeaderLeft
} from './styles';
import DialogConfirmDelete from '../../components/DialogConfirmDelete/DialogConfirmDelete';
import AvatarImg from '../../assets/images/avatar.jpg';

const ReviewItem = ({isReply, reply, item, del, replies, author, openEditDialog, highlight}) => {
    const [open, setOpen] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    return (
        <>
        <DialogConfirmDelete 
            openDialog={openDeleteDialog} 
            handleCloseDialog={() => setOpenDeleteDialog(false)}
            handleAgree={() => del()}
            handleDisagree={() => setOpenDeleteDialog(false)}
        />
        <Wrapper highlight={highlight} isReply={!isReply}>
            <FlexBox>
                <Left>
                    <Avatar src={item.author.profileImg || AvatarImg}/>
                </Left>
                <Right>
                    <Header>
                        <HeaderLeft>
                            <Name>{item.author.name}</Name>
                            {!isReply && (
                                <>
                                    {item.rating === 1 && <Stars>
                                        <Icon icon={['fas', 'star']} />
                                        <Icon icon={['far', 'star']} />
                                        <Icon icon={['far', 'star']} />
                                        <Icon icon={['far', 'star']} />
                                        <Icon icon={['far', 'star']} />
                                    </Stars>}
                                    {item.rating === 2 && <Stars>
                                        <Icon icon={['fas', 'star']} />
                                        <Icon icon={['fas', 'star']} />
                                        <Icon icon={['far', 'star']} />
                                        <Icon icon={['far', 'star']} />
                                        <Icon icon={['far', 'star']} />
                                    </Stars>}
                                    {item.rating === 3 && <Stars>
                                        <Icon icon={['fas', 'star']} />
                                        <Icon icon={['fas', 'star']} />
                                        <Icon icon={['fas', 'star']} />
                                        <Icon icon={['far', 'star']} />
                                        <Icon icon={['far', 'star']} />
                                    </Stars>}
                                    {item.rating === 4 && <Stars>
                                        <Icon icon={['fas', 'star']} />
                                        <Icon icon={['fas', 'star']} />
                                        <Icon icon={['fas', 'star']} />
                                        <Icon icon={['fas', 'star']} />
                                        <Icon icon={['far', 'star']} />
                                    </Stars>}
                                    {item.rating === 5 && <Stars>
                                        <Icon icon={['fas', 'star']} />
                                        <Icon icon={['fas', 'star']} />
                                        <Icon icon={['fas', 'star']} />
                                        <Icon icon={['fas', 'star']} />
                                        <Icon icon={['fas', 'star']} />
                                    </Stars>}
                                </>
                            )}
                            <Date>{parseDate(item.createAt)}</Date>
                        </HeaderLeft>
                        {(author && ((author._id === item.author._id) || author.role === 'admin'))  && <OptionChoice>
                            <IconButtonWrap
                                color="primary"
                                component="span"
                                onClick={() => setOpen(!open)}
                            >
                                <BtnIcon icon={['fas', 'ellipsis-v']} />
                            </IconButtonWrap>
                            {open && <Menu>
                                <MenuItem onClick={() => setOpenDeleteDialog(true)}>Xoá</MenuItem>
                                <MenuItem onClick={() => openEditDialog()}>Sửa</MenuItem>
                            </Menu>}
                        </OptionChoice>}
                    </Header>
                </Right>
            </FlexBox>
            <Body>
                {item.body}
            </Body>
            <Footer>
                {!isReply && <Button onClick={() => reply()}>Trả lời ({item.replyQuantity})</Button>}
            </Footer>
        </Wrapper>
        </>
    );
};

export default ReviewItem;