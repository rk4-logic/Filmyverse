import { getDoc, getDocs} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import ReactStars from 'react-stars';
import { moviesRef } from './firebase/Firebase';
import { Link } from 'react-router-dom';

const Cards = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _data = await getDocs(moviesRef);
      _data.forEach((doc) => {
        setData((prv) => [...prv, { ...(doc.data()), id: doc.id }])
      })
      setLoading(false);
    }
    getData();
  }, []);

 

  return (
   

    <div className='flex flex-wrap justify-between px-3 mt-2'>
      {loading ? <div className='w-full flex justify-center items-center h-96'><ThreeDots height={40} color='white' /> </div> :
        data.map((e, i) => {
          return (
            <Link to={`/detail/${e.id}`}>
              <div key={i} className='card  font-medium shadow-lg p-2 mt-6  hover:-translate-y-3 transition-all duration-500 cursor-pointer'>
                <img className='h-68 md:h-72' src={e.image} alt='' />
                
                <h1 style={{overflow: 'hidden', inlineSize: '185px', minHeight: '34px'}}> {e.title}</h1>
                
                <h1 className='flex items-center'><span className='text-gray-400'>Rating: </span> <span className='ml-2 mr-2'> {}</span>

                  <ReactStars
                    count={5}
                    size={24}
                    half={true}
                    edit={false}
                    value={e.rating/ e.rated}
                  />
                </h1>
                <h1><span className='text-gray-400'>Year:</span> {e.year}</h1>
              </div>
            </Link>
          )
        })
      }


    </div>

  )
}

export default Cards;

