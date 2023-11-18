import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function DELETE(
  req:Request,
  {params}: {params: {serverid: string}}
)
{
  try{
    const profile = await currentProfile();
    if(!profile){
      return new NextResponse('Unauthorized', {status: 401});
    }
    const server = await db.server.delete({
      where: {id: params.serverid},
    });
    return NextResponse.json(server);
  }catch(err){
    console.log(err);
    return new NextResponse('Internal Error', {status: 500});
  }
}
export async function PATCH(
  req:Request,
  {params}: {params: {serverid: string}}
)
{
  try{
    const profile = await currentProfile();
    const {name,imageUrl}=await req.json();
    if(!profile){
      return new NextResponse('Unauthorized', {status: 401});
    }
    const server = await db.server.update({
      where: {id: params.serverid},
      data: {name,imageUrl},
    });
    return NextResponse.json(server);
  }catch(err){
    console.log(err);
    return new NextResponse('Internal Error', {status: 500});
  }
}