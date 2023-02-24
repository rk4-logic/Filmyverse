import React, { useContext, useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { reviewsref, db, moviesRef } from './firebase/Firebase';
import { addDoc, updateDoc, doc, query, where, getDocs } from 'firebase/firestore';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert';
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom';

const Reviews = ({ id, prevRating, userRated }) => {

  const useAppstate = useContext(Appstate);
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [form, setForm] = useState("");
  const [data, setData] = useState([]);
  const [newAdded, setNewAdded] = useState(0);


  const sendReview = async () => {
    setLoading(true);
    try {
      if (useAppstate.login) {
        await addDoc(reviewsref, {
          movieid: id,
          name: useAppstate.userName,
          rating: rating,
          thought: form,
          timestamp: new Date().getTime()
        })
        const ref = doc(db, "movies", id);
        await updateDoc(ref, {
          rating: prevRating + rating,
          rated: userRated + 1
        })
        setRating(0);
        setForm("");
        setNewAdded(newAdded +1);
        swal({
          title: "Review Sent",
          icon: "success",
          buttons: false,
          timer: 3000
        })
      }
      else{
        navigate('/login');
      }
    } catch (error) {
      swal({
        title: error.message,
        icon: "Error",
        buttons: false,
        timer: 3000
      })
    }
    setLoading(false);
  }
  useEffect(() => {
    async function getData() {
      setReviewLoading(true);
      setData([]);
      let quer = query(reviewsref, where('movieid', '==', id));
      const querySnapshot = await getDocs(quer);
      querySnapshot.forEach((doc) => {
        setData((prev) => [...prev, doc.data()])
      })

      setReviewLoading(false);
    }
    getData();
  }, [newAdded])

  return (
    <div className='mt-4 border-t-2 border-gray-700 w-full '>
      <ReactStars
        count={5}
        size={30}
        half={true}
        value={rating}
        onChange={(rate) => setRating(rate)}
      />
      <input
        value={form}
        onChange={(e) => setForm(e.target.value)}
        placeholder='Share Your Review...'
        className='p-2 w-full outline-none header'
      />
      <button className='mt-3 w-full p-1 flex justify-center bg-green-600' onClick={sendReview} >
        {loading ? <TailSpin height={10} color='white' /> : 'Share'}
      </button>
      {reviewLoading ? <div className='mt-6 flex justify-center'><ThreeDots height={15} color='white' /></div> :
        <div className='mt-4'>
          {data.map((e, i) => {
            return (
              <div className=' p-2 w-full border-b border-gray-600 mt-2' key={i}>
                <div className='flex items-center'>
                  <p className='text-blue-500'>{e.name}</p>
                  <p className='ml-4 text-xs'>{new Date(e.timestamp).toLocaleString()}</p>
                </div>
                <ReactStars
                  count={5}
                  size={15}
                  half={true}
                  value={e.rating}
                  edit={false}
                />
                <p>{e.thought}</p>
              </div>
            )
          })}
        </div>
      }
    </div>
  )
}

export default Reviews;
