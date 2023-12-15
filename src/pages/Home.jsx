import { useEffect, useState }from 'react'
import ax from 'axios'
import DiaryForm from '../components/DiaryForm'
import DiaryList from '../components/DiaryList'
import { jwtDecode } from "jwt-decode";
const Home = () => {
  const [dairy, setdiary] = useState(null)
  const [show, setShow] = useState(false)
  const users = JSON.parse(localStorage.getItem('user'))
  
  useEffect(() => {
   
    const fetchDiary = async () => {
   
      
      try {
        const decoded = jwtDecode(users.token);  
        let response = await ax.get(`https://diaryb.onrender.com/api/diary/getdiarysByid/${decoded._id}`, {
          headers: {'Authorization': `Bearer ${users.token}`},
        });
        console.log(response.data)
        setdiary(response.data)

      } catch (err) {
        console.log(`ERROR! ${err}`);
      } 
  
    }

    if (users) {
      fetchDiary()
    }
  }, [show])
  return (
    <div className="home">
      <div className="workouts">
        {dairy && dairy.map((workout) => (
            <DiaryList workout={workout} setShow={setShow} show={show} key={workout._id} />
        ))}
      </div>
      <DiaryForm setShow={setShow} show={show} />
    </div>
  )
}

export default Home