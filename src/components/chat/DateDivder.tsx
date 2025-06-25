import React from 'react';

interface DateDividerProps {
    date: Date;
}

const DateDivider = React.memo(({date}: DateDividerProps) => {
    return (
        <div className="relative flex justify-center items-center my-6">
            <span className="relative z-10 bg-gray-100 px-4 text-sm text-gray-500">
                {date.getFullYear() + "." + date.getMonth() + "." + date.getDate() + " (" + Days[(date.getDay())] + ")"}
            </span>
        </div>
    );
}, (prev, next) => {
    return prev.date !== next.date;
});

enum Days {
    일,
    월,
    화,
    수,
    목,
    금,
    토,
};

export default DateDivider;