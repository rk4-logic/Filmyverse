import { query, where, getDocs } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { usersRef } from './firebase/Firebase';
import bcrypt from 'bcryptjs';
import {Appstate} from '../App';


const Login = () => {
    const navigate = useNavigate();
    const useAppstate = useContext(Appstate);
    const [form, setForm] = useState({
        mobile: "",
        password: "",

    });
    const [loading, setLoading] = useState(false);

    const login = async () => {
        setLoading(true);
        try {
            const quer = query(usersRef, where('mobile', '==', form.mobile));
            const querySnapshot = await getDocs(quer);
            querySnapshot.forEach((doc) => {
                const _data = doc.data();
                const isUser = bcrypt.compareSync(form.password, _data.password);

                if(isUser){
                    useAppstate.setLogin(true);
                    useAppstate.setUserName(_data.name);
                    navigate('/');
                    swal({
                        title: "Logged in",
                        icon: "success",
                        buttons: false, 
                        timer: 3000
                      })
                }
                else{
                    swal({
                        title: "Invalid Credentials",
                        icon: "error",
                        buttons: false,
                        timer: 3000
                      })
                }
            })

                                   
        } catch (error) {
            swal({
                title: error.message,
                icon: "error",
                buttons: false,
                timer: 3000
              })
        }
        setLoading(false);
    }

    return (
        <div>
            <div className="flex flex-col items-center w-full justify-center mt-10">
                <h1 className='text-2xl font-bold'>Login</h1>
                <div className="p-2 w-full md:w-1/3">
                    <div className="relative">
                        <label htmlFor="message" className="leading-7 text-sm text-gray-400">Mobile Number</label>
                        <input id="message" type={"number"} name="message" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className="w-full bg-gray-200 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-900 h-11 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" defaultValue={""} />

                    </div>

                </div>
                <div className="p-2 w-full md:w-1/3">
                    <div className="relative">
                        <label htmlFor="message" className="leading-7 text-sm text-gray-400">Password</label>
                        <input id="message" name="message" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full bg-gray-200 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-900 h-11 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" defaultValue={""} />
                    </div>
                </div>
                <div className="p-2 w-full">
                    <button onClick={login} className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-800 rounded text-lg mt-4">{loading ? <TailSpin height={25} color="white" /> : 'Login'}</button>
                </div>
                <br />
                <div>
                    <p className='text-gray-300'>Don't have Account? <Link to={'/signup'}><span className='text-blue-500'>Signup</span></Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login;
