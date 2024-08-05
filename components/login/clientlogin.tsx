"use client"
import React from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormik } from "formik"
import * as Yup from "yup"
import { signIn } from "next-auth/react"
import { redirect, useRouter } from 'next/navigation'
import { AuthError } from 'next-auth'
import { toast } from 'sonner'

const Clientlogin = () => {


    const router = useRouter()


    // setup our form initial values as well as validation schema
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema:Yup.object().shape({
            email:Yup.string().email().required(),
            password:Yup.string().min(6).max(8)
        }),
        onSubmit: async (values, formikHelpers) => {
            try {
                await signIn("credentials", { redirect: false, ...values }).then((data) => {
                    console.log(data, data?.error && data.error.length > 0)
                    if (data?.error && data.error.length > 0) {
                        toast.error("Invalid credentials or user does not exist")
                    } else {
                        toast.success("welcome back")
                        router.push("/dashboard")
                    }

                    

                }).catch((e) => {
                    console.log(e)
                    toast.error("error")

                })
            } catch (e: any) {
                toast.error(e?.message)

            }


        },

    })
    return (
        <>
            <form className="grid gap-4" method='POST' onSubmit={formik.handleSubmit}>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    {formik.touched.email && formik.errors.email && (
                        <p className='text-sm text-red-600 tracking-tight leading-tight'>{formik.errors.email}</p>
                    )}
                    <Input
                        id="email"
                        name='email'
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting}

                        placeholder="m@example.com"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        {formik.touched.password && formik.errors.password && (
                        <p className='text-sm text-red-600 tracking-tight leading-tight'>{formik.errors.password}</p>
                    )}
                    </div>
                    <Input id="password" type="password" name='password' onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting} required />
                </div>
                <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
                    Login
                </Button>

            </form>
        </>
    )
}

export default Clientlogin
