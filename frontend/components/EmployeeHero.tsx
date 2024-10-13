import React, { useEffect, useState } from 'react'
import { Spotlight } from './ui/Spotlight'
import { GridBackgroundDemo } from './ui/Grid'
import EmployeeCardDetails from './EmployeeCardDetails'
import Timeline from './ui/Timeline'
import { paymentHistory } from '@/data'
import { Employee } from '@/state/types'
import { fetchEmployeeIsVerified, fetchEmployeeMove } from '@/services/read-services'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { useToast } from '@/hooks/use-toast'
import { setRole } from '@/state/app'
import { useAppDispatch } from '@/state/hooks'

const EmployeeHero = () => {
    const dispatch = useAppDispatch()
    const [employeeInfo, setEmployeeInfo] = useState<Employee | undefined>(undefined)
    const { account, wallets, disconnect } = useWallet()
    const {toast} = useToast()

    useEffect(() => {
        async function fetchData() {
            if (account) {
                try {
                    const isVerified= await fetchEmployeeIsVerified(account.address); 
                    fetchEmployeeMove(account.address).then((employee) => {
                        employee.verified=isVerified.verified as boolean;
                        setEmployeeInfo(employee)
                        console.log(employee)
                    })
                } catch (error) {
                    toast({
                        variant: "destructive",
                        title: "Employee Not Found",
                        description: "Your Address is not registered as an employee",
                        duration:3000
                    }) 
                    

                    const wallet = wallets?.[0];
                    if (wallet) {
                        // Delay the disconnect by 3000 milliseconds
                        setTimeout(() => {
                            dispatch(setRole('nill'));
                            disconnect();
                        }, 3000); // 3000 milliseconds = 3 seconds
                    }
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