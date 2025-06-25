import type {MessageType} from "@/api/chat/types/message.type.ts";

export interface ChatEvent<T extends ChatEventData> {
    eventType: MessageType;
    data: T;
    timestamp: string;
}

export interface ChatEventData {
    studyChatId: number;
    studyChatMessageId: number;
}

export interface UserEventEventResponse extends ChatEventData {
    studyChatId: number;
    studyChatMessageId: number;
    content: string;
    speakerId: number;
}

export interface UserReplyEventResponse extends ChatEventData {
    studyChatId: number;
    studyChatMessageId: number;
    content: string;
    speakerId: number;
    replyForChatMessageId: number;
    replyForChatMessageAuthorName: string;
    replyForChatMessageContent: string;
}

export interface SystemCrewMoveEventResponse extends ChatEventData {
    studyChatId: number;
    studyChatMessageId: number;
    userId: number;
    userName: string;
    userRole?: "MENTOR" | "MENTEE";
}

export interface SystemBoardCreatedEventResponse extends ChatEventData {
    studyChatId: number;
    studyChatMessageId: number;
    authorId: number;
    boardId: number;
}
