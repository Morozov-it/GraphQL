import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from "@apollo/client";
import './App.css';
import { GET_ALL_USERS } from './query';
import { CREATE_USER } from './mutation';


const App = () => {
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [age, setAge] = useState(0)

  //асинхронный хук для получения данных
  const { data, loading, error } = useQuery(GET_ALL_USERS);
  //асинхронный хук для изменения данных
  const [newUser] = useMutation(CREATE_USER)


  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers)
    }
  }, [data])

  const addUser = async (e) => {
    e.preventDefault()
    try {
      const addedUser = await newUser({
            variables: {
              input: {
                username,
                age: Number(age)
              }
            }
          });
      console.log(addedUser);
      setUsername('');
      setAge(0);
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <div className="App">
      <h2>Plain App</h2>
      <form className='form'>
        <label className='label'>
          <span>Name</span>
          <input
            onChange={(e)=>setUsername(e.target.value)}
            value={username}
            type="text" />
        </label>
        <label className='label'>
          <span>Age</span>
          <input
            onChange={(e)=>setAge(e.target.value)}
            value={age}
            type="number" />
        </label>
        <div className='handlers'>
          <button onClick={(e)=>addUser(e)}>Add</button>
          <button>Get</button>
        </div>
      </form>

      {loading && <h3>Loading...</h3>}
      {error && <h3 className='error'>{error.message}</h3>}

      <div className='list'>
        {users.map(user => {
          return (
            <div key={user.id} className='user'>
              <div>
                  <span>{user.id}. </span>
                  <span>{user.username} </span>
                  <span>{user.age}</span>
              </div>
              <hr />
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default React.memo(App);
