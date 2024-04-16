
import { useState, useRef, useEffect } from "react"


export default function OtpInput({ length = '4', onOtpSubmit = () => { } }) {

    const [otp, setOtp] = useState(new Array(length).fill(''))
    const inputRefs = useRef([])

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus()
        }
    }, [])

    const handleChange = (index, e) => {
        const value = e.target.value;
        if (isNaN(value)) return;
        const newOtp = [...otp]
        
        // Allow only one
        newOtp[index] = value.substring(value.length - 1)
        setOtp(newOtp)

        // Combined otp
        const combinedOtp = newOtp.join('')
        if (combinedOtp.length === length) onOtpSubmit(combinedOtp)

        // Move to next input
        if (value && index < length - 1 && inputRefs.current[index+1] ) {
            inputRefs.current[index + 1].focus()
        }
    }

    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(1, 1)

        if (index > 0 && !otp[index - 1]) {
            inputRefs.current[otp.indexOf('')].focus()
        }
    };
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' &&
            !otp[index] &&
            index > 0 &&
            inputRefs.current[index - 1]
        )
        {
            // Moving focus to prev input field on backspace
            inputRefs.current[index - 1].focus()
        }
    }

    return (
        <>
            {
                otp.map((value, index) => {
                    return <input
                        key={index}
                        ref={(input) => (inputRefs.current[index] = input)}
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(index, e)}
                        onClick={() => handleClick(index)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="h-10 w-10 rounded ms-2 text-black p-2 text-center "
                    />
                })
            }
        </>
    )
}