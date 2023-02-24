import React, { useContext, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { addDoc } from 'firebase/firestore';
import { moviesRef } from './firebase/Firebase';
import swal from 'sweetalert';
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom';


const AddMovie = () => {
    const useAppstate = useContext(Appstate);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        year: "",
        description: "",
        image: "",
        rating: 0,
        rated: 0
    });

    const [loading, setLoading] = useState(false);

    const addMovie = async () => {
        setLoading(true);
        try {
            if (useAppstate.login) {
                await addDoc(moviesRef, form);
                swal({
                    title: "Successfully Added",
                    icon: "success",
                    buttons: false,
                    timer: 3000
                })
                setForm({
                    title: "",
                    year: "",
                    description: "",
                    image: "",
                    rating: 0,
                    rated: 0,
                });
            }
            else{
                navigate('/login');
            }
        }
        catch (err) {
            swal({
                title: err,
                icon: "Error",
                buttons: false,
                timer: 3000
            })
        }
        setLoading(false);
    }

    return (
        <div>
            <section className="text-gray-400 bg-gray-900 body-font relative">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-4">
                        <h1 className="sm:text-3xl text-xl font-medium title-font mb-4 text-violet-400">Add New Movie</h1>

                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="name" className="leading-7 text-sm text-gray-400">Title</label>
                                    <input type="text" id="name" name="name" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full bg-gray-200 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="email" className="leading-7 text-sm text-gray-400">Year</label>
                                    <input type="email" id="email" name="email" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className="w-full bg-gray-200 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="message" className="leading-7 text-sm text-gray-400">Image Link</label>
                                    <input id="message" name="message" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full bg-gray-200 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-900 h-11 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" defaultValue={""} />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="message" className="leading-7 text-sm text-gray-400">Description</label>
                                    <textarea id="message" name="message" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full bg-gray-200 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" defaultValue={""} />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <button onClick={addMovie} className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-800 rounded text-lg">{loading ? <TailSpin height={25} color="white" /> : 'Submit'}</button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default AddMovie;
