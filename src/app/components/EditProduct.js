"use client"
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/redux/store'
import { getProduct, productSelector, updateProduct } from '@/redux/features/productSlice'
import { useParams, useRouter } from 'next/navigation'

const EditProduct = () => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const dispatch = useDispatch()
    const router = useRouter()
    const { slug } = useParams()

    const product = useAppSelector((state) => productSelector.selectById(state, slug))

    useEffect(() => {
        dispatch(getProduct())
    }, [dispatch])

    useEffect(() => {
        if (product) {
            setTitle(product.title)
            setPrice(product.price)
        }
    }, [product])

    const handleUpdate = async (e) => {
        e.preventDefault()
        await dispatch(updateProduct({ slug, title, price }))
        router.push("/")
    }

    return (
        <div className='w-full'>
            <form className='mt-5 shadow-md p-4 rounded-md' onSubmit={handleUpdate}>
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
                    <button className='bg-blue-500 rounded-sm px-4 py-2 text-white text-xs'>Update</button>
                </div>
            </form >
        </div >
    )
}

export default EditProduct