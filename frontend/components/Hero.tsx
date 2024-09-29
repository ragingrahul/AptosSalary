import React from 'react'
import { Spotlight } from './ui/Spotlight'
import { GridBackgroundDemo } from './ui/Grid'

const Hero = () => {
  return (
    <div className='pb-20 pt-36'>
        <div>
            <Spotlight  className='-top-40 -left-10 md:-left-32 md:-top-20 h-screen' fill='white'/>
            <Spotlight  className='top-10 left-full h-[80vh] w-[50vw]' fill='purple'/>
            <Spotlight  className='top-28 left-80 h-[80vh] w-[50vw]' fill='blue'/>
        </div>
        <GridBackgroundDemo />
        <div className='flex justify-center relative my-20 z-10'>
            <div className='max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center'>
                <h2 className='uppercase tracking-widest text-xs text-center text-blue-100 max-w-100'>
                    Streamlining payroll with precision and ease.
                </h2>
            </div>

        </div>
    </div>
  )
}

export default Hero