import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import api from "@/lib/axios";

export interface StudyJoinDialogProps {
  trigger: React.ReactNode;
  // studyTitle: string;
  studyId: number;
  onClose: () => void;
}

const StudyJoinDialog = ({
  trigger,
  // studyTitle,
  studyId,
  onClose,
}: StudyJoinDialogProps) => {
  const [role, setRole] = useState<"MENTOR" | "MENTEE">("MENTOR");
  const [introduction, setIntroduction] = useState("");
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    const result = await api.post("/api/study-members/join", {
      studyId,
      role,
      comment: introduction,
    });

    if (result && result.status && result.status === 200) {
      setOpen(false);
      onClose();
    } else {
      alert("신청 오류");
    }
  };

  useEffect(() => {
    if (open) {
      setRole("MENTOR");
      setIntroduction("");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className="h-[500px] max-w-[350px] bg-[#FFF7E0] px-[35px] py-[25px] rounded-[12px] [&>[data-slot=dialog-close]]:hidden flex flex-col gap-[30px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="h-[30px] mt-[15px] relative">
          <DialogTitle>스터디 참여 신청</DialogTitle>
          <DialogClose
            className="absolute right-[-20px] top-[-22px] bg-[transparent] hover:none h-[20px]"
            asChild
          >
            <X className="color-[black] cursor-pointer" />
          </DialogClose>
        </DialogHeader>

        <div className="space-y-4 flex flex-col gap-[18px] flex-1">
          {/* <div className="flex flex-col gap-[5px]">
            <Label className="text-[0.9rem] font-[700]">스터디 명</Label>
            <Label className="text-[0.9rem]">{studyTitle}</Label>
          </div> */}

          <div className="flex flex-col gap-[5px]">
            <Label className="text-[0.9rem] font-[700]">역할 선택</Label>
            <RadioGroup
              defaultValue="MENTOR"
              onValueChange={(val) => setRole(val as "MENTOR" | "MENTEE")}
              className="flex gap-[10px] mt-2"
            >
              <div className="flex items-center gap-[3px] group">
                <RadioGroupItem
                  className="p-[0.5rem] bg-[#FFFFFF] p-[0.4rem] [&>span>svg]:h-[6px] [&>span>svg]:w-[6px] hidden"
                  value="MENTOR"
                  id="mentor"
                />
                <Label
                  htmlFor="mentor"
                  className={`text-[0.9rem]  border-1 p-[4px] bg-[#FFFFFF] w-[55px] justify-center rounded-full 
                    ${
                      role === "MENTOR"
                        ? "bg-[#FFA61E] text-[#FFFFFF] border-[#FFA61E]"
                        : "bg-[#FFFFFF]"
                    }`}
                >
                  멘토
                </Label>
              </div>
              <div className="flex items-center gap-[3px] group">
                <RadioGroupItem
                  className="p-[0.5rem] bg-[#FFFFFF] p-[0.4rem] [&>span>svg]:h-[6px] [&>span>svg]:w-[6px] hidden"
                  value="MENTEE"
                  id="mentee"
                />
                <Label
                  htmlFor="mentee"
                  className={`text-[0.9rem]  border-1 p-[4px] bg-[#FFFFFF] w-[55px] justify-center rounded-full
                    ${
                      role === "MENTEE"
                        ? "bg-[#FFA61E] text-[#FFFFFF] border-[#FFA61E]"
                        : "bg-[#FFFFFF]"
                    }
                    `}
                >
                  멘티
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex-1 flex flex-col gap-[5px]">
            <Label htmlFor="introduction" className="text-[0.9rem] font-[700]">
              자기소개 (선택)
            </Label>
            <Textarea
              id="introduction"
              className="bg-[#FFFFFF] resize-none h-full"
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="mt-0 h-[45px]">
          <DialogClose asChild>
            <Button
              className="rounded-full bg-[#FFA61E] h-[40px]"
              onClick={handleConfirm}
            >
              신청하기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudyJoinDialog;
