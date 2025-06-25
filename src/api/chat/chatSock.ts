import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type {ChatEvent, ChatEventData, SystemCrewMoveEventResponse,} from "@/api/chat/types/chatEvent.ts";
import {type Dispatch, type RefObject, type SetStateAction, useCallback, useEffect, useRef, useState} from "react";
import type {StudyMemberInfoResponse} from "@/api/chat/types/chatResponse.ts";
import type {ChatMessageRequest} from "@/api/chat/types/chatReqeust.ts";

const useChatClientConnection = (
    studyChatId: number,
    subCallback: (data: ChatEvent<ChatEventData>) => void,
): RefObject<Client> => {
    const clientRef = useRef(Client.prototype);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // 이미 연결된 경우 새 연결 방지
        if (isConnected || studyChatId <= 0) return;

        const client = new Client({
            webSocketFactory: () => new SockJS(`${import.meta.env.VITE_CHAT_STOMP_URL}/api/chat/stomp`),
            reconnectDelay: 1000,
        });
        client.onConnect = () => {
            setIsConnected(true);
            client.subscribe(`/topic/chat/study/${studyChatId}`, (message) => {
                const data = JSON.parse(message.body);
                subCallback(data);
            });
        }
        client.activate();
        clientRef.current = client;
        return () => {
            client.deactivate();
            setIsConnected(false);
        };
    }, [clientRef, studyChatId, subCallback]);
    return clientRef;
}

export const useChatClient = (
    studyChatId: number | undefined,
    setStudyMembers: Dispatch<SetStateAction<StudyMemberInfoResponse[]>>,
    setChatMessages: Dispatch<SetStateAction<ChatEvent<ChatEventData>[]>>,
): RefObject<Client> => {
    const chatCallback =
        useCallback(
            (data: ChatEvent<ChatEventData>) => {
                setChatMessages((prev) => [
                    data,
                    ...prev,
                ]);
                // const memberInfo = (data.data as StudyMemberInfoResponse);
                switch (data.eventType) {
                    case "SYSTEM_STUDY_CREW_QUITED": {
                        const memberInfo = (data.data as SystemCrewMoveEventResponse);
                        setStudyMembers((prev) => [
                            ...prev,
                            {
                                userId: memberInfo.userId,
                                userName: memberInfo.userName,
                                status: "들어왔것지",
                                role: memberInfo.userRole || "MENTEE",
                            }
                        ]);
                        break;
                    }
                    case "SYSTEM_STUDY_CREW_JOINED": {
                        const quitedMemberInfo = (data.data as SystemCrewMoveEventResponse);
                        setStudyMembers((prev) => prev.filter((studyMemberInfo) =>
                            studyMemberInfo.userId !== quitedMemberInfo.userId
                        ));
                        break;
                    }
                }
                ;
            }
            , []);
    return useChatClientConnection(studyChatId || -1, chatCallback);
}

export const publishChat = (
    socketClient: RefObject<Client>,
    studyChatId: number,
    body: ChatMessageRequest,
    userId?: number,
) => {
    if (userId && socketClient.current && socketClient.current.connected) {
        socketClient.current.publish({
            destination: `/sock/chat/app/study-chat/${studyChatId}/send/${userId}`,
            body: JSON.stringify(body)
        });
    }
}