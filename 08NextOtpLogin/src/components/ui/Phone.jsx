"use client";
import { useState } from "react";

import OtpInput from './OtpInput'


export default function Phone() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false)
    const [showOutput, setShowOutput] = useState(null)

    const handlePhoneNumber = (e) => {
        setPhoneNumber(e.target.value)
    }

    const handlePhoneSubmit = (e) => {
        e.preventDefault()

        // Phone Validations
        const regex = /[^0-9]/g;
        if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
            return
        }
        setShowOtpInput(true)

    }

    const onOtpSubmit = (otp) => {
        console.log('Login', otp)
        setShowOutput(otp)
    }

    return (
        <>
            {!showOtpInput
                ? <form onSubmit={handlePhoneSubmit}>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={handlePhoneNumber}
                        placeholder="Enter your Phone"
                        className="text-black p-2 rounded me-2 "
                    />
                    <button className="p-2 bg-slate-900 hover:bg-cyan-950 rounded"  type="submit">Submit</button>
                    <p>Enter your 10 digit Mobile number.</p>
                </form>
                : (
                    <div className="text-center">
                        <p className="mb-4 text-center">Enter your OTP: {phoneNumber} </p>
                        <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
                        {showOutput && <div className="mt-4 text-center">This is your Combined OTP: {showOutput }</div>}
                    </div>
                )
            }
        </>
    );
}
