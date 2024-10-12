import React, { useEffect, useState } from 'react'
import { Spotlight } from './ui/Spotlight'
import { GridBackgroundDemo } from './ui/Grid'
import EmployeeCardDetails from './EmployeeCardDetails'
import Timeline from './ui/Timeline'
import { paymentHistory } from '@/data'
import { Employee } from '@/state/types'
import { fetchEmployeeMove } from '@/services/read-services'
import { useWallet } from '@aptos-labs/wallet-adapter-react'

const EmployeeHero = () => {
    const [employeeInfo, setEmployeeInfo] = useState<Employee | undefined>(undefined);
    const { account, submitTransaction } = useWallet()

    useEffect(() => {
        async function fetchData() {
            if (account) {
                try {
                    fetchEmployeeMove(account.address).then((employee) => {
                        setEmployeeInfo(employee)
                        console.log(employee)
                    })
                } catch (error) {
                    console.error(error)
                }
            }
        }
        fetchData()
    }, [account])

    if (!employeeInfo) {
        return null
    }

    return (
        <div className='pb-20 pt-10 w-full'>
            <div>
                <Spotlight className='-top-40 -left-10 md:-left-32 md:-top-20 h-screen' fill='white' />
                <Spotlight className='top-10 left-full h-[80vh] w-[50vw]' fill='purple' />
                <Spotlight className='top-28 left-80 h-[80vh] w-[50vw]' fill='blue' />
            </div>
            <GridBackgroundDemo />
            <EmployeeCardDetails employee={employeeInfo}/>
            <Timeline employeeInfo={employeeInfo} items={paymentHistory} />
        </div>
    )
}

export default EmployeeHero