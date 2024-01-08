import React, { useEffect, useRef } from 'react'
import ns from '../assets/astraunots/not_supported_astro.svg'
import { motion, useInView, useAnimation } from 'framer-motion'


const Notsupported = () => {

    //animation hooks
    const ref = useRef(null)
    const mainControls = useAnimation()
    const isInView = useInView(ref, { once: false })

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible")
        } else {
            mainControls.start("hidden")
        }
    }, [mainControls, isInView])

    return (
        <div className='bg-black min-h-[100vh] overflow-hidden flex flex-col justify-center items-center gap-16'>

            <motion.div ref={ref}
                variants={{
                    hidden: { opacity: 0, y: -80 },
                    visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 1.5, delay: 0.25 }}
                className="main-image w-fit">
                <img src={ns} className='w-[28rem] mx-auto' alt="" />
            </motion.div>

            <motion.div animate={{ y: -50 }} className="information-wrapper text-white">
                <div className="main-heading text-center md:text-start text-7xl font-extrabold mx-auto ">
                    Oops 🥲!
                </div>
                <div className='text-xl font-semibold mt-5 text-center md:text-start'>
                    Your screen size is not supported for using <span className='bg-gradient-to-tr from-text_start to-text_end text-trans bg-clip-text'>variable</span>.
                    <div>Please switch to your laptop or desktop...</div>
                </div>
            </motion.div>

        </div>
    )
}

export default Notsupported
