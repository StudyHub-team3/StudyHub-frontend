import React from 'react';
import {cn} from '@/lib/utils';
import SystemMessage from "@/components/chat/SystemMessage.tsx";
import {useNavigate} from "react-router-dom";
import type {StudyMemberInfoResponse,} from "@/api/chat/types/chatResponse.ts";
import type {
    ChatEvent,
    ChatEventData,
    SystemBoardCreatedEventResponse,
    SystemCrewMoveEventResponse,
    UserEventEventResponse,
    UserReplyEventResponse
} from "@/api/chat/types/chatEvent.ts";

interface ChatMessageProps {
    studyId: number,
    chatMessage: ChatEvent<ChatEventData>;
    thisChatUserData: StudyMemberInfoResponse;
    chatUserDataList?: StudyMemberInfoResponse[];
    timestamp: Date;
    isHover: boolean;
    onClickReply: (replyMessageId: number, replyMessageContent: string, replyMessageAuthorName: string) => void;
}

const ChatMessage = React.memo((
        {
            studyId,
            chatMessage,
            thisChatUserData,
            chatUserDataList,
            timestamp,
            isHover,
            onClickReply,
        }: ChatMessageProps) => {
        const nav = useNavigate();

        if (["SYSTEM_STUDY_CREW_JOINED", "SYSTEM_STUDY_CREW_QUITED", "SYSTEM_BOARD_CREATED"].includes(chatMessage.eventType)) {
            if (["SYSTEM_STUDY_CREW_JOINED", "SYSTEM_STUDY_CREW_QUITED"].includes(chatMessage.eventType)) {
                const eventMakerUserData = chatUserDataList?.filter(chatUserData =>
                    chatUserData.userId === (chatMessage.data as SystemCrewMoveEventResponse).userId
                )[0];
                return (
                    <SystemMessage
                        message={(eventMakerUserData?.userName ?? (chatMessage.data as SystemCrewMoveEventResponse).userName ?? "(알 수 없음)") + ("SYSTEM_STUDY_CREW_JOINED" === chatMessage.eventType ? " 님이 가입했습니다" : " 님이 틸퇴했습니다")}/>
                )
            }
            if ("SYSTEM_BOARD_CREATED" === chatMessage.eventType) {
                const systemBoardCreatedEvent = chatMessage.data as SystemBoardCreatedEventResponse;
                const author = chatUserDataList?.filter(chatUserData =>
                    chatUserData.userId === systemBoardCreatedEvent.authorId
                )[0];
                const onClick = () => {
                    nav(`/studies/${studyId}/board/${systemBoardCreatedEvent.boardId}`)
                }
                return (
                    <SystemMessage message={author?.userName + " 님이 게시글을 등록했습니다."} onClick={onClick}/>
                );
            }
        }

        const notMine = (chatMessage.data as UserReplyEventResponse).speakerId !== thisChatUserData?.userId;
        const speaker = chatUserDataList?.filter(chatUserData =>
            chatUserData.userId === (chatMessage.data as UserReplyEventResponse).speakerId
        )[0];
        const userEventEventResponse = chatMessage.data as UserEventEventResponse;
        return (
            <div className="mx-[5px] my-[3px]">
                {
                    notMine ?
                        <div className="flex flex-row">
                            <div>
                                {speaker?.userName}
                            </div>
                            <div
                                className={cn("self-center mx-[5px] px-[5px] rounded-[8px] text-[13px]", speaker?.role === "MENTOR" ? "bg-[#9895FF] text-[white]" : "bg-[#9FFF95]")}>
                                {speaker?.role === "MENTOR" ? "멘토" : "멘티"}
                            </div>
                        </div>
                        : <></>
                }
                <div className={cn("flex", notMine ? "flex-row" : "flex-row-reverse")}>
                    <div
                        className={cn("flex flex-col py-[5px] px-[15px] rounded-[15px]", notMine ? "bg-[#FFE095]" : "bg-[#9DFF95]")}>
                        {
                            "USER_REPLY" === chatMessage.eventType ?
                                <>
                                    <div>
                                        {`${(chatMessage.data as UserReplyEventResponse).replyForChatMessageAuthorName}에게 답장`}
                                    </div>
                                    <div className="text-[#BEBEBE]">
                                        {`${(chatMessage.data as UserReplyEventResponse).replyForChatMessageContent}`}
                                    </div>
                                    <hr/>
                                </>
                                : <></>
                        }
                        <div className="">
                            {userEventEventResponse.content}
                        </div>
                    </div>
                    {
                        isHover ?
                            <div
                                className="text-[12px] self-end text-black mx-[5px] bg-purple-100 w-[30px] h-[20px] text-center rounded-[10px] hover:cursor-pointer hover:bg-amber-500"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClickReply(userEventEventResponse.studyChatMessageId, userEventEventResponse.content, speaker?.userName ?? "(알 수 없음)")
                                }}
                            >
                                답장
                            </div>
                            :
                            <div className="text-[12px] self-end text-[#8E8E8E] mx-[5px]">
                                {
                                    timestamp.getHours() + ":" +
                                    (
                                        timestamp.getMinutes() < 10 ?
                                            (timestamp.getMinutes() == 0 ? "00" : ("0" + timestamp.getMinutes())) : timestamp.getMinutes()
                                    )
                                }
                            </div>
                    }
                </div>
            </div>
        );
    }
    , (prev, next) => {
        return prev.chatMessage.data.studyChatMessageId === next.chatMessage.data.studyChatMessageId && prev.isHover === next.isHover;
    }
);

export default ChatMessage;