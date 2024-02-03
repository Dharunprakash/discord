'use client'

import { useEffect, useState } from "react";
import { CreateServerModal} from "../models/create-server-modal"
import { EditServerModal } from "../models/edit-server-modal";
import {InviteModal} from "../models/invite-modal"
import { MembersModal } from "../models/members-modal";
import { CreateChannelModal } from "../models/create-channel-modal";
import { LeaveServerModal } from "../models/leave-server-modal";
import { DeleteServerModal } from "../models/delete-server-modal";
import { DeleteChannelModal } from "../models/delete-channel-modal";
import { EditChannelModal } from "../models/edit-channel-modal";
import { MessageFileModal } from "../models/message-file-modal";
import { DeleteMessageModal } from "../models/delete-message-modal";
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
        <CreateChannelModal />
        <LeaveServerModal />
        <DeleteServerModal />
        <DeleteChannelModal />
        <EditChannelModal />
        <MessageFileModal />
        <DeleteMessageModal />
      </>
    )
}
