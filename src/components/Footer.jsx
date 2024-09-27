import React from 'react'

const Footer = () => {
    return (
        // Footer
        <div className='w-full h-[9.5vh] bg-slate-700 text-white flex items-center justify-around mx-50px' >
            <div className="logo flex items-center justify-center mx-5 cursor-pointer font-bold text-2xl ">
                <span className='text-green-700 font-bold text-xl'>&lt;</span>
                <span>Pass</span>
                <span className=' text-green-700'>OP</span>
                <span className='text-green-700 font-bold text-xl'>/&gt;</span>
            </div>
            <div className="tag flex items-center justify-center ">
                <p className='font-["roboto-mono"] text-xs md:text-base'>Password Managing Project Using React    <a href="https://github.com/Abhishektelgave" target='_blank'>@abhishektelgave | GitHub </a> from <span> Abhishek Telgave</span></p>
            </div>
        </div>
    )
}

export default Footer
