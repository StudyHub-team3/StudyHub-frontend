// pages/studies/[id]/chat.tsx
// 스터디 상세 페이지 내 채팅 기능 페이지

import React, {useEffect, useState} from 'react';
import Header from "@/components/common/Header.tsx";
import ChatInput from "@/components/chat/ChatInput.tsx";
import ChatMessage from "@/components/chat/ChatMessage.tsx";
import DateDivider from "@/components/chat/DateDivder.tsx";
import {useParams} from "react-router-dom";
import ChatHeader from "@/components/chat/ChatHeader.tsx";
import {chatHistoryApi} from "@/api/chat/chatApi.ts";
import type {
    ChatHistoryResponse,
    ChatMessageDataInterface,
    ChatMessageResponse,
    StudyMemberInfoResponse
} from "@/api/chat/types/chatResponse.ts";

const ChatPage: React.FC = () => {
    const {id} = useParams();
    const studyId = Number(id);
    const userId = 1; // TODO 어떻게 관리?

    const [isLoaded, setIsLoaded] = useState(false);
    const [studyChatId, setStudyChatId] = useState<number>(); //TODO 채팅 발송시 사용
    const [threshold, setThreshold] = useState<string>(); //TODO 채팅 발송시 사용
    const [groupName, setGroupName] = useState<string>();
    const [studyMembers, setStudyMembers] = useState<StudyMemberInfoResponse[]>([]);
    const [chatMessages, setChatMessages] = useState<ChatMessageResponse<ChatMessageDataInterface>[]>([]);
    useEffect(() => {
        chatHistoryApi(studyId)
            .then((chatHistoryResponse: ChatHistoryResponse) => {
                setStudyChatId(chatHistoryResponse.studyChatId);
                setThreshold(chatHistoryResponse.threshold);
                setGroupName(chatHistoryResponse.studyInfo.groupName);
                setStudyMembers(chatHistoryResponse.studyMemberInfos);
                setChatMessages(chatHistoryResponse.chatMessages.content);
                setIsLoaded(true);
            });
    }, []);
    if (!isLoaded) {
        return (
            <>
                <Header/>
                <>로딩중...</>
            </>
        );
    }
    const thisChatUserData = studyMembers.filter(studyMemberInfo => studyMemberInfo.userId === userId)[0];
    console.log(chatMessages);
    return (
        <>
            <div className="h-[100dvh]">
                <Header/>
                <ChatHeader title={`${groupName}`}/>
                <div
                    className="flex flex-col-reverse h-[calc(100dvh-50px-80px-40px)] border-3 border-b-neutral-300 rounded-[20px] w-[80dvw] m-[20px] justify-self-center">
                    <ChatInput/>
                    <div className="flex flex-col-reverse overflow-scroll pt-140px">
                        {
                            chatMessages.map((chatMessage, i, array) => {
                                const timestamp = new Date(chatMessage.timestamp);
                                return (
                                    <>
                                        <ChatMessage
                                            studyId={studyId}
                                            chatMessage={chatMessage}
                                            thisChatUserData={thisChatUserData}
                                            chatUserDataList={studyMembers}
                                            timestamp={timestamp}
                                            key={i}
                                        />
                                        {
                                            i + 1 === array.length || timestamp.getDate() !== new Date(array[i + 1].timestamp).getDate() ?
                                                <DateDivider date={timestamp}/>
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