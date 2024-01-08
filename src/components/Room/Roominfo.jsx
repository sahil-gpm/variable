import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import hanging_astro from '../../assets/astraunots/hanging_astro.svg'
import arrow from '../../assets/icons/arrow-white.png'
import { funcContext } from '../../contexts/context'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';
import Button from '../../helpers/Button';
import { motion, useInView, useAnimation } from 'framer-motion'
import Loader from '../../helpers/Loader';

const Roominfo = () => {

    //context to import required functions
    const { showToast, socketRef, userData } = useContext(funcContext);
    //use location to get the usenavigate data 
    const location = useLocation()
    //use navigate
    const navigate = useNavigate("/")
    //animation hooks
    const ref = useRef(null)
    const mainControls = useAnimation()
    const isInView = useInView(ref, { once: false })

    const [loading,setLoading] = useState(false)


    //local functions here 
    //create a new room if the code is not used before
    const connectToRoom = useCallback(async () => {
        //setting the data and url to be hot
        const roomUrl = location.state.roomExist ? process.env.REACT_APP_JOIN_ROOM :
            process.env.REACT_APP_CREATE_ROOM
        const dataToPass = location.state.roomExist ?
            {
                userSocketId: socketRef.current.id,
                roomCode: location.state.roomCode,
                memberName: location.state.name,
                memberEmail: location.state.email
            } :
            {
                hostSocketId: socketRef.current.id,
                hostName: location.state.name,
                hostEmail: location.state.email,
                roomCode: location.state.roomCode
            }
        //after selecting the url and data just hit the backend with appropriate url and data

        setLoading(true)

        await axios.post(roomUrl, dataToPass).then((response) => {
            console.log(response.data);
            if (response.data.success) {
                navigate("/room/coding-area/" + location.state.roomCode, { state: { hostEmail: location.state.roomDetails?.hostemail || null, memberName: location.state.name } })
            } else {
                showToast("Failed to join the room", "❌", '#262625', 12, "white")
            }
        }).catch(() => {
            showToast("Some error occurred", "❌", '#262625', 12, "white")
        })

        setLoading(false)

    }, [location.state, showToast, navigate, socketRef])


    useEffect(() => {
        window.addEventListener('popstate', () => {
            navigate("/room/enter-room")
        })
        if (isInView) {
            mainControls.start("visible")
            return
        }
    }, [navigate, location, userData, isInView, mainControls])


    return (
        <div className='text-center flex flex-col items-center justify-center overflow-hidden h-[100vh] bg-black font-bold text-white'>

            {loading && <Loader label={"Joining the room"}/>}

            <motion.img ref={ref}
                variants={{
                    hidden: { opacity: 0, y: -80 },
                    visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.7, delay: 0.25 }}
                src={hanging_astro}
                className='w-[26%] xl:w-[23%] rounded-full mt-3' alt="" />


            <motion.div className="main-heading-wrapper text-4xl xl:text-5xl font-extrabold mt-4"
                ref={ref}
                variants={{
                    hidden: { opacity: 0, y: 80 },
                    visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 1.35, delay: 0.25 }}>
                Continue to join this room ?
            </motion.div>

            {
                location.state.roomDetails !== null && <motion.div ref={ref}
                    variants={{
                        hidden: { opacity: 0, y: 80 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    initial="hidden"
                    animate={mainControls}
                    transition={{ duration: 0.7, delay: 0.45 }} > <div className="roomhost mt-6">
                        Room host : <span className="room-host bg-gradient-to-r from-text_start to-text_end text-trans bg-clip-text capitalize text-lg">{location.state.roomDetails?.hostname}</span>
                    </div>
                    {
                        location.state.roomDetails?.members.length > 1 && <div className="previos-existing-members mt-6">
                            <div>Members :</div>
                            <div className="members flex justify-center items-center text-md gap-2 mt-3 text-white">
                                {location.state.roomDetails?.members.map((m, i) => {
                                    return (
                                        <div key={i}>
                                            <Avatar name={m.memberName} size='50' round={true} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    }
                </motion.div>
            }

            {
                location.state.roomDetails === null && <motion.div ref={ref}
                    variants={{
                        hidden: { opacity: 0, y: 80 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    initial="hidden"
                    animate={mainControls}
                    transition={{ duration: 0.7, delay: 0.65 }} className='mt-5'>You are creating a ⭐️ new code room with no members ❌</motion.div>
            }

            <motion.div
                ref={ref}
                variants={{
                    hidden: { opacity: 0, y: 80 },
                    visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.7, delay: 0.7 }} className="button-ctrls mt-10 flex justify-center gap-4">
                <Button text={"Join"} gradient={true} icon={arrow} iconwidth={15} width={130} padding={10} borderRadius={30} onClick={connectToRoom} />
                <Button text={"⬅ Back"} backgroundColor={"red"} width={130} padding={10} borderRadius={30} onClick={() => {
                    navigate("/")
                }} />
            </motion.div>
        </div>
    )
}
export default Roominfo