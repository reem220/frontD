import { useState } from "react"
import ax from 'axios'
import {jwtDecode} from 'jwt-decode';

const DiaryForm = ({ show, setShow }) => {
  const users = JSON.parse(localStorage.getItem('user'))
  const [title, setTitle] = useState('')
  const [content, setCont] = useState('')
  const [error, setError] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const decoded = jwtDecode(users.token);
      const user_id = decoded._id
      const diary= { title, content ,user_id}
      const response = await ax.post('https://diaryb.onrender.com/api/diary',diary, {
        headers: {
          'Authorization': `Bearer ${users.token}`
        }, 
      })
      setTitle('')
      setCont('')
      setError(null)
      show ? setShow(false) : setShow(true)

    } catch (error) {
      setError('please fill out all fields')
    }




  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New diary</h3>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="Add title"
      />

      <textarea value={content} onChange={(e) => setCont(e.target.value)} rows="20" className="diary-textarea m-1">
      </textarea>



      <button className="bb">Add</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default DiaryForm