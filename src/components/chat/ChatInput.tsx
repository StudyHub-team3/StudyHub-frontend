import type {Dispatch, FormEvent, SetStateAction} from "react";

interface ChatInputProps {
    onSubmit: (e: FormEvent) => void;
    userMessage: string,
    setUserMessage: Dispatch<SetStateAction<string>>
}

const ChatInput = ({onSubmit, userMessage, setUserMessage}: ChatInputProps) => {
    return (
        <form className="w-full h-[50px] flex rounded-b-lg bg-input border-t-[3px] border-b-gray-500"
              onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="입력"
                className="flex-1 p-[5px] m-[5px] rounded-[15px] border border-input focus:outline-none focus:ring-1 focus:ring-primary"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
            />
            <button
                className="m-[5px] h-[40px] rounded-[15px] text-amber-400 border-1 flex items-center justify-center">
                입력
            </button>
        </form>
    );
};

export default ChatInput;