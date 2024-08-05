"use client"
import React, { Suspense, useEffect } from 'react'
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
import { postCategory, postInventory, updateCategory } from '@/serveractions/inventoryactions'
import { RevalidateTags } from '@/lib/RevalidateTags'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { setEdit } from '@/redux/inventoryslices/inventoryslice'



const EditCategory = () => {
    // retireve redux states
    const isedit = useSelector((state:RootState)=> state.inventory.isedit)
    const page = useSelector((state:RootState)=> state.inventory.page)
    const editdata = useSelector((state:RootState)=> state.inventory.editdata)
    const dispatch = useDispatch()

    
    const router = useRouter()


    // setup our form initial values as well as validation schema
    const formik = useFormik({
        initialValues: {

            id:0,
            name: "",
            description: ""
            
        },
        validationSchema: Yup.object().shape({

            name: Yup.string().required().max(10),
            description: Yup.string().required(),
    
        }),
        onSubmit: async (values, formikHelpers) => {
            try {

                const res = await updateCategory({...values})
                console.log(res)

                if(res.error){
                    toast.error(res.error)
                }else{
                    RevalidateTags("categories")
                    RevalidateTags("dashboard")
                    RevalidateTags("stocklevel")
                    formik.resetForm()
                    toast.success("Category updated successfully")
                }

            } catch (e: any) {
                toast.error(e?.message)
            }
        },

    })

    
    // dynamically set update values from state
    useEffect(()=>{
        if(isedit && page==="category"){
            formik.setValues({
                id:editdata.id,
                name:editdata.name,
                description:editdata.description,
                
            })
        }
    },[isedit,page,editdata])


    return (
        <Dialog open={isedit && page==="category"} onOpenChange={()=>{
            dispatch(setEdit({
                isedit:false,
                page:"",
                editdata:{}
            }))

        }}>
            <DialogContent>
                <Suspense fallback="...loading">

                    <DialogHeader>

                        <DialogTitle>Update Category</DialogTitle>
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
                                        defaultValue={formik.values.name}
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
                                    <Input id="description" type="text" name='description' defaultValue={formik.values.description} onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        disabled={formik.isSubmitting} required />
                                </div>
                                <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
                                    Update category
                                </Button>

                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </Suspense>
            </DialogContent>
        </Dialog>

    )
}

export default EditCategory