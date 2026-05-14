import React from 'react'

interface ContainerProps {
    children: React.ReactNode
}

const Container = ({children}: ContainerProps) => {
  return (
    <div className='flex flex-1 w-full max-w-4xl flex-col items-center justify-between m-auto px-8 sm:px-14 lg:px-0'>
      {children}
    </div>
  )
}

export default Container
