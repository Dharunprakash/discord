'use client'
import { Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle } from "@/components/ui/dialog";
import { useModal } from '@/hook/use-model-store';
import { Button } from "../ui/button";
import { useOrigin } from "@/hook/use-origin";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
export const LeaveServerModal = () => {

  const {isOpen,onClose,type,data} = useModal();
  const isModalOpen = isOpen && type==='leaveServer';
  const origin =useOrigin();
  const {server} = data;
  const router = useRouter();
  const onClick = async () => {
    try{
      setIsLoading(true);
      await axios.patch(`/api/servers/${server?.id}/leave`);
      onClose();
      router.refresh();
      router.push('/')
    }
    catch(err){
      console.log(err);
    }
    finally{
      setIsLoading(false);
    }
  }

  const [isloading,setIsLoading] = useState(false);
  return (
    <Dialog  open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
      <DialogHeader className="pt-8 px-6">
        <DialogTitle className="text-2xl text-center font-bold">Leave Server</DialogTitle>
        <DialogDescription className="text-center text-zinc-500">Are you sure want to leave <span className="text-indigo-500 font-semibold">{server?.name}</span></DialogDescription>
      </DialogHeader>
      <DialogFooter className="bg-gray-100 py-4 px-6">
        <div className="flex items-center justify-between w-full">
          <Button disabled={isloading} onClick={onClose}  variant="ghost">
            Cancel
          </Button>
          <Button disabled={isloading} onClick={onClick} variant="primary">
            Confirm
          </Button>
        </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}