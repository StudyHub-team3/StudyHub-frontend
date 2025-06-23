export interface ChatEvent {
    eventType: MessageType;
    data: UserMessageEvent | UserReplyEvent | SystemStudyCrewMoveEvent | SystemBoardCreatedEvent;
    timestamp: Date;
}

export type MessageType =
    "USER_MESSAGE" | "USER_REPLY" | "SYSTEM_STUDY_CREW_JOINED" | "SYSTEM_STUDY_CREW_QUITED" | "SYSTEM_BOARD_CREATED";

export interface UserMessageEvent {
    studyChatId: number;
    studyChatMessageId: number;
    content: string;
    speakerId: number;
}

export interface UserReplyEvent {
    studyChatId: number;
    studyChatMessageId: number;
    content: string;
    speakerId: number;
    replyForChatMessageId: number;
}

export interface SystemStudyCrewMoveEvent {
    studyChatId: number;
    studyChatMessageId: number;
    speakerId: number;
}

export interface SystemBoardCreatedEvent {
    studyChatId: number;
    studyChatMessageId: number;
    speakerId: number;
    boardId: number;
}

export const dummyChatHistory: ChatEvent[] = [
    {
        eventType: "USER_REPLY",
        data: {
            studyChatId: 1,
            studyChatMessageId: 13,
            content: "같이 더 공부해볼 생각 있으신가요?",
            speakerId: 3,
            replyForChatMessageId: 4,
        },
        timestamp: new Date(Date.now()),
    },
    {
        eventType: "SYSTEM_BOARD_CREATED",
        data: {
            studyChatId: 1,
            studyChatMessageId: 12,
            speakerId: 2,
            boardId: 3,
        },
        timestamp: new Date(Date.now() - 10),
    },
    {
        eventType: "USER_MESSAGE",
        data: {
            studyChatId: 1,
            studyChatMessageId: 11,
            content: "저도 같이 공부해보고 싶어요!",
            speakerId: 1,
        },
        timestamp: new Date(Date.now() - 20),
    },
    {
        eventType: "USER_MESSAGE",
        data: {
            studyChatId: 1,
            studyChatMessageId: 10,
            content: "이번주는 그 주제를 함께 공부해볼까요?",
            speakerId: 2,
        },
        timestamp: new Date(Date.now() - 30),
    },
    {
        eventType: "USER_MESSAGE",
        data: {
            studyChatId: 1,
            studyChatMessageId: 9,
            content: "스프링 AOP를 아시나요?",
            speakerId: 4,
        },
        timestamp: new Date(Date.now() - 40),
    },
    {
        eventType: "SYSTEM_STUDY_CREW_JOINED",
        data: {
            studyChatId: 1,
            studyChatMessageId: 8,
            speakerId: 4,
        },
        timestamp: new Date(Date.now() - 40),
    },
    {
        eventType: "USER_REPLY",
        data: {
            studyChatId: 1,
            studyChatMessageId: 6,
            content: "같이 더 공부해볼 생각 있으신가요?",
            speakerId: 1,
            replyForChatMessageId: 4,
        },
        timestamp: new Date(Date.now()),
    },
    {
        eventType: "SYSTEM_BOARD_CREATED",
        data: {
            studyChatId: 1,
            studyChatMessageId: 5,
            speakerId: 2,
            boardId: 3,
        },
        timestamp: new Date(Date.now() - 10),
    },
    {
        eventType: "USER_MESSAGE",
        data: {
            studyChatId: 1,
            studyChatMessageId: 4,
            content: "저도 같이 공부해보고 싶어요!",
            speakerId: 3,
        },
        timestamp: new Date(Date.now() - 20),
    },
    {
        eventType: "USER_MESSAGE",
        data: {
            studyChatId: 1,
            studyChatMessageId: 3,
            content: "이번주는 그 주제를 함께 공부해볼까요?",
            speakerId: 2,
        },
        timestamp: new Date(Date.now() - 30),
    },
    {
        eventType: "USER_MESSAGE",
        data: {
            studyChatId: 1,
            studyChatMessageId: 2,
            content: "스프링 IoC를 아시나요?",
            speakerId: 1,
        },
        timestamp: new Date(Date.now() - 40),
    },
    {
        eventType: "SYSTEM_STUDY_CREW_JOINED",
        data: {
            studyChatId: 1,
            studyChatMessageId: 2,
            speakerId: 3,
        },
        timestamp: new Date(Date.now() - 40),
    },
];

export interface ChatUserData {
    userId: number;
    userName: string;
    userRole: ChatUserRole;
    userAvatarSrc?: string;
}

type ChatUserRole = "mentor" | "mentee";

export const dummyChatUser: ChatUserData[] = [
    {
        userId: 1,
        userName: "본인",
        userRole: "mentee",
    },
    {
        userId: 2,
        userName: "은둔의 스프링 고수",
        userRole: "mentor",
    },
    {
        userId: 3,
        userName: "스프링딩동",
        userRole: "mentee",
    },
    {
        userId: 4,
        userName: "프론트는 마스터",
        userRole: "mentee",
    },
];
