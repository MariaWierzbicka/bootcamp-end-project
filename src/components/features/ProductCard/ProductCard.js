import { Container } from 'react-bootstrap';

const Cart = props => {
  const id = props.id;
  
  return(
  <Container>
    <h1>Product {id}</h1>
  </Container>
  )
};

export default Cart;