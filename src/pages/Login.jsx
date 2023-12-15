import {  useEffect, useState } from "react"
import ax from 'axios'
import { useNavigate } from "react-router-dom";
import {Circles} from"react-loader-spinner"
const Login = () => {
 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

const navigate=useNavigate()



  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
     
      setIsLoading(true)
   setError(null)
   
   const response = await ax.post('https://diaryb.onrender.com/api/user/login' ,{email,password} )
 
  
   navigate('/')
   window.location.reload();
 
       localStorage.setItem('user', JSON.stringify(response.data))
     setIsLoading(false)

   } catch (error) {
   
      setIsLoading(false)
     setError('please fill out the right credentials')
   }
   
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
{isLoading? <Circles
  height="30"
  width="30"
  color="#4fa94d"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>: <button>Log in</button>}
     
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login