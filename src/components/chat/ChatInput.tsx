import React from 'react';

const ChatInput: React.FC = () => {
    return (
        <div className="w-full h-[50px] flex rounded-b-lg bg-input border-t-[3px] border-b-gray-500">
            <input
                type="text"
                placeholder="입력"
                className="flex-1 p-[5px] m-[5px] rounded-[15px] border border-input focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
                className="m-[5px] h-[40px] rounded-[15px] text-amber-400 border-1 flex items-center justify-center">
                입력
            </button>
        </div>
    );
};

export default ChatInput;