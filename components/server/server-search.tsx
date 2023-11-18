'use client'

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { useParams, useRouter } from "next/navigation";



interface ServerSearchProps {
  data:{
    label:string;
    type:'channel'|'member';
    data:{
      icon:React.ReactNode;
      name:string;
      id:string;
    }[]|undefined;
  }[]
}


export const ServerSearch = ({data}:ServerSearchProps) => {
  const [open,setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  useEffect(()=>{
    const down =(e:KeyboardEvent)=>{
      if(e.key === 'k' && e.metaKey){
        e.preventDefault();
        setOpen((open)=>!open)
      }
    }
  },[])
  const onClick=({id,type}:{id:string,type:'channel'|'member'})=>{
    if(type === 'channel'){
      router.push(`/servers/${params?.ServerId},/channels/${id}`)
    }else{
      router.push(`/servers/${params?.serverId}/conversations/${id}`)
    }
  }
  return(
    <>  
    <button className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition" onClick={()=>setOpen(true)}>
      <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        <p
          className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition"
        >
          Search
        </p>
        <kbd
          className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto"
        >
          <span className="text-xs">⌘</span>K
        </kbd>
    </button>
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search for a channel or member" />
      <CommandList>
        <CommandEmpty>
          No Results Found
        </CommandEmpty>
        {data.map(({label,type,data}) => {
          if(!data?.length) return null;
          return(
            <CommandGroup key={label} heading={label}>
              {data.map(({icon,name,id}) => {
                return(
                <CommandItem key={id} onSelect={()=>onClick({id,type})}>
                  {icon}
                  <span>{name}</span>
                </CommandItem>
                )
              }
              )}
            </CommandGroup>

          )
        } )}
        </CommandList>
    </CommandDialog>
    </>
  )
}