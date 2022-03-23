import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from "@apollo/client";
import './App.css';
import { GET_ALL_USERS, GET_USER } from './query';
import { CREATE_USER } from './mutation';


const App = () => {
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [age, setAge] = useState(0)
  const [formError, setFormError] = useState('')

  //асинхронный хук для получения данных
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);

  //асинхронный хук для получения конкретных данных
  const { data: oneUser } = useQuery(GET_USER, {
    variables: { //указываются переменные для функции-запроса
      id: 1
    }
  });
  console.log(oneUser)

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
      if (username && age) {
        setFormError('')
        await newUser({
          variables: {
            input: {
              username,
              age: Number(age)
            }
          }
        });
        setUsername('');
        setAge(0);
        await refetch()
      } else {
        return setFormError('Fields can not be empty')
      }
    } catch (e) {
      setFormError(e.message)
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
        {formError && <p className='error'>{formError}</p>}

        <div className='handlers'>
          <button onClick={(e)=>addUser(e)}>Add</button>
        </div>
      </form>

      {loading && <h3>Loading...</h3>}
      {error && <h3 className='error'>{error.message}</h3>}

      <div className='list'>
        {users.map(user => {
          return (
            <div key={user.id} className='user'>
              <div>
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
