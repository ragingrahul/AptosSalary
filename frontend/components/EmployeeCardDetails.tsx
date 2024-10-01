import React from 'react'
import Timeline from './ui/Timeline'

const EmployeeCardDetails = () => {
    return (
        <div className='flex justify-center relative mt-20 mb-2 z-10'>
            <div className='w-[650px] max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center  border border-white/[0.2] rounded-lg p-5'>
                <div className='w-full flex flex-row justify-between'>
                    <h1>
                        Software Subscriptions
                    </h1>
                    <h4>
                        Manage
                    </h4>
                </div>
                <div className='w-full flex flex-col md:flex-row justify-between items-center my-6 p-4 rounded-lg bg-[#36324c9b]'>
                    <div className='flex flex-col'>
                        <div className="w-[176px] rounded-lg  bg-purple my-2" >
                            <div className="h-28 w-44 flex justify-center items-center">
                                <span className="text-gray-400" />
                            </div>
                        </div>
                        <p className='text-md font-bold'>
                            Sales department Card
                        </p>
                    </div>
                    <div className='flex flex-col justify-around w-[300px] p-2'>
                        <div className="flex justify-between">
                            <span className="font-semibold text-white-100 ">Type</span>
                            <span className="">Virtual</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-semibold text-white-100 ">Card Number</span>
                            <span className="">5103 9335 5847 7086</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-semibold text-white-100 ">Exp. date</span>
                            <span className="">10 / 2028</span>
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
                            <span className="font-normal text-white-100 ">Received this month</span>
                            <span className="text-4xl my-2">$1,454.26</span>
                        </div>
                        <div className="flex flex-col justify-between items-center md:items-start w-1/2 md:w-full">
                            <span className="font-normal text-white-100 ">Total Amount</span>
                            <span className="text-4xl my-2">$1,600.00</span>
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