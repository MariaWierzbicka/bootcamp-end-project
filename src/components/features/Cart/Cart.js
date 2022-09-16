import { Container } from 'react-bootstrap';
import { getCart, loadCart } from '../../../redux/cartRedux';
import { useSelector, useDispatch } from 'react-redux';


const Cart = () => {
  const cartProducts = useSelector(state => getCart(state));
  console.log(cartProducts);

 return(
  <Container>
    <h1>Cart</h1>
  </Container>
  )
  
};

export default Cart;