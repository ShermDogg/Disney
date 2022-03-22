import React from 'react';
import Gravatar from 'react-gravatar';
import {Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {  useQuery } from '@apollo/client';
import { users} from "../GraphQL/Query";

 const UCard = () => {
    const { loading, error, data } = useQuery(users);
    if (loading) return "Loading..."
    if (error) return "Error..."
  return (
    <div>
        <Col xl={6}>
       {data.users.map((data) => (
        <>
        <div key={data.id} class="card mb-3">
           <h3 class="card-header">{data.name}</h3>
           <div class="card-body">
             <h5 className="card-title">Is Sea Moss really beneficial?</h5>
             <h6 class="card-subtitle text-muted">Support card subtitle</h6>
           </div>
           <Gravatar email = {data.email} default="monsterid" size={150} />
           
           <div class="card-body">
             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
           </div>
           <ul class="list-group list-group-flush">
             <li class="list-group-item">Cras justo odio</li>
             <li class="list-group-item">Dapibus ac facilisis in</li>
             <li class="list-group-item">Vestibulum at eros</li>
           </ul>
           <div class="card-body">
             <a as={Link} to="/" class="card-link">Card link</a>
             <a href="#" class="card-link">Another link</a>
           </div>
           <div class="card-footer text-muted">
             2 days ago
           </div>
         </div>
         
           </>



       
       
       
))} 

       </Col>
    </div>
  )
}

export default UCard;