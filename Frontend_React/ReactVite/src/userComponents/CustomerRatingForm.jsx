import React, { useState } from 'react'; 
import { Container, Row, Col, Form, Button } from 'react-bootstrap'; 
import { BsStar, BsStarFill, BsPersonCircle } from 'react-icons/bs'; 
import emailjs from 'emailjs-com';    

const CustomerRatingForm = () => {   
  const user = JSON.parse(localStorage.getItem("user"));

  const [rating, setRating] = useState(0);   
  const [hover, setHover] = useState(0);   
  const [comment, setComment] = useState('');   
  const [showProfilePopup, setShowProfilePopup] = useState(false);  
 const [userInfo, setUserInfo] = useState({
     name: user.ufirstName + " " + user.ulastName,
     email: user.uemail,
     role: user.role,
    });    

  const handleRating = (star) => {     
    setRating(star);     
    console.log(`Rating selected: ${star} stars`); 
  };    

  const handleProfileClick = () => {     
    setShowProfilePopup(!showProfilePopup);  
  };    

  const handleSubmit = (e) => {
    e.preventDefault();

    const feedbackData = {
        rating: rating,
        comment: comment
    };

    console.log('Feedback Data:', feedbackData);
    

    const templateParams = {
        to_email: 'cvauction02@gmail.com',
        rating: feedbackData.rating,
        comment: feedbackData.comment,
        from_name: `${user.ufirstName} ${user.ulastName}`, 
        to_name: 'Support Team'
    };

    emailjs.send('service_46jxtzn', 'template_r6hakqc', templateParams, 'wHCJh-hnYlMhtRlve')
        .then((response) => {
            console.log('Email sent successfully:', response);
            alert('Thank you for your feedback! Your message has been sent.');
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            alert('There was an error submitting your feedback. Please try again.');
        });
};
 

  return (     
    <Container className="container-fluid d-flex flex-column min-vh-100 px-4 py-3" style={{ paddingTop: '70px', paddingBottom: '70px' }}>          
      <header className="d-flex justify-content-between align-items-center p-3 bg-white shadow-sm w-100" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>         
        <div className="d-flex align-items-center">           
          <img src="/images/CV_AUCTION_HQ_LOGO (1).png" className="img-fluid" alt="logo" style={{ width: "180px" }} />         
        </div>         
        <div className="d-flex align-items-center">           
          <span className="text-primary fw-bold me-3" style={{ cursor: "pointer" }} onClick={handleProfileClick}>             
            <BsPersonCircle size={25} className="me-1" />           
          </span>           
          <button className="btn btn-outline-danger btn-sm">Logout</button>         
        </div>       
      </header>        
     
      {showProfilePopup && (         
        <div           
          className="position-absolute bg-white shadow-lg p-4 w-25"           
          style={{             
            top: "60px",         
            right: "10px",          
            zIndex: 9999,             
            transition: "transform 0.3s ease-in-out",             
            borderRadius: "10px",           
          }}         
        >           
          <button             
            className="btn-close position-absolute top-0 end-0"             
            onClick={() => setShowProfilePopup(false)}           
          ></button>           
          <h4 className="text-center">User Profile</h4>           
          <div className="mt-4">             
            <p><strong>Name:</strong> {userInfo.name}</p>             
            <p><strong>Email:</strong> {userInfo.email}</p>             
            <p><strong>Role:</strong> {userInfo.role}</p>             
            <p><strong>Status:</strong> Active</p>             
            <p><strong>Last Login:</strong> {userInfo.lastLogin}</p>           
          </div>         
        </div>       
      )}        

      <div className="justify-content-center mt-5">         
        <Row className="justify-content-center mt-5">           
          <Col md={6}>             
            <h2 className="text-center">Customer Rating Form</h2>             
            <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">                              
              <Form.Group className="mb-3 text-center">                 
                <Form.Label className="d-block">Rate our service:</Form.Label>                 
                {[1, 2, 3, 4, 5].map((star) => (                   
                  <span                     
                    key={star}                     
                    onMouseEnter={() => setHover(star)}                     
                    onMouseLeave={() => setHover(0)}                     
                    onClick={() => handleRating(star)}                     
                    style={{ cursor: 'pointer', fontSize: '1.8rem', color: star <= (hover || rating) ? '#ffc107' : '#ccc' }}                   
                  >                     
                    {star <= (hover || rating) ? <BsStarFill /> : <BsStar />}                   
                  </span>                 
                ))}               
              </Form.Group>                

              <Form.Group className="mt-3">                 
                <Form.Label>Comments:</Form.Label>                 
                <Form.Control                   
                  as="textarea"                   
                  rows={3}                   
                  value={comment}                   
                  onChange={(e) => setComment(e.target.value)}                   
                  placeholder="Write your feedback here..."                 
                />               
              </Form.Group>                

              <Button variant="primary" type="submit" className="mt-3 w-100">                 
                Submit Feedback               
              </Button>             
            </Form>           
          </Col>         
        </Row>       
      </div>        
   
      <footer className="bg-dark text-white text-center py-3 mt-auto w-100" style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>         
        <p className="mb-0">© 2025 cvauction.tech All rights reserved in favour of CV Auction Tech Ltd.</p>       
      </footer>     
    </Container>   
  ); 
};  

export default CustomerRatingForm;
