import React, { useContext, useState } from 'react'
import Button from '../../helpers/Button'
import { funcContext } from '../../contexts/context'
import axios from 'axios'

const Changeusernamemodal = ({ onCancel, text }) => {

    const {showToast,userData} = useContext(funcContext)
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [loading,setLoading] = useState(false)

    const onContinueUserName = async () => {
        setLoading(true)
        if (!firstname.trim() || !lastname.trim()) {
            showToast("Mention the required fields", "❌", '#262625', 12, "white")
            return;
        }
        await axios.post(process.env.REACT_APP_UPDATE_USERNAME, { firstName:firstname, lastName: lastname, email: userData.email }).then((response) => {
            showToast("Username updated", "✅", '#262625', 12, "white")
        }).catch(() => {
            showToast("Failed to update username", "❌", '#262625', 12, "white")
        })
        setLoading(false)
        onCancel()
    }

    return (
        <div className='logout-modal-wrapper p-10 rounded-3xl shadow-theme w-fit bg-black'>

            <div className="heading text-white text-3xl text-center font-extrabold">
                {text}
            </div>

            <div className='inputs mt-12'>
                <input type="text" value={firstname} onChange={(e) => setFirstName(e.target.value)} className='bg-sub text-white outline-none px-5 py-2 rounded-md w-full' placeholder='Enter firstname' />
                <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} className='bg-sub text-white outline-none px-5 py-2 rounded-md w-full mt-4' placeholder='Enter lastname' />
            </div>

            <div className="btn-choices flex justify-center items-center gap-5 mt-12">
                <Button onClick={onContinueUserName} text={loading ? "Updating" : "Continue"} textColor={"white"} gradient={true} width={130} borderRadius={10} padding={10} />
                <Button onClick={onCancel} text={"Cancel"} textColor={"white"} backgroundColor={"red"} width={130} borderRadius={10} padding={10} />
            </div>

        </div>
    )
}

export default Changeusernamemodal
