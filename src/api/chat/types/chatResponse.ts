import type {Slice} from "@/types/common/responseFormat.ts";

export interface ChatHistoryResponse {
    studyChatId: number;
    chatMessages: Slice<ChatMessageResponse<ChatMessageDataInterface>>;
    threshold: string;
    studyMemberInfos: StudyMemberInfoResponse[];
    studyInfo: StudyInfoResponse;
}

export interface StudyMemberInfoResponse {
    userId: number;
    userName: string;
    status: string;
    role: "MENTOR" | "MENTEE";
}

export interface StudyInfoResponse {
    studyId: number;
    groupName: string;
    category: string;
    createdAt: string;
}

export interface ChatMessageResponse<T extends ChatMessageDataInterface> {
    eventType: MessageType;
    data: T;
    timestamp: string;
}

type MessageType =
    "USER_MESSAGE"
    | "USER_REPLY"
    | "SYSTEM_STUDY_CREW_JOINED"
    | "SYSTEM_STUDY_CREW_QUITED"
    | "SYSTEM_BOARD_CREATED";

export interface ChatMessageDataInterface {
    studyChatId: number;
    studyChatMessageId: number;
}

export interface UserMessageMessageResponse extends ChatMessageDataInterface {
    studyChatId: number;
    studyChatMessageId: number;
    content: string;
    speakerId: number;
}

export interface UserReplyMessageResponse extends ChatMessageDataInterface {
    studyChatId: number;
    studyChatMessageId: number;
    content: string;
    speakerId: number;
    replyForChatMessageId: number
    replyForChatMessageAuthorName: string;
    replyForChatMessageContent: string;
}

export interface SystemCrewMoveMessageResponse extends ChatMessageDataInterface {
    studyChatId: number;
    studyChatMessageId: number;
    userId: number;
    userName: string;
}

export interface SystemBoardCreatedMessageResponse extends ChatMessageDataInterface {
    studyChatId: number;
    studyChatMessageId: number;
    authorId: number;
    boardId: number;
}