"use client"
import React from 'react'
import { useAppSelector } from '@/redux/store'
import { getProduct, productSelector, deleteProduct } from '@/redux/features/productSlice'
import { useDispatch } from 'react-redux/'
import { useEffect } from 'react'
import Link from 'next/link'

const ShowProduct = () => {
    const dispatch = useDispatch()
    const products = useAppSelector(productSelector.selectAll)

    useEffect(() => {
        dispatch(getProduct())
    }, [dispatch])

    return (
        <div className='box mt-5'>
            <Link href={"add"}>Add New</Link>
            <table className='table-auto'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>
                                <Link href={`edit/${product.id}`}><button className='bg-blue-500'>Edit</button></Link>
                                <button onClick={() => dispatch(deleteProduct(product.id))} className='bg-red-500'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ShowProduct