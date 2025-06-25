import React from 'react';
import {cn} from '@/lib/utils';
import SystemMessage from "@/components/chat/SystemMessage.tsx";
import {useNavigate} from "react-router-dom";
import type {
    ChatMessageDataInterface,
    ChatMessageResponse,
    StudyMemberInfoResponse,
    SystemBoardCreatedMessageResponse,
    SystemCrewMoveMessageResponse,
    UserMessageMessageResponse,
    UserReplyMessageResponse
} from "@/api/chat/types/chatResponse.ts";

interface ChatMessageProps {
    studyId: number,
    chatMessage: ChatMessageResponse<ChatMessageDataInterface>;
    thisChatUserData: StudyMemberInfoResponse;
    chatUserDataList?: StudyMemberInfoResponse[];
    timestamp: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = (
    {
        studyId,
        chatMessage,
        thisChatUserData,
        chatUserDataList,
        timestamp,
    }) => {
    const nav = useNavigate();

    if (["SYSTEM_STUDY_CREW_JOINED", "SYSTEM_STUDY_CREW_QUITED", "SYSTEM_BOARD_CREATED"].includes(chatMessage.eventType)) {
        if (["SYSTEM_STUDY_CREW_JOINED", "SYSTEM_STUDY_CREW_QUITED"].includes(chatMessage.eventType)) {
            const eventMakerUserData = chatUserDataList?.filter(chatUserData =>
                chatUserData.userId === (chatMessage.data as SystemCrewMoveMessageResponse).userId
            )[0];
            return (
                <SystemMessage
                    message={(eventMakerUserData?.userName ?? "(알 수 없음)") + ("SYSTEM_STUDY_CREW_JOINED" === chatMessage.eventType ? " 님이 가입했습니다" : " 님이 틸퇴했습니다")}/>
            )
        }
        if ("SYSTEM_BOARD_CREATED" === chatMessage.eventType) {
            const systemBoardCreatedEvent = chatMessage.data as SystemBoardCreatedMessageResponse;
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

    const notMine = (chatMessage.data as UserReplyMessageResponse).speakerId !== thisChatUserData?.userId;
    const speaker = chatUserDataList?.filter(chatUserData =>
        chatUserData.userId === (chatMessage.data as UserReplyMessageResponse).speakerId
    )[0];
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
                <div className={cn("flex flex-col p-[6px] rounded-[15px]", notMine ? "bg-[#FFE095]" : "bg-[#9DFF95]")}>
                    {
                        "USER_REPLY" === chatMessage.eventType ?
                            <>
                                <div>
                                    {`${(chatMessage.data as UserReplyMessageResponse).replyForChatMessageAuthorName}에게 답장`}
                                </div>
                                <div className="text-[#BEBEBE]">
                                    {`${(chatMessage.data as UserReplyMessageResponse).replyForChatMessageContent}`}
                                </div>
                                <hr/>
                            </>
                            : <></>
                    }
                    <div className="">
                        {(chatMessage.data as UserMessageMessageResponse).content}
                    </div>
                </div>
                <div className="text-[12px] self-end text-[#8E8E8E] mx-[5px]">
                    {timestamp.getHours() + ":" + timestamp.getMinutes()}
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;