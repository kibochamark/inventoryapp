"use client"
import React, { Suspense } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { ArrowUpRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormik } from "formik"
import * as Yup from "yup"
import { signIn } from "next-auth/react"
import { redirect, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { postCategory, postInventory } from '@/serveractions/inventoryactions'
import { RevalidateTags } from '@/lib/RevalidateTags'



const AddCategory = () => {
    const router = useRouter()


    // setup our form initial values as well as validation schema
    const formik = useFormik({
        initialValues: {

            name: "",
            description: ""
            
        },
        validationSchema: Yup.object().shape({

            name: Yup.string().required().max(10),
            description: Yup.string().required(),
    
        }),
        onSubmit: async (values, formikHelpers) => {
            try {

                const res = await postCategory({...values})
                console.log(res)

                if(res.error){
                    toast.error(res.error)
                }else{
                    RevalidateTags("categories")
                    RevalidateTags("dashboard")
                    RevalidateTags("stocklevel")
                    formik.resetForm()
                    toast.success("Catgeory created successfully")
                }

            } catch (e: any) {
                toast.error(e?.message)
            }
        },

    })
    return (
        <Dialog>
            <DialogTrigger>
                <Button asChild size="sm" className="">
                    <p>
                        Add Category
                        <ArrowUpRight className="h-4 w-4" />
                    </p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <Suspense fallback="...loading">

                    <DialogHeader>

                        <DialogTitle>Add Category</DialogTitle>
                        <DialogDescription className='my-6'>
                            <form className="grid gap-4 my-4" method='POST' onSubmit={formik.handleSubmit}>
                                <div className="grid gap-2">
                                    <Label htmlFor="name mb-2">Name</Label>
                                    {formik.touched.name && formik.errors.name && (
                                        <p className='text-sm text-red-600 tracking-tight leading-tight'>{formik.errors.name}</p>
                                    )}
                                    <Input
                                        id="name"
                                        name='name'
                                        type="name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        disabled={formik.isSubmitting}

                                        placeholder=""
                                        required
                                    />
                                </div>
                              
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="description" className='mb-2'>description</Label>
                                        {formik.touched.description && formik.errors.description && (
                                            <p className='text-sm text-red-600 tracking-tight leading-tight'>{formik.errors.description}</p>
                                        )}
                                    </div>
                                    <Input id="description" type="text" name='description' onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        disabled={formik.isSubmitting} required />
                                </div>
                                <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
                                    create category
                                </Button>

                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </Suspense>
            </DialogContent>
        </Dialog>

    )
}

export default AddCategory