import { Button, ButtonGroup, Col,Container, Form, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { removeCartProduct, getCartProductById, updateCartProduct } from '../../../redux/cartRedux';
import { useState } from 'react';
import styles from './CartItem.module.scss';


const CartItem = ({product}) => {
  const dispatch = useDispatch();
  const id = product._id;
  const option = product.optionName;

  const cartProduct = useSelector((state) => getCartProductById(id, option, state));

  const [active, setActive] = useState(false);
  const [comment, setComment] = useState('');
  const [amount, setAmount] = useState(product.quantity);

  const updateAmount = ( value ) => {
    let newAmount = amount;
    if(value === '+') {
      newAmount = amount + 1;
    } else if(value === '-') {
      newAmount = amount - 1;
    }
      setAmount(newAmount);

      const newProduct = {...cartProduct, quantity: newAmount};
      dispatch(updateCartProduct(newProduct));
  };

  const handleRemove = e => {
    e.preventDefault();
    dispatch(removeCartProduct(product));
  }

  const handleCommentSubmit = e => {
    e.preventDefault();
    const userComment = comment;
    const newProduct = {...cartProduct, userComment: userComment};
    dispatch(updateCartProduct(newProduct));

  }
  return (
    <Container className={styles.cartContainer}>
      <Row className="justify-content-evenly align-items-center">
        <Col xs={12} sm={4} direction="row" className="pt-3">
          <h3>{product.name}</h3>
          <p>Variant: {product.optionName}</p>
          {cartProduct.userComment && <p>Your comment: {cartProduct.userComment}</p>}
        </Col>
        <Col xs={5} sm={2} className="text-center mb-3" >
          <Button variant="outline" size="sm" className={styles.removeBtn} onClick={() => setActive(true)}>Add comment</Button>
        </Col>
        <Col xs={5} sm={2}  className="justify-content-center mb-3">
          <ButtonGroup>
            <Button variant="outline-secondary" size="sm" onClick={() => (amount > 1 ? updateAmount('-') : null)}>
              <FontAwesomeIcon icon={faMinus}  />
            </Button> 
            <Form.Control
              readOnly
              value={amount} 
              className={styles.amtInput}
            />
            <Button variant="outline-secondary" size="sm" align="end" onClick={() => updateAmount('+')}>
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </ButtonGroup>
        </Col>
        <Col xs={2} sm={1} className="text-center mb-3" >
          <Button variant="outline" className={styles.removeBtn} onClick={handleRemove}>
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </Col>
        <Col className="text-end mb-3" sm={1} xs={12}>
          <h5>${(cartProduct.basePrice + cartProduct.optionPrice)*cartProduct.quantity}</h5>
        
        </Col>
      </Row>
      {active && <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="userComment">
              <Form.Control type="text" onChange={e => setComment(e.target.value)} className={styles.input} placeholder="Type your comment" />
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <Button variant="secondary" onClick={handleCommentSubmit}>Submit</Button>

        </Col>
      </Row>}
    </Container>
  )
}
export default CartItem;