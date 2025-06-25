import api from "@/lib/axios.ts";
import type {ChatHistoryResponse} from "@/api/chat/types/chatResponse.ts";
import type {ResponseFormat} from "@/types/common/responseFormat.ts";

export const chatHistoryApi = (studyId: number, amount?: number, threshold?: string): Axios.IPromise<ChatHistoryResponse> => {
    return api.get<ResponseFormat<ChatHistoryResponse>>(`/api/chat/list/study/${studyId}`, {
        params: {threshold, amount}
    }).then((response) => {
        if (response.status === 200) {
            return (response.data as ResponseFormat<ChatHistoryResponse>).data;
        } else {
            throw response.statusText;
        }
    })
}