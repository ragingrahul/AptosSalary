import React from 'react'
import { DataTableDemo } from './EmployeeTable'
import { AddOrgFunds } from '../AddOrgFunds'

const EmployerGraphs = () => {
    return (
        <div className="py-5">
            <div className="grid grid-cols-3 gap-10 md:gap-2 max-w-7xl mx-auto">
                <div
                    className="relative p-6 rounded-3xl overflow-hidden border border-[#846b8a] bg-[#181522] col-span-2"
                >
                    <DataTableDemo />
                </div>
                <div
                    className="relative p-6 rounded-3xl overflow-hidden border border-[#846b8a] bg-[#181522] col-span-1"
                >
                   <AddOrgFunds />
                </div>
                <div
                    className="relative p-6 my-3 rounded-3xl overflow-hidden border border-[#846b8a] bg-[#181522] col-span-3"
                >
                   <DataTableDemo />
                </div>
            </div>
        </div>
    )
}

export default EmployerGraphs