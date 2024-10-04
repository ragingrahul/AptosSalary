import React from 'react'
import { DataTableDemo } from './EmployeeTable'

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
                    Hello
                </div>
            </div>
        </div>
    )
}

export default EmployerGraphs