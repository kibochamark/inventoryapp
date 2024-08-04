"use server"

import axios from "axios";

type User={
    username:string;
    email:string;
    password:string;
} 

export async function handleSignUp(user:User){
    try{

        const res =await axios.post(process.env.BASE_URL! + "signup", {user})

        if(res.status === 201){
            return res.data
        }

        return null
    }catch(e:any){
        return e?.message
    }

}