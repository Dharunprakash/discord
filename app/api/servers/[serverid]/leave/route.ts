import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
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
        profileId:{ not:profile.id},
        members:{
        some:{
          profileId:profile.id
        }
      }
      },
      data:{
        members:{
          deleteMany:{
            profileId:profile.id
          }
        }
      }
    });
    
    return NextResponse.json(server)
  }
  catch(e){
    console.log(e)
    return new NextResponse('Internal Error', {status: 500});
  }
}
