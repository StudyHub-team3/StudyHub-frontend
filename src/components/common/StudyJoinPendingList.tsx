import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ExpandableText from "./ExpandableText"; // 위에서 만든 컴포넌트를 임포트
import { X } from "lucide-react";
import api from "@/lib/axios";

export interface StudyJoinPendingListProps {
  trigger: React.ReactNode;
  studyId: number;
  onClose: () => void;
}

const StudyJoinPendingList = ({
  trigger,
  studyId,
  onClose,
}: StudyJoinPendingListProps) => {
  const [fetchData, setFetchData] = useState([]);
  const [open, setOpen] = useState(false);

  const fetch = async () => {
    const data = await api.get(`/api/study-members/requests/${studyId}`);

    setFetchData((data.data as any).data);
  };

  const onAccept = async (memberId: number) => {
    const result = await api.patch(`/api/study-members/requests/${memberId}`);

    if (result && result.status && result.status === 200) {
      await fetch();
    } else {
      alert("수락 오류");
    }
  };

  const onReject = async (memberId: number) => {
    const result = await api.delete(`/api/study-members/requests/${memberId}`);

    if (result && result.status && result.status === 200) {
      await fetch();
    } else {
      alert("거절 오류");
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
    setOpen(isOpen);
  };

  useEffect(() => {
    if (open) {
      fetch();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} modal>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className="h-[600px] max-w-[1000px] bg-[#FFF7E0] px-[35px] py-[25px] rounded-[12px] [&>[data-slot=dialog-close]]:hidden flex flex-col"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="h-[30px] mt-[15px] relative mb-[30px]">
          <DialogTitle>스터디 신청자 목록</DialogTitle>
          <DialogClose
            className="absolute right-[-20px] top-[-22px] bg-[transparent] hover:none h-[20px]"
            asChild
          >
            <X className="color-[black] cursor-pointer" />
          </DialogClose>
        </DialogHeader>

        <div className="flex gap-[25px]">
          <div className="w-[50%] font-[700] mb-[10px] flex items-center">
            멘토
            <div className="text-[0.8rem] ml-[5px]">
              (총: {fetchData.filter((o: any) => o.role === "MENTOR").length}명)
            </div>
          </div>
          <div className="w-[50%] font-[700] mb-[10px] flex items-center">
            멘티
            <div className="text-[0.8rem] ml-[5px]">
              (총: {fetchData.filter((o: any) => o.role === "MENTEE").length}
              명)
            </div>
          </div>
        </div>

        <div className="flex gap-[25px] min-h-[0]">
          <div className="overflow-y-auto h-full w-full">
            <Table>
              <TableBody>
                {fetchData
                  .filter((o: any) => o.role === "MENTOR")
                  .map((info: any) => (
                    <TableRow
                      key={info.id}
                      className="h-[140px] px-[5px] pt-[5px] hover:bg-[transparent]"
                    >
                      <TableCell>
                        <div className="h-[fit] bg-[#FFFFFF] py-[10px] px-[15px] rounded-[6px] min-h-[125px]">
                          <div className="flex font-medium mb-[3px] justify-between">
                            <div className="flex gap-[10px] items-center">
                              <span className="text-[0.9rem] font-[700]">
                                {info.userName}
                              </span>
                              <span className="text-[0.8rem] text-[grey]">
                                {info.requestAt}
                              </span>
                            </div>
                            <div className="flex gap-[5px]">
                              <Button
                                className="bg-[transparent] p-[0] text-[blue] text-[0.7rem] font-[700] hover:bg-[transparent] hover:shadow-[none] focus:shadow-[none]"
                                onClick={async () => await onAccept(info.id)}
                              >
                                수락
                              </Button>
                              <Button
                                className="bg-[transparent] p-[0] text-[red] text-[0.7rem] font-[700] hover:bg-[transparent] hover:shadow-[none] focus:shadow-[none]"
                                onClick={async () => await onReject(info.id)}
                              >
                                거절
                              </Button>
                            </div>
                          </div>
                          <ExpandableText text={info.comment} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
          <div className="overflow-y-auto h-full w-full">
            <Table>
              <TableBody>
                {fetchData
                  .filter((o: any) => o.role === "MENTEE")
                  .map((info: any) => (
                    <TableRow
                      key={info.id}
                      className="h-[140px] px-[5px] pt-[5px] hover:bg-[transparent]"
                    >
                      <TableCell>
                        <div className="h-[fit] bg-[#FFFFFF] py-[10px] px-[15px] rounded-[6px] min-h-[125px]">
                          <div className="flex font-medium mb-[3px] justify-between">
                            <div className="flex gap-[10px] items-center">
                              <span className="text-[0.9rem] font-[700]">
                                {info.userName}
                              </span>
                              <span className="text-[0.8rem] text-[grey]">
                                {info.requestAt}
                              </span>
                            </div>
                            <div className="flex gap-[5px]">
                              <Button
                                className="bg-[transparent] p-[0] text-[blue] text-[0.7rem] font-[700] hover:bg-[transparent] hover:shadow-[none] focus:shadow-[none]"
                                onClick={async () => await onAccept(info.id)}
                              >
                                수락
                              </Button>
                              <Button
                                className="bg-[transparent] p-[0] text-[red] text-[0.7rem] font-[700] hover:bg-[transparent] hover:shadow-[none] focus:shadow-[none]"
                                onClick={async () => await onReject(info.id)}
                              >
                                거절
                              </Button>
                            </div>
                          </div>
                          <ExpandableText text={info.comment} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudyJoinPendingList;
