import React from 'react'

type Props = {
    items: {
        date: string
        title: string
        description: string
    }[]
}

const Timeline: React.FC<Props> = ({ items }) => {
    return (
        <div className='flex justify-center relative my-2 z-10'>
            <div className='w-[650px] max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col bg-[#181522] border border-[#846b8a] rounded-lg p-5'>
                <h1 className='text-2xl font-bold mb-4'>
                    Payment History
                </h1>
                {items.map((item, index) => (
                    <div className={`relative  ${index != items.length-1 && `border-gray-700 border-s`}`}>
                        <div className={`relative  ${index != items.length - 1 && `border-gray-700 border-s`}`}>
                        <div className="h-[100px] ms-4">
                            <div className="absolute w-4 h-4 bg-gray-200 rounded-full -start-2 border border-white dark:border-gray-900 dark:bg-yellow-500"></div>
                            <div className='flex flex-row justify-between'>
                                <div className='flex flex-col'>
                                    <time className="mb-1 text-lg font-semibold leading-none text-gray-900 dark:text-white ">{item.date}</time>
                                    <h3 className="text-sm font-normal text-gray-400 dark:text-gray-500 ">{item.title}</h3>
                                </div>
                                <div className='flex font-bold text-lg'>
                                    +30 APT
                                </div>
                            </div>
                            {/* <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{item.description}</p> */}
                        </div>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Timeline