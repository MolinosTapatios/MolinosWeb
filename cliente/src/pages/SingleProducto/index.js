import React from "react"
import { useParams } from "react-router-dom"
import './index.css'

export default function SingleProducto() {

    const { name } = useParams() 

    console.log(name)

    return(
        <>
            <div className="single-product">

            </div>
        </>
    )    
}
