import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Clientsignup from "@/components/Signup/Clientsignup"
import { Suspense } from "react"

function page() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">

      <div className="flex flex-col items-center justify-center py-4">
        <div>
          <Image src={"/logo.png"} width={150} height={150} alt="" />
        </div>
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign up</h1>
            <p className="text-balance text-muted-foreground">
              Fill in the credentials below to create your account
            </p>
          </div>
          <Suspense fallback="...">
          <Clientsignup />
          </Suspense>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-muted block order-1">
        <Image
          src="/signup.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}



export default page