import React from 'react'

function Fallback() {
  return (
    <>
    <div className="flex items-center justify-center h-screen " style={{backgroundColor:"black"}}>
    <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200" ></div>
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-red-600 animate-spin">
        </div>
        
    </div>
</div>






    </>
  )
}

export default Fallback
