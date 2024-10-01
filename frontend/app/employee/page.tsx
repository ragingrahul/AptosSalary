import EmployeeHero from '@/components/EmployeeHero'
import { NavbarDemo } from '@/components/ui/NavBar'
import React from 'react'

const Employee = () => {
  return (
    <div className='w-full'>
        <NavbarDemo />
        <EmployeeHero />
    </div>
  )
}

export default Employee