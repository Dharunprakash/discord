'use client'
import { Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle } from "@/components/ui/dialog";
import { useModal } from '@/hook/use-model-store';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hook/use-origin";
import { useState } from "react";
import axios from "axios";

export const InviteModal = () => {

  const {onOpen,isOpen,onClose,type,data} = useModal();
  const isModalOpen = isOpen && type==='invite';
  const origin =useOrigin();
  const {server} = data;
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;
  const [copied,setCopied] = useState(false);
  const [isloading,setIsLoading] = useState(false);
  
  const onCopied = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  const onNew= async () => {
    try{
    setIsLoading(true);
    const response= await axios.patch(`/api/servers/${server?.id}/invite-code`)
    onOpen('invite',{server:response.data});
    }
    catch(err){
      console.log(err);
    }
    finally{
      setIsLoading(false);
    }

   
  }

  return (
    <Dialog  open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
      <DialogHeader className="pt-8 px-6">
        <DialogTitle className="text-2xl text-center font-bold">Invite Friends </DialogTitle>
      </DialogHeader>
        Invite Model

      <div className="p-6">
        <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
          server invite link
        </Label>
        <div className="flex items-center mt-2 gap-x-2">
          <Input disabled={isloading} className="bg-zinc-300/50 border-0 focus-visible:ring-0 texxtt-black focus-visible:ring-offset-0" value={inviteUrl} />
          <Button disabled={isloading} size='icon' onClick={onCopied}>
            {copied ? <Check className="h-4 w-4" /> :  <Copy className='h-4 w-4'/>}
          </Button>
          </div>
          <Button onClick={onNew} disabled={isloading} variant='link' size='sm' className="text-xs text-zinc-500 mt-4">
            Generate a new 
            <RefreshCw className="h-4 w-4 ml-2"/>
          </Button>
      </div>
      </DialogContent>
    </Dialog>
  );
}