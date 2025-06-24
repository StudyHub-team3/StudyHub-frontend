import React from 'react';

interface ChatHeaderProps {
    title: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({title}) => {
    return (
        <div className="justify-self-center text-[40px] h-[50px]">
            {title}
        </div>
    );
};

export default ChatHeader;