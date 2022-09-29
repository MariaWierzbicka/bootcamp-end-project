import { Container, Col, Form, Row, Stack, Button } from 'react-bootstrap';
import { getCart } from '../../../redux/cartRedux';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Checkout.module.scss';
import {clsx} from 'clsx';
import { useState } from 'react';

const Checkout = () => {
  const cartProducts = useSelector(state => getCart(state));

  let sum = 0;

  for(let item of cartProducts){
    const fullPrice = (item.basePrice + item.optionPrice) * item.quantity;
    sum += fullPrice;
  }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const newOrder = { 
      name: name, 
      email: email, 
      phone: phone, 
      address: address,
      products: [cartProducts],
      total: sum
    };
    console.log(newOrder);
  };

   return(
  <Container className="my-4">
    <h1 className={styles.pageTitle}>Checkout</h1>
    <Row className="justify-content-around">
      <Col xs={10} sm={5}>
        <h4 className={styles.pageSubtitle}>Your order summary:</h4>
        <Stack className="py-3 gap-3">
          {cartProducts.map(product => ( 
          <Row xs={2} className={clsx("justify-content-between", styles.checkoutProduct)}>
            <Col xs={8}>
                <h6>{product.name}</h6>
                <p>Variant: {product.optionName} </p>
                {product.userComment && <p>Your comment:<br></br>{product.userComment}</p>}               
            </Col>
            <Col xs={4} className="text-end">
              <h6>x {product.quantity}</h6>
            </Col>
            <Col xs={6} >
            <h6>Subtotal:</h6>
            </Col>
            <Col xs={6} className="text-end">
            <h6>$ {product.basePrice + product.optionPrice}</h6>
            </Col>
            <Col>
            <h5>Total:</h5>
            </Col>
            <Col xs={6} className="text-end">
            <h5>$ {(product.basePrice + product.optionPrice)*product.quantity}</h5>
            </Col>
          </Row>
          ))}          
        </Stack>
      </Col>
      <Col xs={10} sm={5}>
        <h4 className={styles.pageSubtitle}>Your contact info:</h4>
        <Form className="py-3">
          <Form.Group className={clsx(styles.formGroup, "mb-3")}>
            <Form.Label className={styles.label}>Name</Form.Label>
            <Form.Control type="name" onChange={e => setName(e.target.value)} className={styles.input} placeholder="Enter your name" required/>
          </Form.Group>
          <Form.Group className={clsx(styles.formGroup, "mb-3")}>
            <Form.Label className={styles.label}>Email address</Form.Label>
            <Form.Control type="email" onChange={e => setEmail(e.target.value)}className={styles.input} placeholder="Enter email" required/>
          </Form.Group>
          <Form.Group className={clsx(styles.formGroup, "mb-3")}>
            <Form.Label className={styles.label}>Phone number</Form.Label>
            <Form.Control type="phone" onChange={e => setPhone(e.target.value)}className={styles.input} placeholder="Your phone number" required/>
          </Form.Group>
          <Form.Group className={clsx(styles.formGroup, "mb-3")}>
            <Form.Label className={styles.label}>Address</Form.Label>
            <Form.Control as="textarea" rows="3" onChange={e => setAddress(e.target.value)}className={styles.input} placeholder="Delivery address" required/>
          </Form.Group>
          <h4>Total: ${sum}</h4>
          <Button variant="dark btn-lg" className={styles.btnSubmit} onClick={handleSubmit} type="submit">Order</Button>      
        </Form>
      </Col>
    </Row>
  </Container>
  )
};

export default Checkout;