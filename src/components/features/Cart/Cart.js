import { Button, Container, Form, InputGroup, Stack } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { getCart, loadCart } from '../../../redux/cartRedux';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import CartItem from '../CartItem/CartItem';


const Cart = () => {
  const cartProducts = useSelector(state => getCart(state));
  console.log(cartProducts);

  const [amount, setAmount] = useState(1);
  const updateAmount = ( value ) => {
    let newAmount = amount;
    if(value === '+') {
      newAmount = amount + 1;
    } else if(value === '-') {
      newAmount = amount - 1;
    }
      setAmount(newAmount);
      // setCartProduct({...cartProduct, quantity: newAmount});
  };
 return(
  <Container>
    <h1>Cart</h1>
    <Stack>
      {cartProducts.map(product =>
        <CartItem key={product.id} product={product}/>
      )}
      </Stack>
  </Container>
  )
  
};

export default Cart;