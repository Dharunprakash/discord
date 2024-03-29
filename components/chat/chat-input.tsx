'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Plus, SendHorizontal, Smile } from 'lucide-react';
import { Input } from '../ui/input';
import axios from 'axios';
import queryString from 'query-string';
import { useModal } from '@/hook/use-model-store';
import { EmojiPicker } from '../emoji-picker';
import { useRouter } from 'next/navigation';
interface ChatInputProps {
  apiUrl: string;
  query:Record<string,any>;
  name: string;
  type:'conversation'|'channel';
}
const formSchema = z.object({
  content:z.string().min(1),
})

export const ChatInput = ({apiUrl,query,name,type}:ChatInputProps) => {
    const {onOpen}=useModal()
    const form=useForm<z.infer<typeof formSchema>>({
      resolver:zodResolver(formSchema),
      defaultValues:{
        content:'',
      },
    })
    const isLoading = form.formState.isSubmitting;
    const router=useRouter() 
    const onSubmit = async (value:z.infer<typeof formSchema>) => {
    try{
      const url= queryString.stringifyUrl({
        url:apiUrl,
        query,
      })
      await axios.post(url,value)

      form.reset()
      router.refresh()
    }
    catch(error){
      console.log(error)
    }
    }

    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField 
            control={form.control}
            name='content'
            render={({field})=>(
              <FormItem>
                <FormControl>
                  <div className='relative p-4 pb-6'>
                    <button type='button' onClick={()=>onOpen('messageFile',{apiUrl,query})} className='absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 hover:bg-zinc-600 dark:bg-zinc-400 dark:hover:bg-zinc-30 transition rounded-full p-1 flex items-center justify-center'>
                      <Plus className='h-5 w-5 text-white dark:text-gray-900'/>
                      </button>
                      <div className='absolute top-7 left-16'>
                        <EmojiPicker 
                      onChange={(emoji: string) => field.onChange(`${field.value} ${emoji}`)}/>
                      </div>
                      <Input
                      disabled={isLoading} 
                      className='pr-14 py-6 pl-20 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200'
                      placeholder={`   Message ${type==='conversation'?name:'#'+name}`}
                      {...field}

                      />

                    { field.value && field.value.trim() !== '' && (<div className='absolute top-7 right-8'>
                      <button type='submit' >
                        <SendHorizontal className='h-5 w-5 text-blue-600 dark:text-blue-300'/>
                      </button>
                      </div>
                    )}     
                  </div>
                </FormControl>
              </FormItem>
            )}
            />

          </form>

        </Form>
    )
}