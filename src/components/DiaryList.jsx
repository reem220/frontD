import ax from 'axios'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const DiaryList = ({ workout,show,setShow }) => {
 
  const users = JSON.parse(localStorage.getItem('user'))
  const handleClick = async () => {
    if (!users) {
      return
    }
   await ax.delete(`https://diaryb.onrender.com/api/diary` + workout._id,{ headers: {
      'Authorization': `Bearer ${users.token}`
    }})
  
     show?setShow(false):setShow(true)
  
   
  }

  return (
    <div className="workout-details card">
      <h4>{workout.title}</h4>
      <p className='my-4 ms-3'>{workout.content}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <button className="mt-3 btn btn-danger text-white mx-auto w-50 shadow-lg " onClick={handleClick}>delete</button>
    </div>
  )
}

export default DiaryList










