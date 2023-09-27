'use client'

import { Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from 'zod';
export const InitialModal = () => {

  const form=useForm({defaultValues:{
    name:'',
    imageUrl:''
  }})
  const [hyd, setHyd] = useState(false);

  useEffect(() => {
    setHyd(true)
  },[])
  if(!hyd) return null;
    return (
        <Dialog open>
          <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">Customize Your Server </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Give Your server Personality with a name and an image. You can alwayas change it later
            </DialogDescription>
          </DialogHeader>
          </DialogContent>

        </Dialog>
      );
}