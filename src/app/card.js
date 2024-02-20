import React from 'react'

function CardOne({title,icon}) {
  return (
    <div className='p-4 rounded-xl flex flex-col justify-center items-center shadow-[0_0px_10px_0px_rgba(0,130,140,0.3)] hover:bg-black hover:text-white'>
      
    <div className=''>
    {icon}
    </div>
    <div className='text-md'>
            {title}
    </div>
    </div>
  )
}

export default CardOne