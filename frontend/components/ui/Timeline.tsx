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
            <div className='w-[650px] max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col border border-white/[0.1] rounded-lg p-5'>
                <h1 className='text-2xl font-bold mb-4'>
                    Payment History
                </h1>
                {items.map((item, index) => (
                    <div className={`relative  ${index != items.length-1 && `border-gray-700 border-s`}`}>
                        <div className="h-[100px] ms-4">
                            <div className="absolute w-4 h-4 bg-gray-200 rounded-full -start-2 border border-white dark:border-gray-900 dark:bg-yellow-500"></div>
                            <time className="mb-1 text-xl font-normal leading-none text-gray-400 dark:text-gray-500">{item.date}</time>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                            {/* <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{item.description}</p> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Timeline