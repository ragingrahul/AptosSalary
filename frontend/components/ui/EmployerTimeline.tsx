import React from 'react'
import { DataTableDemo } from './EmployeeTable'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu'
import { Button } from './button'
import { CheckIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'
import { RxCross2 } from 'react-icons/rx'

export type Employee = {
    address: string
    employeeName: string
    verified: boolean
    salary: number
    activity: string
    daysWorked: number
}

export type Event = {
    transactionId: string
    eventName: string
    eventTime: string
    status: string
}
const data: Event[] = [
    {
        transactionId:"6025078981",
        eventName:"PayoutMadeEvent",
        eventTime:"17 th Oct",
        status:"Success"
    },
    {
        transactionId:"60250789231",
        eventName:"PayoutMadeEvent",
        eventTime:"19 th Oct",
        status:"Success"
    },
    {
        transactionId:"6635078981",
        eventName:"PayoutMadeEvent",
        eventTime:"21 th Oct",
        status:"Success"
    }
]

// const data: Employee[] = [
//     {
//         address: "Ox583dbjsb9",
//         employeeName: "Rahul",
//         verified: false,
//         salary: 10,
//         activity: "Developer",
//         daysWorked: 1,
//     },
//     {
//         address: "Ox583dbjsb9",
//         employeeName: "Rahul",
//         verified: false,
//         salary: 10,
//         activity: "Developer",
//         daysWorked: 1,
//     },
//     // {
//     //     address: "Ox583dbjsb9",
//     //     employeeName: "Rahul",
//     //     verified: false,
//     //     salary: 10,
//     //     activity: "Developer",
//     //     daysWorked: 1,
//     // }
// ]
export const columns: ColumnDef<Event>[] = [
    {
        accessorKey: "transactionId",
        header: "Transaction Id",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("transactionId")}</div>
        ),
    },
    {
        accessorKey: "eventName",
        header: "Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("eventName")}</div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
        ),
    },
    {
        accessorKey: "eventTime",
        header: "Time",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("eventTime")}</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const event = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(event.transactionId)}
                        >
                            Copy event ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View event details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

// export const columns: ColumnDef<Employee>[] = [

//     {
//         accessorKey: "address",
//         header: "Address",
//         cell: ({ row }) => (
//             <div className="capitalize">{row.getValue("address")}</div>
//         ),
//     },
//     {
//         accessorKey: "employeeName",
//         header: "Name",
//         cell: ({ row }) => (
//             <div className="capitalize">{row.getValue("employeeName")}</div>
//         ),
//     },
//     {
//         accessorKey: "verified",
//         header: "Verified",
//         cell: ({ row }) => {
//             const verified = row.getValue("verified") as boolean
//             return (
//                 <div className="flex">
//                     {verified ? (
//                         <CheckIcon className="h-5 w-5 text-green-500" />
//                     ) : (
//                         <RxCross2 className="h-5 w-5 text-red-500" />
//                     )}
//                     <span className="ml-2 capitalize">
//                         {verified ? "Yes" : "No"}
//                     </span>
//                 </div>
//             )
//         },
//     },
//     {
//         accessorKey: "salary",
//         header: () => <div className="text-center">Salary</div>,
//         cell: ({ row }) => {
//             const amount = parseFloat(row.getValue("salary"))

//             // Format the amount as a dollar amount
//             // const formatted = new Intl.NumberFormat("en-US", {
//             //     style: "currency",
//             //     currency: "APT",
//             // }).format(amount)

//             return <div className="text-center font-medium">{amount}</div>
//         },
//     },
//     {
//         accessorKey: "activity",
//         header: () => <div className="text-center">Activity</div>,
//         cell: ({ row }) => (
//             <div className="capitalize text-center">{row.getValue("activity")}</div>
//         ),
//     },
//     {
//         accessorKey: "daysWorked",
//         header: () => <div className="text-center">Days Worked</div>,
//         cell: ({ row }) => (
//             <div className="capitalize text-center">{row.getValue("daysWorked")}</div>
//         ),
//     },
//     {
//         id: "actions",
//         enableHiding: false,
//         cell: ({ row }) => {
//             const employee = row.original

//             return (
//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" className="h-8 w-8 p-0">
//                             <span className="sr-only">Open menu</span>
//                             <DotsHorizontalIcon className="h-4 w-4" />
//                         </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                         <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                         <DropdownMenuItem
//                             onClick={() => navigator.clipboard.writeText(employee.address)}
//                         >
//                             Copy employee ID
//                         </DropdownMenuItem>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem>View customer</DropdownMenuItem>
//                         <DropdownMenuItem>View employee details</DropdownMenuItem>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             )
//         },
//     },
// ]

const EmployerTimeline = () => {
    return (
        <div>
            <div
                className="relative p-6 my-3 rounded-3xl overflow-hidden border border-[#846b8a] bg-[#181522] col-span-3"
            >
                <DataTableDemo data={data} columns={columns} />
            </div>
        </div>
    )
}

export default EmployerTimeline