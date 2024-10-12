import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { VerifyEmployee } from './ui/VerifyEmployee'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { Employee } from '@/state/types'
import { getUserByAddress } from '@/api/api'
import { formatAddress } from '@/utils/helper'


type User = {
    address: string
    job_title: string
    name: string
  }

type EmployeeProp = {
    employee: Employee
}
const EmployeeCardDetails = ({employee}:EmployeeProp) => {
    const {account} = useWallet();
    //const [employee,setEmployee] = useState<User>();

    // useEffect(()=>{
    //     const fetchEmployeeDetails = async () =>{
    //         if(account){
    //             console.log(account.address)
    //             const employeeDetails = await getUserByAddress(account?.address)
    //             setEmployee(employeeDetails)
    //             console.log(employeeDetails)
    //             //console.log("From state",employee)
    //         }
    //     }
    //     fetchEmployeeDetails()
    // },[account])

    // useEffect(() => {
    //     if (employee) {
    //         console.log("From state", employee);
    //     }
    // }, [employee]);
    

    return (
        <div className='flex justify-center relative mt-20 mb-2 z-10'>
            <div className='w-[650px] max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center bg-[#181522] border border-[#846b8a] rounded-lg p-5'>
                <div className='w-full flex flex-row justify-between'>
                    <h1 className='text-xl font-bold text-purple'>
                        Employee Card
                    </h1>
                    <VerifyEmployee />
                </div>
                <div className='w-full flex flex-col md:flex-row justify-between items-center my-6 p-4 rounded-lg bg-[#36324c9b]'>
                    <div className='flex flex-col'>
                        <div className="w-[176px] rounded-lg  bg-purple my-2" >
                            <div className="h-28 w-44 flex justify-end items-end">
                                <Image src="/aptos-white.png" alt='card chip' width={30} height={60} className='m-4' />
                            </div>
                        </div>
                        <p className='text-md font-bold'>
                           Salary Card
                        </p>
                    </div>
                    <div className='flex flex-col justify-around w-[300px] p-2 gap-3'>
                        <div className="flex justify-between">
                            <span className="font-semibold text-white-100 ">Name</span>
                            {employee && <span className="font-bold">{employee?.employeeName}</span>}
                        </div>

                        <div className="flex justify-between">
                            <span className="font-semibold text-white-100 ">Address</span>
                            {employee && <span className="font-bold">{formatAddress(employee?.address)}</span>}
                        </div>

                        <div className="flex justify-between">
                            <span className="font-semibold text-white-100 ">Role</span>
                            {employee && <span className="font-bold">{employee?.activity}</span>}
                        </div>

                        <div className="flex justify-between">
                            <span className="font-semibold text-white-100 ">CVV</span>
                            <span className="">****</span>
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    <div className='flex flex-col md:flex-row items-center  w-full my-2'>
                        <div className="flex flex-col justify-between items-center md:items-start w-1/2 md:w-full">
                            <span className="font-semibold text-[#ffba96] ">Received this month</span>
                            <span className="text-4xl my-2 font-extrabold">$1,454.26</span>
                        </div>
                        <div className="flex flex-col justify-between items-center md:items-start w-1/2 md:w-full">
                            <span className="font-semibold text-[#ffba96] ">Total Amount</span>
                            <span className="text-4xl my-2 font-extrabold">$1,600.00</span>
                        </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-blue-600 h-2.5 rounded-full w-[85%]"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeCardDetails