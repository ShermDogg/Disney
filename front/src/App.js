import React, {useState} from 'react';
import Gravatar from 'react-gravatar';
import {Row, Col, Image, Card, Container} from 'react-bootstrap';
import Login from './Login';
import './App.css';
import Header from './layout/Header';
import Register from './Register';
import Footer from './layout/Footer';
import Landing from './layout/Landing';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import {  useQuery } from '@apollo/client';


import { users} from "./GraphQL/Query";
import bwm from './images/bwm.png'
import UCard from './layout/UCard';



const App = () => {
  
  
  const { loading, error, data } = useQuery(users);
  
  
  return (
    
     <div>
     <Row>

       <Col>
       <img src = {bwm}>

       </img>
       <Header />
       </Col>
       <Col>
       </Col>
     </Row>
    
      
    
    
      
      
      <main>
        <Container>
        <Routes>
          <Route path='register' element={<Register />}  />
          <Route path='login' element={<Login />}  />
          <Route path='/' element={<UCard/>}  />
          </Routes>
        </Container>
      </main>
     
     
      
      
        <Footer />
        
        
   
   
        </div>
  
  );
}

export default App;





