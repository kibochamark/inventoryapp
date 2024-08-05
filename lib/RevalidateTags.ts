"use server"
import { revalidateTag } from "next/cache"



export const RevalidateTags= (name:string)=>{
    return revalidateTag(name)
}