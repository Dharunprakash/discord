'use client'
import axios from 'axios';
import { Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle } from "@/components/ui/dialog";
import qs from 'query-string';
import { useForm } from "react-hook-form";
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'
import {Form,FormControl,FormField,FormLabel,FormItem,FormMessage,} from '@/components/ui/form'
import { Button } from "../ui/button";
import { FileUpload } from "../file-upload";
import { useRouter } from 'next/navigation';
import { useModal } from '@/hook/use-model-store';
const formSchema =z.object({

  fileUrl: z.string().min(1,
    {message:'Attachment is required'})
})
export const MessageFileModal = () => {

  const {isOpen,onClose,type,data}=useModal();
  const router=useRouter()
  const isModalOpen=isOpen && type==='messageFile'

  const form=useForm(
    {
      resolver: zodResolver(formSchema),
      defaultValues:
      {
      fileUrl:''
      }
})
const isLoading=form.formState.isSubmitting
const {apiUrl,query}=data

const onSubmit= async (values: z.infer<typeof formSchema>)=>{
  try{
      const url=qs.stringifyUrl({
        url:apiUrl || '',
        query,
      })

      await axios.post(url,{...values,content:values.fileUrl})
      form.reset()
      router.refresh();
      handleClose();
  }
  catch (error){
    console.log(error);
  }
}
const handleClose=()=>{
  form.reset()
  onClose()
}
    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
          <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">Add an attachment </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Give Your server Personality with a name and an image. You can alwayas change it later
            </DialogDescription>
          </DialogHeader>  
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-8 px-6">
                <div className="flex items-center justify-center text-center">
                  <FormField control={form.control}
                name='fileUrl'
                render={({field})=>(
                    <FormItem>
                      <FormControl>
                        <FileUpload  
                        endpoint='messageFile'
                        value={field.value}
                        onChange={field.onChange}
                        
                        />
                      </FormControl>
                    </FormItem>
                  )}/>
                </div>
              </div>
              <DialogFooter className="bg-gray-100 px-6 py-4">
                <Button variant='primary' disabled={isLoading}>
                  Send
                </Button>
              </DialogFooter>
            </form>
          </Form>
          </DialogContent>

        </Dialog>
      );
}