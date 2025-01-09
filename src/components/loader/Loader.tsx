
import React from 'react'
import LoadingIcon from './LoadingIcon'

interface LoaderProps {
  isLoading: boolean
}

export const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0000000d] bg-opacity-50 backdrop-blur-sm">
        <div className='flex flex-col items-center justify-center'>
            <LoadingIcon />
            <span className="text-[#36621F] font-semibold dark:text-[#3ecf8e]">Please wait...</span>
        </div>
    </div>
  )
}