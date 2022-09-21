import { Button, ButtonGroup, Col,Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { getCart, loadCart } from '../../../redux/cartRedux';
import { useState, useEffect } from 'react';
import styles from './CartItem.module.scss';


const CartItem = ({product}) => {

  const cartProducts = useSelector(state => getCart(state));
  console.log(cartProducts);

  const [amount, setAmount] = useState(product.quantity);
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
  return (
    <Container className={styles.cartContainer}>
      <Row className="justify-content-center align-items-center">
        <Col xs={12} sm={5} direction="row" className="pt-3">
          <h3>{product.name}</h3>
          <p>Variant: {product.optionName}</p>
        </Col>
        <Col xs={8} sm={4}  className="justify-content-center">
        <ButtonGroup>
          <Button variant="outline-secondary" onClick={() => (amount > 1 ? updateAmount('-') : null)}>
            <FontAwesomeIcon icon={faMinus}  />
          </Button>
          <Form.Control
            readOnly
            value={amount} 
            className={styles.amtInput}
          />
          <Button variant="outline-secondary" align="end" onClick={() => updateAmount('+')}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </ButtonGroup>
        </Col>
        <Col xs={10} sm={3} className="text-center" >
          <Button variant="danger">Remove</Button>
        </Col>
      </Row>
    </Container>
  )
}
export default CartItem;