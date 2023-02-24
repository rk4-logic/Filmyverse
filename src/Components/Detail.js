import React, { useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { useParams } from 'react-router-dom';
import { db } from './firebase/Firebase';
import { getDoc, doc } from 'firebase/firestore';
import { ThreeCircles } from 'react-loader-spinner';
import Reviews from './Reviews';

const Detail = () => {
    const { id } = useParams();
    const [data, setData] = useState({
        title: "",
        year: "",
        image: "",
        description: "",
        rating: 0,
        rated: 0
    }, []);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const _doc = doc(db, "movies", id);
            const _data = await getDoc(_doc);
            setData(_data.data());
            setLoading(false);
        }
        getData();
    }, [])

    return (
        <>

            {loading ? <div className="justify-center items-center h-96 flex flex-col "> <ThreeCircles height={100} color='white' /> </div>:
                <>
                    <div className='p-4 mt-4 flex flex-col md:flex-row md:items-start w-full justify-center' >
                        <img className='h-80 block md:sticky top-36' src={data.image} alt="" />
                        <div className='md:ml-4 ml-0 w-full md:w-1/2'>
                            <h1 className='text-2xl font-bold text-gray-400'>{data.title} <span className='text-xl'>({data.year})</span></h1>

                            <ReactStars
                                count={5}
                                size={24}
                                half={true}
                                edit={false}
                                value={data.rating/ data.rated}
                            />

                            <p className='mt-2 text-align-initial'>{data.description}</p>

                            <Reviews id={id} prevRating={data.rating} userRated={data.rated} />

                        </div>
                    </div >
                </>
            }
        </>

    )
}

export default Detail;
