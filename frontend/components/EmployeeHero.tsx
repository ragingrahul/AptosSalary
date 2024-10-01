import React from 'react'
import { Spotlight } from './ui/Spotlight'
import { GridBackgroundDemo } from './ui/Grid'
import EmployeeCardDetails from './EmployeeCardDetails'
import Timeline from './ui/Timeline'
import { paymentHistory } from '@/data'

const EmployeeHero = () => {
    return (
        <div className='pb-20 pt-10 w-full'>
            <div>
                <Spotlight className='-top-40 -left-10 md:-left-32 md:-top-20 h-screen' fill='white' />
                <Spotlight className='top-10 left-full h-[80vh] w-[50vw]' fill='purple' />
                <Spotlight className='top-28 left-80 h-[80vh] w-[50vw]' fill='blue' />
            </div>
            <GridBackgroundDemo />
            <EmployeeCardDetails />
            <Timeline items={paymentHistory}/>
        </div>
    )
}

export default EmployeeHero