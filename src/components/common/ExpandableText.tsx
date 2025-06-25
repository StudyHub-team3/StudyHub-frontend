import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

type ExpandableTextProps = {
  text: string;
  collapsedHeight?: number; // 예: 60px
};

const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  collapsedHeight = 60,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (el) {
      // 렌더링 이후 scrollHeight를 기반으로 overflow 여부 계산
      setIsOverflowing(el.scrollHeight > collapsedHeight);
    }
  }, [text, collapsedHeight]);

  return (
    <div className="mt-2">
      <div className="bg-[#F8F9FA] p-[10px] mt-[5px] rounded-[6px]">
        <div
          ref={contentRef}
          style={{
            maxHeight: expanded ? "none" : collapsedHeight,
            overflow: "hidden",
            transition: "max-height 0.3s ease",
          }}
          className="relative"
        >
          <p className="whitespace-pre-wrap text-[0.8rem] flex min-h-[0]">
            {text}
          </p>

          {!expanded && isOverflowing && (
            <div
              className="absolute inset-x-0 bottom-0 h-6"
              style={{
                background:
                  "linear-gradient(rgba(255,255,255,0), rgba(255,255,255,1))",
              }}
            />
          )}
        </div>
      </div>
      {isOverflowing && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center mt-[2.5px] text-[0.7rem] text-[lightgrey] hover:bg-[transparent] transition-colors p-[0] bg-[transparent] hover:shadow-[none] focus:shadow-[none]"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-[1.5em] h-[1.5em] mr-1" />
              접기
            </>
          ) : (
            <>
              <ChevronDown className="w-[1.5em] h-[1.5em] mr-1" />
              더보기
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ExpandableText;
