import React from 'react'

const SuccessMsg = ({message}) => {
  return (
    <>
      <div className='max-w-xl absolute inset-0 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-300 rounded-md'>
                <div className='flex justify-center items-center h-full'>
                    <p className='font-semibold text-xl'>
                        {message}
                    </p>
                </div>
            </div>
    </>
  )
}

export default SuccessMsg
