import React, { useContext,useState } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../assets/css/verifycode.css';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { UserContext } from "../App";

const VerifyCode = () => {
    const [code, setCode] = useState(new Array(6).fill(''));
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { user, setUser } = useContext(UserContext);

    // Extract email from location state
    const email = location.state?.email;

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;
        
        setCode([...code.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus on next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join('');
        try {
            const res = await axios.post(import.meta.env.VITE_POST_USER_VERIFICATION, { email, code: verificationCode });

            // Handle successful verification
            if (res.data.success) {
                // Display a success toast notification
                toast.success("Account Created Successfully", {
                    position: "top-right",
                    autoClose: 5000,
                });

                // Set authentication token in cookies
                Cookies.set("authToken", res.data.token, {
                    secure: true,
                    sameSite: "None",
                });
                setUser(res.data.user);

                // Redirect to dashboard
                navigate('/dashboard');
            }
        } catch (err) {
            setErrors(err.response.data.errors);
        }
    };

    return (
        <div className="verify-container">
            <form onSubmit={onSubmit} className="verify-form">
                <h2>Verify Your Email</h2>
                <div className="input-group">
                    {code.map((digit, idx) => (
                        <input
                            key={idx}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={e => handleChange(e.target, idx)}
                            onFocus={e => e.target.select()}
                            className="code-input"
                        />
                    ))}
                </div>
                <button type="submit" className="verify-button">Verify</button>
                {errors.length > 0 && (
                    <div className="error-messages">
                        {errors.map((error, index) => <p key={index}>{error.msg}</p>)}
                    </div>
                )}
            </form>
        </div>
    );
};

export default VerifyCode;
