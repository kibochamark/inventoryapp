import Clientlogin from "@/components/login/clientlogin"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"


function page() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">

      <div className="flex flex-col items-center justify-center py-12">
        <div>
          <Image src={"/logo.png"} width={200} height={200} alt="" />
        </div>

        <div className="mx-auto grid w-[350px] gap-6">

          <div className="grid gap-2 text-center ">
            <h1 className="text-3xl font-bold">Welcome Back 👋</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <Suspense fallback="...">
            <Clientlogin />
          </Suspense>


          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-muted">
        <Image
          src="/login.jpg"
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