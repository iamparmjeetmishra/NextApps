"use client";
import { useState } from "react";

import OtpInput from './OtpInput'


export default function Phone() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false)

    const handlePhoneNumber = (e) => {
        setPhoneNumber(e.target.value)
    }

    const handlePhoneSubmit = (e) => {
        e.preventDefault()

        // Phone Validations
        const regex = /[^0-9]/g;
        if (phoneNumber.length < 2 || regex.test(phoneNumber)) {
            return
        }
        setShowOtpInput(true)

    }

    const onOtpSubmit = (otp) => {
        console.log('Login', otp)
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
                        className="text-black "
                    />
                    <button type="submit">submit</button>
                </form>
                : (
                    <div>
                        <p>Enter your OTP: {phoneNumber} </p>
                        <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
                    </div>
                )
            }
        </>
    );
}
