import React, {type MouseEvent} from 'react';

interface SystemMessageProps {
    message: string;
    onClick?: (e: MouseEvent) => void
}

const SystemMessage: React.FC<SystemMessageProps> = ({message, onClick}) => {
    return (
        <div
            className="flex justify-center bg-input self-center min-w-1/5 max-w-3/4 rounded-[10px] px-[13px] py-[3px] my-[4px]"
            onClick={onClick}
        >
            {message}
        </div>
    );
};

export default SystemMessage;