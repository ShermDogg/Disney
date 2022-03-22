import React, {useState} from 'react'
import {  useQuery, useMutation } from '@apollo/client';
import { users} from "./GraphQL/Query"
import {  ADD_USER } from './GraphQL/mutations';
import {Row, Col, Image, Card,} from 'react-bootstrap';

function Register() {
  const { loading, error, data } = useQuery(users);
  const [addUser, { err }] = useMutation(ADD_USER);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  if (error)
    return { err };


  if (loading)
    return <p>Loading....</p>;

  return (
    <div>
      <br/>
      <Card  className='my-3 p-3 rounded'>

<Card.Img />


<Card.Body>

  <Card.Title as='div'><strong></strong></Card.Title>


  <Card.Text as='div'>





  </Card.Text>
  <Card.Text as='h3'>
    
    <form onSubmit={e =>{
      e.preventDefault();
      addUser({variables:{name: name,
        email: email, password: password}}).then(({data}) => {
          localStorage.setItem('token', data.addUser);
          addUser.resetStore()
        })
    }}>
      <fieldset>
        <legend>Legend</legend>
        <div class="form-group row">
          <label for="staticName" class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input type="text" readonly="" class="form-control-plaintext" id="staticEmail" value="email@example.com" />
          </div>
          <div class="form-group">
          <label for="exampleInputName" class="form-label mt-4">Name</label>
          <input type="name" class="form-control" id="exampleInputName" onChange={(e) => setName(e.target.value)} aria-describedby="nameHelp" placeholder="Enter name" />
          <small id="nameHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        </div>
        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <input type="text" readonly="" class="form-control-plaintext" id="staticEmail" value="email@example.com" />
          </div>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1" class="form-label mt-4">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1" class="form-label mt-4">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        </div>
        <button type="submit" class="btn btn-primary" >Submit</button>
      </fieldset>
    </form>

  </Card.Text>
</Card.Body>

</Card>


    </div>
  )
}


export default Register;