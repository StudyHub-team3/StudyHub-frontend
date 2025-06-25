import type {MessageType} from "@/api/chat/types/message.type.ts";

export interface ChatMessageRequest {
    messageType: MessageType;
    content: string;
    replyForChatMessageId?: number;
    replyForChatMessageContent?: string;
    replyForChatMessageAuthorName?: string;
}
