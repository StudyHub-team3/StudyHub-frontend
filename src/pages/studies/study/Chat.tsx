// pages/studies/[id]/chat.tsx
// 스터디 상세 페이지 내 채팅 기능 페이지

import React from 'react';
import Header from "@/components/common/Header.tsx";
import ChatInput from "@/components/chat/ChatInput.tsx";
import ChatMessage from "@/components/chat/ChatMessage.tsx";
import {dummyChatHistory, dummyChatUser} from "@/data/dummyChatHistory.tsx";
import DateDivider from "@/components/chat/DateDivder.tsx";
import {useParams} from "react-router-dom";
import ChatHeader from "@/components/chat/ChatHeader.tsx";

const ChatPage: React.FC = () => {
    const {id} = useParams();
    const studyId = Number(id);
    const userId = 1;
    const chatUsers = dummyChatUser;
    const thisChatUserData = dummyChatUser.filter(chatUsers => chatUsers.userId === userId)[0];
    return (
        <>
            <div className="h-[100dvh]">
                <Header/>
                <ChatHeader title={"스프링 뿌셔뿌셔"}/>
                <div
                    className="flex flex-col-reverse h-[calc(100dvh-50px-80px-40px)] border-3 border-b-neutral-300 rounded-[20px] w-[80dvw] m-[20px] justify-self-center">
                    <ChatInput/>
                    <div className="flex flex-col-reverse overflow-scroll pt-140px">
                        {
                            dummyChatHistory.map((chatEvent, i, array) => {
                                return (
                                    <>
                                        <ChatMessage
                                            studyId={studyId}
                                            data={chatEvent}
                                            thisChatUserData={thisChatUserData}
                                            chatUserDataList={chatUsers}
                                            key={i}
                                        />
                                        {
                                            i + 1 === array.length || chatEvent.timestamp.getDate() !== array[i + 1].timestamp.getDate() ?
                                                <DateDivider date={chatEvent.timestamp}/>
                                                : <></>
                                        }
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatPage;