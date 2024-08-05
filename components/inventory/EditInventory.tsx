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
import { postInventory, updateInventory } from '@/serveractions/inventoryactions'
import { RevalidateTags } from '@/lib/RevalidateTags'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { setEdit } from '@/redux/inventoryslices/inventoryslice'



const EditInventory = ({ categories }: { categories: any }) => {

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
            description: "",
            price: "",
            quantity: 0,
            categoryid: "",
        },
        validationSchema: Yup.object().shape({

            name: Yup.string().required(),
            description: Yup.string().required(),
            price: Yup.number().required(),
            quantity: Yup.number().required(),
            categoryid: Yup.string().required(),
        }),
        onSubmit: async (values, formikHelpers) => {
            try {

                const res = await updateInventory({...values})

                if(res.error){
                    toast.error(res.error)
                }else{
                    RevalidateTags("inventories")
                    RevalidateTags("dashboard")
                    RevalidateTags("stocklevel")
                    toast.success("inventory updated successfully")
                }

            } catch (e: any) {
                toast.error(e?.message)
            }
        },

    })


    // dynamically set update values from state
    useEffect(()=>{
        if(isedit && page==="inventory"){
            formik.setValues({
                id:editdata.id,
                name:editdata.name,
                description:editdata.description,
                price:editdata.price,
                quantity:editdata.quantity,
                categoryid:editdata.category_id
            })
        }
    },[isedit,page,editdata])


    console.log(isedit,page,editdata)


    return (
        <Dialog open={isedit && page==="inventory"} onOpenChange={()=>{
            dispatch(setEdit({
                isedit:false,
                page:"",
                editdata:{}
            }))

        }}>
           
            <DialogContent>
                <Suspense fallback="...loading">

                    <DialogHeader>

                        <DialogTitle>Update product</DialogTitle>
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
                                    <Label htmlFor="price mb-2">Price</Label>
                                    {formik.touched.price && formik.errors.price && (
                                        <p className='text-sm text-red-600 tracking-tight leading-tight'>{formik.errors.price}</p>
                                    )}
                                    <Input
                                        id="price"
                                        name='price'
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        disabled={formik.isSubmitting}
                                        defaultValue={formik.values.price}
                                        placeholder=""
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="quantity mb-2">Quantity</Label>
                                    {formik.touched.quantity && formik.errors.quantity && (
                                        <p className='text-sm text-red-600 tracking-tight leading-tight'>{formik.errors.quantity}</p>
                                    )}
                                    <Input
                                        id="quantity"
                                        name='quantity'
                                        type="number"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        disabled={formik.isSubmitting}
                                        defaultValue={formik.values.quantity}
                                        placeholder=""
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="categoryid mb-2">Category</Label>
                                    {formik.touched.categoryid && formik.errors.categoryid && (
                                        <p className='text-sm text-red-600 tracking-tight leading-tight'>{formik.errors.categoryid}</p>
                                    )}
                                    <select  id="categoryid" name='categoryid' defaultValue={formik.values.categoryid} onChange={formik.handleChange} onBlur={formik.handleBlur} disabled={formik.isSubmitting} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="">select category</option>
                                        {categories?.map((cat: any, idx: number) => (
                                            <option key={idx} value={cat.id}>{cat.name}</option>
                                        ))}

                                    </select>



                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="description" className='mb-2'>description</Label>
                                        {formik.touched.description && formik.errors.description && (
                                            <p className='text-sm text-red-600 tracking-tight leading-tight'>{formik.errors.description}</p>
                                        )}
                                    </div>
                                    <Input id="description" defaultValue={formik.values.description} type="text" name='description' onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        disabled={formik.isSubmitting} required />
                                </div>
                                <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
                                    update product
                                </Button>

                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </Suspense>
            </DialogContent>
        </Dialog>

    )
}

export default EditInventory