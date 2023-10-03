'use client'

import { useEffect, useState } from "react";
import { CreateServerModal } from "../models/create-server-model"

export const ModalProvider =()=>{

  const [hyd, setHyd] = useState(false);

  useEffect(() => {
    setHyd(true)
  },[])
  if(!hyd) 
  return null;
    return (
      <>
        <CreateServerModal />
      </>
    )
}




