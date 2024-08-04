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
import axios from 'axios'


const Clientsignup = () => {
    const router = useRouter()


    // setup our form initial values as well as validation schema
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmpassword:""
        },
        validationSchema: Yup.object().shape({
            username: Yup.string().max(7).required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6).max(8),
            confirmpassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required()
        }),
        onSubmit: async (values, formikHelpers) => {
            try {
                
                const res= await axios.post("https://inventory-apis.vercel.app/api/v1/" + "registeruser", {
                    username:values.username,
                    email:values.email,
                    password:values.password
                })
                if(res.status === 201){
                    toast.success(res.data?.message)
                    router.push("/auth/login")
                }else{
                    toast.error("unable to create user, try again later")
                }
            } catch (e: any) {
                toast.error(e?.message)

            }


        },

    })
    return (
        <>
            <form className="grid gap-4" method='POST' onSubmit={formik.handleSubmit}>
                <div className="grid gap-2">
                    <Label htmlFor="email">Username</Label>
                    {formik.touched.username && formik.errors.username && (
                        <p className='text-sm tracking-tight text-red-600 leading-tight'>{formik.errors.username}</p>
                    )}
                    <Input
                        id="username"
                        name='username'
                        type="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting}

                        placeholder=""
                        required
                    />
                </div>
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
                            <p className='text-sm tracking-tight text-red-600 leading-tight'>{formik.errors.password}</p>
                        )}
                    </div>
                    <Input id="password" type="password" name='password' onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting} required />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Confirm Password</Label>
                        {formik.touched.confirmpassword && formik.errors.confirmpassword && (
                            <p className='text-sm tracking-tight text-red-600 leading-tight'>{formik.errors.confirmpassword}</p>
                        )}
                    </div>
                    <Input id="confirmpassword" type="confirmpassword" name='confirmpassword' onChange={formik.handleChange}
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

export default Clientsignup
