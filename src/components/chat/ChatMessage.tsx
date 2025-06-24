import React from 'react';
import {cn} from '@/lib/utils';
import type {
    ChatEvent,
    ChatUserData,
    SystemBoardCreatedEvent,
    SystemStudyCrewMoveEvent,
    UserMessageEvent
} from "@/data/dummyChatHistory.tsx";
import SystemMessage from "@/components/chat/SystemMessage.tsx";
import {useNavigate} from "react-router-dom";

interface ChatMessageProps {
    studyId: number,
    data: ChatEvent;
    thisChatUserData: ChatUserData;
    chatUserDataList?: ChatUserData[];
}

const ChatMessage: React.FC<ChatMessageProps> = (
    {
        studyId,
        data,
        thisChatUserData,
        chatUserDataList,
    }) => {
    const nav = useNavigate();

    if (["SYSTEM_STUDY_CREW_JOINED", "SYSTEM_STUDY_CREW_QUITED", "SYSTEM_BOARD_CREATED"].includes(data.eventType)) {
        if (["SYSTEM_STUDY_CREW_JOINED", "SYSTEM_STUDY_CREW_QUITED"].includes(data.eventType)) {
            const eventMakerUserData = chatUserDataList?.filter(chatUserData =>
                chatUserData.userId === (data.data as SystemStudyCrewMoveEvent).speakerId
            )[0];
            return (
                <SystemMessage
                    message={eventMakerUserData?.userName + ("SYSTEM_STUDY_CREW_JOINED" === data.eventType ? " 님이 가입했습니다" : " 님이 틸퇴했습니다")}/>
            )
        }
        if ("SYSTEM_BOARD_CREATED" === data.eventType) {
            const systemBoardCreatedEvent = data.data as SystemBoardCreatedEvent;
            const author = chatUserDataList?.filter(chatUserData =>
                chatUserData.userId === systemBoardCreatedEvent.speakerId
            )[0];
            const onClick = () => {
                nav(`/studies/${studyId}/board/${systemBoardCreatedEvent.boardId}`)
            }
            return (
                <SystemMessage message={author?.userName + " 님이 게시글을 등록했습니다."} onClick={onClick}/>
            );
        }
    }

    const notMine = data.data.speakerId !== thisChatUserData?.userId;
    const speaker = chatUserDataList?.filter(chatUserData =>
        chatUserData.userId === data.data.speakerId
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
                            className={cn("self-center mx-[5px] px-[5px] rounded-[8px] text-[13px]", speaker?.userRole === "mentor" ? "bg-[#9895FF] text-[white]" : "bg-[#9FFF95]")}>
                            {speaker?.userRole === "mentor" ? "멘토" : "멘티"}
                        </div>
                    </div>
                    : <></>
            }
            <div className={cn("flex", notMine ? "flex-row" : "flex-row-reverse")}>
                <div className={cn("flex flex-col p-[6px] rounded-[15px]", notMine ? "bg-[#FFE095]" : "bg-[#9DFF95]")}>
                    {
                        "USER_REPLY" === data.eventType ?
                            <>
                                <div>
                                    {`{userName}에게 답장`}
                                </div>
                                <div className="text-[#BEBEBE]">
                                    {`{message}`}
                                </div>
                                <hr/>
                            </>
                            : <></>
                    }
                    <div className="">
                        {(data.data as UserMessageEvent).content}
                    </div>
                </div>
                <div className="text-[12px] self-end text-[#8E8E8E] mx-[5px]">
                    {data.timestamp.getHours() + ":" + data.timestamp.getMinutes()}
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;