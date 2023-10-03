'use client';

import { Plus } from "lucide-react";

import { ActionTooltip } from "../action-tooltip";
import { useModal } from "@/hook/use-model-store";

export const NavigationAction=()=>
{
    const {onOpen}=useModal();
   
    

    return (
        <div>
       <ActionTooltip 
       side="right"
        align="center"
        label="Add a server">
        <button  onClick={()=>onOpen('createServer')} className="group flex items-center">
        <div
         className="flex mx-3 h-[56px] w-[56px] rounded-full transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
          <Plus className="group-hover:text-white transistion text-emerald-500"
            size={25} />
         </div>
         </button>
        </ActionTooltip>
         </div>
       

    )
}




//    <div>
//         label="Add a server    <ActionTooltip side="right"
//         align="center"
// ">
    //  <button className="group flex items-center">
    // <div
    //  className="flex mx-3 h-[48px] w-[-48px] rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
    //   <Plus className="group-hover:text-white transistion text-emerald-500"
    //     size={25} />
    //  </div>
    //  </button>
//      </ActionTooltip>
//      </div>