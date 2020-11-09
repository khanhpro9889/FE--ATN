import React, {useState, useEffect}from 'react';

import { Icon, Wrapper } from './styles';
import socketIOClient from 'socket.io-client';
import { getConversation } from '../../api/conversationApi';

const ChatBtn = ({openChatFrame, uid}) => {
    const [unread, setUnread] = useState(false);

    useEffect(() => {
        fetchData();
        const socket = socketIOClient('http://localhost:3001');
        socket.on(`conversations ${uid}`, data => {
            fetchData();
        });
        return () => {
            socket.close();
        }
    }, [])

    const fetchData = async () => {
        try {
            const res = await getConversation(uid);
            for(var i = 0; i < res.conversations.length; i++) {
                if(res.conversations[i].user1._id === uid) {
                    if(res.conversations[i].unread1) {
                        setUnread(true);
                        break;
                    }
                }
                if(res.conversations[i].user2._id === uid) {
                    if(res.conversations[i].unread2) {
                        setUnread(true);
                        break;
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Wrapper onClick={() => openChatFrame()}>
            {unread && <div></div>}
            <Icon icon={['fas', 'comments']}/> Chat
        </Wrapper>
    );
};

export default ChatBtn;