import React, { useContext, useRef, useState } from 'react'
import Intro from './Intro'
import Illustration from './Illustration'
import Footer from './Footer'
import Button from '../../helpers/Button'
import arrow from '../../assets/icons/arrow-white.png'
import logout from '../../assets/icons/logout.png'
import { Link } from 'react-router-dom'
import { funcContext } from '../../contexts/context'
import Logoutmodal from '../Modal/Logoutmodal'
import { motion } from 'framer-motion'

const Home = () => {

  //fetching the token from context
  const { token, setToken, showToast } = useContext(funcContext)
  

  const constraintRef = useRef()

  //state for logout
  const [poplogout, setPopLogout] = useState(false)

  //local methods/functions 

  const onContinue = () => {
    setToken("") //setting token to null 
    localStorage.setItem("variable-authtoken", "") //clearing localstorage as well
    setPopLogout(false)
    showToast("Logged out successfully", "✅", '#262625', 12, "white")
  }

  const onCancel = () => {
    setPopLogout(false)
  }

  return (

    <div className='bg-black' ref={constraintRef}>
      {token &&
        <motion.div className='absolute top-8 right-8 flex justify-between gap-5 items-center'
          animate={{ decelerate: true, y: -5 }}>
          <Button text={"Logout"}
            textColor={"white"}
            gradient={true}
            icon={logout}
            iconwidth={14}
            width={120}
            padding={5}
            borderRadius={40}
            onClick={() => setPopLogout(!poplogout)} />

          <Link to={"/auth/user-profile"} className="profile-navigator">
            <Button
              text={"Profile"}
              textColor={"white"}
              border={"1px solid white"}
              icon={arrow}
              iconwidth={14}
              width={120}
              padding={5}
              borderRadius={40}
            />
          </Link>
        </motion.div>
      }

      {!token &&
        <motion.div className='absolute top-8 right-8 flex justify-between gap-5 items-center'
          animate={{ decelerate: true, y: -5 }}>
          <Link to={"/auth/log-into-account"} className="login-navigator">
            <Button
              text={"Login"}
              textColor={"white"}
              icon={logout}
              gradient={true}
              iconwidth={14}
              width={120}
              padding={5}
              borderRadius={40}
            />
          </Link>
        </motion.div>
      }

      {/* logout popup to be shown  */}
      {poplogout && <motion.div drag dragConstraints={constraintRef} className='absolute top-12 right-10' animate={{ y: 50 }} ><Logoutmodal
        text={"Sure to continue logout ?"}
        onContinue={onContinue}
        onCancel={onCancel} />
      </motion.div>}

      <Intro />
      <Illustration />
      <Footer />
    </div>
  )
}

export default Home
