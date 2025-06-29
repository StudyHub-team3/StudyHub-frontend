// pages/studies/[id]/chat.tsx
// 스터디 상세 페이지 내 채팅 기능 페이지

import React, {type FormEvent, useCallback, useEffect, useRef, useState} from 'react';
import Header from "@/components/common/Header.tsx";
import ChatInput from "@/components/chat/ChatInput.tsx";
import ChatMessage from "@/components/chat/ChatMessage.tsx";
import DateDivider from "@/components/chat/DateDivder.tsx";
import {useParams} from "react-router-dom";
import ChatHeader from "@/components/chat/ChatHeader.tsx";
import {chatHistoryApi} from "@/api/chat/chatApi.ts";
import type {ChatHistoryResponse, StudyMemberInfoResponse} from "@/api/chat/types/chatResponse.ts";
import {publishChat, useChatClient} from "@/api/chat/chatSock.ts";
import type {ChatMessageRequest} from "@/api/chat/types/chatReqeust.ts";
import type {ChatEvent, ChatEventData} from "@/api/chat/types/chatEvent.ts";
import SystemMessage from "@/components/chat/SystemMessage.tsx";
import {getUserId} from "@/lib/token.ts";

const ChatPage: React.FC = () => {
    const {id} = useParams();
    const studyId = Number(id);
    const loadAmount = 10;

    const [userId, setUserId] = useState<number>();
    useEffect(() => {
        setUserId(getUserId());
    }, []);

    const [isLoaded, setIsLoaded] = useState(false);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const [studyChatId, setStudyChatId] = useState<number>();
    const [threshold, setThreshold] = useState<string>();
    const [groupName, setGroupName] = useState<string>();
    const [studyMembers, setStudyMembers] = useState<StudyMemberInfoResponse[]>([]);
    const [chatMessages, setChatMessages] = useState<ChatEvent<ChatEventData>[]>([]);
    const [userMessage, setUserMessage] = useState<string>("");
    const [messageType, setMessageType] = useState<"USER_MESSAGE" | "USER_REPLY">("USER_MESSAGE");
    const [hasNext, setHasNext] = useState(false);
    const [hoverIndex, setHoverIndex] = useState<number>();

    const [replyMessageId, setReplyMessageId] = useState<number | undefined>();
    const [replyMessageContent, setReplyMessageContent] = useState<string | undefined>();
    const [replyMessageAuthorName, setReplyMessageAuthorName] = useState<string | undefined>();

    const onClickReply = (replyId: number | undefined, replyContent: string | undefined, replyAuthorName: string | undefined) => {
        setMessageType("USER_REPLY");
        setReplyMessageId(replyId);
        setReplyMessageContent(replyContent);
        setReplyMessageAuthorName(replyAuthorName);
    }

    const scollToBottom = useCallback(() => {
        setTimeout(() => {
            if (messagesContainerRef.current) {
                messagesContainerRef.current.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            }
        }, 100);
    }, []);

    const chatClient = useChatClient(studyChatId, setStudyMembers, setChatMessages);
    const onSubmit = useCallback((e: FormEvent) => {
        e.preventDefault();
        console.log(userMessage);
        if (!studyChatId || !userMessage) {
            return;
        }
        const requestBody: ChatMessageRequest = {
            messageType,
            content: userMessage,
            replyForChatMessageId: replyMessageId,
            replyForChatMessageContent: replyMessageContent,
            replyForChatMessageAuthorName: replyMessageAuthorName,
        }
        publishChat(chatClient, studyChatId, requestBody, userId)
        setUserMessage("");
        setMessageType("USER_MESSAGE");
        setReplyMessageId(undefined);
        setReplyMessageContent(undefined);
        setReplyMessageAuthorName(undefined);
        scollToBottom();
    }, [chatClient, studyChatId, userId, messageType, userMessage, replyMessageId, replyMessageContent, replyMessageAuthorName]);

    const loadChatHistory = useCallback((studyId: number, amount?: number, threshold?: string) => {
        chatHistoryApi(studyId, amount, threshold)
            .then((chatHistoryResponse: ChatHistoryResponse) => {
                setStudyChatId(chatHistoryResponse.studyChatId);
                setThreshold(chatHistoryResponse.threshold);
                if (chatHistoryResponse.studyInfo)
                    setGroupName(chatHistoryResponse.studyInfo.groupName);
                if (chatHistoryResponse.studyMemberInfos)
                    setStudyMembers(chatHistoryResponse.studyMemberInfos);
                setChatMessages((prev) => [...prev, ...chatHistoryResponse.chatMessages.content]);
                setHasNext(!chatHistoryResponse.chatMessages.last);
            });
    }, []);

    useEffect(() => { // 초기 데이터 로딩
        loadChatHistory(studyId, loadAmount)
        setIsLoaded(true);

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
    return (
        <>
            <div className="h-[100dvh]">
                <Header/>
                <ChatHeader title={`${groupName}`}/>
                <div
                    className="flex flex-col-reverse h-[calc(100dvh-50px-80px-40px)] border-3 border-b-neutral-300 rounded-[20px] w-[80dvw] m-[20px] justify-self-center">
                    <ChatInput onSubmit={onSubmit} userMessage={userMessage} setUserMessage={setUserMessage}/>
                    {
                        (replyMessageId && replyMessageContent && replyMessageAuthorName) ?
                            <div
                                className="flex flex-col w-full h-[50px] bg-[#9DFF95] py-[5px] px-[15px] rounded-t-[15px]">
                                <div>
                                    {replyMessageAuthorName} 에게 답장하기
                                </div>
                                <div className="text-[#BEBEBE]">
                                    {replyMessageContent}
                                </div>
                            </div>
                            : <></>
                    }
                    <div className="flex flex-col-reverse overflow-scroll pt-140px" ref={messagesContainerRef}
                         onClick={() => {
                             onClickReply(undefined, undefined, undefined);
                             setMessageType("USER_MESSAGE");
                         }}>
                        {
                            chatMessages.map((chatMessage, i, array) => {
                                const timestamp = new Date(chatMessage.timestamp);
                                return (
                                    <div className="flex flex-col-reverse" key={i}
                                         onMouseEnter={() => setHoverIndex(chatMessage.data.studyChatMessageId)}
                                         onMouseLeave={() => setHoverIndex(undefined)}>
                                        <ChatMessage
                                            studyId={studyId}
                                            chatMessage={chatMessage}
                                            thisChatUserData={thisChatUserData}
                                            chatUserDataList={studyMembers}
                                            timestamp={timestamp}
                                            isHover={hoverIndex === chatMessage.data.studyChatMessageId}
                                            onClickReply={onClickReply}
                                        />
                                        {
                                            i + 1 === array.length || timestamp.getDate() !== new Date(array[i + 1].timestamp).getDate() ?
                                                <DateDivider date={timestamp}/>
                                                : <></>
                                        }
                                    </div>
                                )
                            })
                        }
                        {
                            hasNext ? <SystemMessage message="더보기"
                                                     onClick={() => loadChatHistory(studyId, loadAmount, threshold)}/> : <></>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatPage;