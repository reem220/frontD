import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner"

import ax from 'axios'
const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      setIsLoading(true)
      setError(null)
      const response = await ax.post('https://diaryb.onrender.com/api/user/signup', { email, password })
      localStorage.setItem('user', JSON.stringify(response.data))
      navigate('/')
      window.location.reload();
      setIsLoading(false)

    } catch (error) {

      setIsLoading(false)
      setError('please fill out all fields')
    }

  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

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
      {isLoading ? <Circles
        height="30"
        width="30"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      /> : <button disabled={isLoading}>Sign up</button>}

      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup