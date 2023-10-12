"use client"
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveProduct } from '@/redux/features/productSlice'
import { useRouter } from 'next/navigation'

const AddProduct = () => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const dispatch = useDispatch()
    const router = useRouter()

    const createProduct = async (e) => {
        e.preventDefault()
        await dispatch(saveProduct({ title, price }))
        router.push("/")
    }

    return (
        <div className='w-full'>
            <form className='mt-5 shadow-md p-4 rounded-md' onSubmit={createProduct}>
                <div className='mb-2'>
                    <label className='block'>Title</label>
                    <input type="text" placeholder='title' className='border outline-none p-2 w-full'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='mb-2'>
                    <label className='block'>Price</label>
                    <input type="text" placeholder='price' className='border outline-none p-2 w-full'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div>
                    <button className='bg-blue-500 rounded-sm px-4 py-2 text-white text-xs'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct