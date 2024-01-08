import React from 'react'
import { MoonLoader } from 'react-spinners'

const Loader = ({label}) => {
    return (
        <div className='my-1 mx-auto flex flex-col items-center'>
            <MoonLoader
                color="#f200b0"
                size={32}
                speedMultiplier={0.8}
            />
            <div className='text-center text-white font-semibold mt-6'>{label}</div>
        </div>
    )
}

export default Loader
