import React, { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import app from './firebase/Firebase';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { addDoc } from 'firebase/firestore';
import { usersRef } from './firebase/Firebase';
import bcrypt from 'bcryptjs';


const auth = getAuth(app);

const Signup = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        mobile: "",
        password: ""

    });
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [OTP, setOTP] = useState("");

    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.

            }
        }, auth);
    }

    const requestOtp = () => {
        setLoading(true);
        generateRecaptcha();
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
            .then(confirmationResult => {
                window.confirmationResult = confirmationResult;
                swal({
                    text: "OTP sent",
                    icon: "success",
                    buttons: false,
                    timer: 3000
                });
                setOtpSent(true);
                setLoading(false);
            }).catch((error) => {
                console.log(error);
            })
    }

    const verifyOTP = () => {
        try {
            setLoading(true);
            window.confirmationResult.confirm(OTP).then((result) => {
                uploadData();
                swal({
                    text: "successfully registered",
                    icon: "success",
                    buttons: false,
                    timer: 3000
                });
                navigate('/login');
                setLoading(false);
            });
        } catch (error) {
            console.log(error);
        }
    }

    const uploadData = async () => {
        try {
            const salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(form.password, salt);
            await addDoc(usersRef, {
                name: form.name,
                password: hash,
                mobile: form.mobile
            });
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div>
            <div className="flex flex-col items-center w-full justify-center mt-10">

                <h1 className='text-2xl font-bold'>Signup</h1>
                {otpSent ?
                    <>
                        <div className="p-2 w-full md:w-1/3">
                            <div className="relative">
                                <label htmlFor="message" className="leading-7 text-sm text-gray-400">OTP</label>
                                <input id="message" name="message" value={OTP} onChange={(e) => setOTP(e.target.value)} className="w-full bg-gray-200 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-900 h-11 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" />

                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <button onClick={verifyOTP} className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-800 rounded text-lg mt-4"  >{loading ? <TailSpin height={25} color="white" /> : 'Confirm OTP'}</button>
                        </div>
                    </>
                    :
                    <>

                        <div className="p-2 w-full md:w-1/3">
                            <div className="relative">
                                <label htmlFor="message" className="leading-7 text-sm text-gray-400">Name</label>
                                <input id="message" name="message" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-gray-200 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-900 h-11 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>

                        <div className="p-2 w-full md:w-1/3">
                            <div className="relative">
                                <label htmlFor="message" className="leading-7 text-sm text-gray-400">Mobile Number</label>
                                <input id="message" type={"number"} name="message" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className="w-full bg-gray-200 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-900 h-11 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" />

                            </div>
                        </div>

                        <div className="p-2 w-full md:w-1/3">
                            <div className="relative">
                                <label htmlFor="message" className="leading-7 text-sm text-gray-400">Password</label>
                                <input id="message" name="message" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full bg-gray-200 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-900 h-11 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <button className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-800 rounded text-lg mt-4" onClick={requestOtp} >{loading ? <TailSpin height={25} color="white" /> : 'Request OTP'}</button>
                        </div>
                        <br />
                        <div>
                            <p className='text-gray-300'>Already have an account? <Link to={'/login'}><span className='text-blue-500'>Login</span></Link></p>
                        </div>
                    </>
                }
                <div id='recaptcha-container'></div>
            </div>
        </div>
    )
}

export default Signup;
