'use client'

import { useEffect, useState } from "react";
import { CreateServerModal} from "../models/create-server-model"
import { EditServerModal } from "../models/edit-server-modal";
import {InviteModal} from "../models/invite-modal"
import { MembersModal } from "../models/members-modal";
export const ModalProvider =()=>{

  const [hyd, setHyd] = useState(false);

  useEffect(() => {
    setHyd(true)
  },[])
  if(!hyd){
  return null;
  }
    return (
      <>
        <CreateServerModal />
        <InviteModal />
        <EditServerModal />
        <MembersModal />
      </>
    )
}
