import type {Slice} from "@/types/common/responseFormat.ts";
import type {ChatEvent, ChatEventData} from "@/api/chat/types/chatEvent.ts";

export interface ChatHistoryResponse {
    studyChatId: number;
    chatMessages: Slice<ChatEvent<ChatEventData>>;
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
