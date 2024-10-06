import React from 'react'
import { GridBackgroundDemo } from './ui/Grid'
import { EmployerBento } from './ui/EmployerBento'
import EmployerGraphs from './ui/EmployerGraphs'
import { Spotlight } from './ui/Spotlight'
import EmployerTimeline from './ui/EmployerTimeline'

const EmployerHero = () => {
    return (
        <div className='pb-20 pt-10 w-full h-100vh'>
            <div>
                <Spotlight className='-top-40 -left-10 md:-left-32 md:-top-20 h-screen' fill='white' />
                <Spotlight className='top-10 left-full h-[80vh] w-[50vw]' fill='purple' />
                <Spotlight className='top-28 left-80 h-[80vh] w-[50vw]' fill='blue' />
            </div>
            <GridBackgroundDemo />
            <EmployerBento />
            <EmployerGraphs />
            <EmployerTimeline />
        </div>
    )
}

export default EmployerHero