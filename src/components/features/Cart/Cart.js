import { Button, Container, Col, Row, Stack } from 'react-bootstrap';
import { getCart } from '../../../redux/cartRedux';
import { useSelector } from 'react-redux';
import CartItem from '../CartItem/CartItem';
import shortid from 'shortid';
import { Link } from 'react-router-dom';
import styles from './Cart.module.scss';


const Cart = () => {
  const cartProducts = useSelector(state => getCart(state));
  console.log(cartProducts);

  let sum = 0;

    for(let item of cartProducts){
      const fullPrice = (item.basePrice + item.optionPrice) * item.quantity;
      sum += fullPrice;
    }
  

  if(cartProducts.length === 0) return <Container><h1>Your cart is empty!</h1></Container>
  else return(
  <Container className="my-4">
    <h1>Cart</h1>
    <Stack className="py-3">
      {cartProducts.map(product =>
        <CartItem key={shortid()} product={product}/>
      )}
    </Stack>
    <Row className="text-end">
      <Col>
      <h4>Sum: ${sum}</h4>        
        <Link to="/checkout">
          <Button variant="secondary" className={styles.btn}>Go to checkout</Button>
        </Link>
      </Col>
    </Row>
  </Container>
  )
  
};

export default Cart;