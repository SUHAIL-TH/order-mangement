import React, { useEffect, useState } from 'react'
import Home from "../pages/Login"


function Checking() {

    const [counter , setCounter]=useState(0)
    const incremtncount =()=> setCounter(prvevalue=>prvevalue+1)
    const decrement =()=>setCounter(prvevalue=>prvevalue-1)

    useEffect(()=>{
      console.log("hii suhail ")
      const fetchdata= async(req,res)=>{
        try {
          
          
        } catch (error) {
            console.log(error)
        }
      }

      fetchdata()
    },[counter])
  return (
    <>
  
    <small>
        hi suhail how are your
    </small>
    <div>counter</div>
    <div>
        <small>ccurrent count: {counter}</small>
       
    </div>
    <button type="button" onClick={()=>set} className='text-white bg-black'>hello</button>
    <button type="button" onClick={incremtncount} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">+</button>
    <button type="button" onClick={()=>setCounter(prev=>prev-1)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">-</button>
    </>
  )
}

export default Checking