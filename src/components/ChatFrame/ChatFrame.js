import React, {useState, useEffect, useRef} from 'react';
import {Animated} from "react-animated-css";
import {
    Wrapper,
    Header,
    Left,
    Right,
    Body,
    BoxSend,
    ButtonSend,
    BoxMessage,
    Name,
    Conversation,
    Sender,
    Receiver,
    NameMessage,
    BodyMessage,
    Time,
    SeeMore,
    Icon,
    SelectedImage,
    Image,
    DeleteMessage,
    Div,
    Upload,
    Parents
} from './styles';
import { getConversation, getMessages, addMessage, deleteMessage } from '../../api/conversationApi';
import { parseDate } from '../../utils/date';
import socketIOClient from 'socket.io-client';
import DialogConfirmDelete from '../DialogConfirmDelete';

const ChatFrame = ({closeChatFrame, uid, setSrc, conversation}) => {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [sendedMessage, setSendedMessage] = useState('');
    const [flagMessage, setFlagMessage] = useState(false);
    let chatBottom = useRef(null);
    const [messagesLength, setMessagesLength] = useState(0);
    const [page, setPage] = useState(1);
    const [image, setImage] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [openDialogConfirmDelete, setOpenDialogConfirmDelete] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        console.log(conversation);
        setSelectedConversation(conversation);
    }, [conversation])

    useEffect(() => {
        let socket;
        if(selectedConversation) {
            socket = socketIOClient('http://localhost:3001');
            socket.on(`messages ${selectedConversation._id}`, data => {
                setFlagMessage(pre => !pre);
            });
        } 
        return () => {
            if(socket)
                socket.close();
        }
    }, [selectedConversation]);

    const onFileChange = (event) => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            setImage(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) =>{
              setImageSrc(e.target.result);
            };
          }
    }

    const deleteImage = async () => {
        setImage(null);
        setImageSrc(null);
    }

    const scrollToBottom = () => {
        chatBottom.current.scrollIntoView({ behavior: 'smooth' });
    }

    const fetchData = async () => {
        try {
            const res = await getConversation(uid);
            console.log(res);
            setConversations(res.conversations);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchMessages = async () => {
        try {
            const res = await getMessages({conversationId: selectedConversation._id, uid, page});
            setMessages(res.messages);
            setMessagesLength(res.length);
            if(page === 1) {
                scrollToBottom();
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleSendMessage = async (e) => {
        e.preventDefault();
        let receiver;
        if(selectedConversation.user1._id === uid) {
            receiver = selectedConversation.user2._id;
        } else {
            receiver = selectedConversation.user1._id;
        }
        try {
            const formData = new FormData();
            formData.append('sender', uid);
            formData.append('receiver', receiver);
            formData.append('img', image);
            formData.append('conversationId', selectedConversation._id);
            formData.append('creatAt', new Date());
            formData.append('body', sendedMessage);
            const res = await addMessage(formData);
            setImageSrc(null);
            setImage(null);
            setSendedMessage('');
            scrollToBottom();
        } catch (err) {
            console.log(err);
            console.log("Abc");
            setSendedMessage('');
        }
    }

    const handleCloseDialog = () => {
        setOpenDialogConfirmDelete(false);
    }

    const deleteMessageApi = async () => {
        try {
            await deleteMessage(selectedMessage);
            fetchMessages();
        } catch (err) {
            console.log(err);
        }
    }
    const handleDeleteMessage = async (id) => {
        setSelectedMessage(id);
        setOpenDialogConfirmDelete(true);
       
    }

    useEffect(() => {
        if(selectedConversation) {
            fetchMessages();
        }    
    }, [selectedConversation, flagMessage, page])

    return (
        <>
        <DialogConfirmDelete 
            openDialog={openDialogConfirmDelete} 
            handleCloseDialog={handleCloseDialog}
            handleAgree={deleteMessageApi}
            handleDisagree={handleCloseDialog}
        />
        <Parents>
        <Animated
            animationIn="slideInUp" 
            animationOut="slideOutDown"
            animationInDuration={600} 
            animationOutDuaration={600}
            isVisible={visible}
        >
            <Wrapper>
                <Header onClick={() => {
                    setVisible(false);
                    setTimeout(() => {
                        closeChatFrame()
                    }, 600);   
                }}>Chat</Header>
                <Body>
                    <Left>
                        {selectedConversation && <Name>
                            {
                                uid === selectedConversation.user1._id ? 
                                selectedConversation.gym.title + ', Host by: ' + selectedConversation.user2.name : selectedConversation.user1.name + ', about: ' + selectedConversation.gym.title
                            }
                        </Name>}
                        <BoxMessage>
                            {selectedConversation && 
                                <><div>
                                    {messagesLength > messages.length && 
                                        <SeeMore onClick={() => {setPage(pre => pre + 1)}}>Xem tiếp</SeeMore> 
                                    }
                                    {messages.map((item) => {
                                        if(item.sender._id === uid) 
                                            return (
                                                <Sender key={item._id}>
                                                    <NameMessage>Bạn</NameMessage>
                                                    <DeleteMessage onClick={() => {
                                                        handleDeleteMessage(item._id);
                                                    }}>
                                                        Xóa
                                                    </DeleteMessage>
                                                    {item.body && <BodyMessage>{item.body}</BodyMessage>}
                                                    {item.image && <Image onClick={() => setSrc(item.image)}><img alt="image" src={item.image}/></Image>}
                                                    <Time>{parseDate(item.createAt)}</Time>
                                                </Sender>
                                            )
                                        if(item.receiver._id === uid)
                                            return (
                                                <Receiver key={item._id}>
                                                    <NameMessage>{item.sender.name}</NameMessage>
                                                    {item.body && <BodyMessage>{item.body}</BodyMessage>}
                                                    {item.image && <Image onClick={() => setSrc(item.image)}><img alt="image" src={item.image}/></Image>}
                                                    <Time>{parseDate(item.createAt)}</Time>
                                                </Receiver>
                                            )
                                        return (<></>)
                                    })}
                                </div>
                                <div ref={chatBottom}></div></>
                            }
                            {!selectedConversation && <div className="center">Chọn một tin nhắn để xem</div>}
                        </BoxMessage>
                        {imageSrc && <SelectedImage><img alt="image" src={imageSrc} /><Icon onClick={deleteImage} icon={['fas', 'times']}/></SelectedImage>}
                        {selectedConversation && <BoxSend>
                            <Div>
                                <input value={sendedMessage} type="text" onChange={(e) => setSendedMessage(e.target.value)}/>
                                <Upload>
                                    <label for="upload-photo"><Icon icon={['fas', 'camera']} /></label>
                                    <input onChange={onFileChange} type="file" name="photo" className="upload-photo" accept="image/x-png,image/gif,image/jpeg"/>
                                </Upload> 
                            </Div>
                            {((sendedMessage && sendedMessage.length > 0 ) || image) && <ButtonSend icon={['fas', 'paper-plane']} onClick={handleSendMessage}/>}
                        </BoxSend>}
                    </Left>
                    <Right>
                        {conversations && conversations.map((item) => {
                            if(item.user1._id === uid) {
                                if(item.unread1) {
                                    return <Conversation key={item._id} onClick={() => setSelectedConversation(item)}><strong>{item.gym.title}</strong></Conversation>
                                } else {
                                    return <Conversation key={item._id} onClick={() => setSelectedConversation(item)}>{item.gym.title}</Conversation>
                                }    
                            }     
                            if(item.user2._id === uid) {
                                if(item.unread2) {
                                    return <Conversation key={item._id} onClick={() => setSelectedConversation(item)}><strong>{item.user1.name}</strong></Conversation>
                                } else {
                                    return <Conversation key={item._id} onClick={() => setSelectedConversation(item)}>{item.user1.name}</Conversation>
                                }    
                            }
                            return (<></>)
                        })}
                    </Right>
                </Body>
            </Wrapper>
        </Animated>         
        </Parents>
        </>
    );
};

export default ChatFrame;