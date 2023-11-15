import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import {v4 as uuidv4} from 'uuid';
export async function PATCH(
  req:Request,
  {params}: {params: {serverid: string}}
)
{
  try{
    const profile = await currentProfile();
    if(!profile) return new Response('Unauthorized', {status: 401});
    if(!params.serverid) return new Response('Server Id Missing', {status: 400});
    const server = await db.server.update({
      where:{
        id: params.serverid,
        profileId: profile.id
      },
      data:{
        inviteCode:uuidv4()
      }
      });
      return NextResponse.json(server)
  }
  catch(e){
    console.log
    return new NextResponse('Internal Error', {status: 500});
  }
}
