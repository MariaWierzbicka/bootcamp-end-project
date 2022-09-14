import { Alert, Button, Col, Container, Form, Image, Row, InputGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductById, getRequest, loadProductsRequest} from '../../../redux/productsRedux';
import { useState, useEffect } from 'react';
import styles from './ProductPage.module.scss';
import shortid from 'shortid';

const ProductPage = () => {
  const {id} = useParams();
  const product = useSelector(state => getProductById(state, id));
  const request = useSelector(getRequest);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(loadProductsRequest());
  }, [dispatch]);

  const [fullPrice, setFullPrice] = useState('');
  const [amount, setAmount] = useState(1);
  const [cartItem, setCartItem] = useState({
    amount: 1,
    id: id,
    basePrice: '',
    optionPrice: '',
    optionName: '',
  });

  const updateAmount = ({ target }) => {
    setCartItem({ ...cartItem, amount: target.value });

  }
  const updatePrice = ({target}) => {
    setCartItem({ ...cartItem, basePrice: product.minPrice, optionPrice: target.value, optionName: target.selectedOptions[0].text });
    setFullPrice(parseInt(product.minPrice) + parseInt(target.value));
  }

  const addToCart = e => {
    e.preventDefault();
    setCartItem({
      name: product.name,
      id: id,
      basePrice: cartItem.basePrice,
      optionName: cartItem.optionName,
      amount: amount,
    })
    console.log(cartItem);
  }

  if(request.pending) return <h2>Loading...</h2>; 
  else if(request.error) return <Alert color="warning">{request.error}</Alert>;
  else if(!request.success || !product) return <Alert color="info">No product</Alert>;
  else if(request.success) return (
    <Container>
      <Row className="justify-content-around" >
        <Col sm={6} xs={10} >
          <h1>{product.name}</h1>
          <p>{product.description}</p>
        </Col>
        <Col sm={4} xs={9} className="mx-4 mt-2">
          <h5>Choose type of wood</h5>
          <Form.Select onChange={updatePrice} className={styles.dropdown} required>
            {product.options.map(item => 
              <option key={item.name} value={item.addedPrice}>{item.name}</option>
            )}
          </Form.Select>
          <Row className="justify-content-center">
            <Col xs={8}>
              <InputGroup className="my-3">
                <Button variant="outline-secondary" id="less" onClick={() => (amount > 1 ? setAmount(amount-1) : setAmount(amount))}>
                  <FontAwesomeIcon icon={faMinus} className={styles.icon} />
                </Button>
                <Form.Control
                  value={amount}
                  onChange={updateAmount}
                  className="text-center"
                />
                <Button variant="outline-secondary" id="more" align="end" onClick={() => setAmount(amount+1)}>
                  <FontAwesomeIcon icon={faPlus} className={styles.icon} />
                </Button>
              </InputGroup>
            </Col>
          </Row>
          <h5>Price: ${fullPrice*amount || product.minPrice*amount}</h5>
          <Row className="justify-content-center">
              <Col xs={12}>
                <Button className={styles.cartBtn} onClick={addToCart} variant="secondary">Add to cart</Button>
              </Col>
          </Row>
        </Col>
      </Row>
      <Row className="py-5 me-4 justify-content-around" >
        <Col xs={11}>
          <Row xs={1} sm={2} md={3} className="justify-content-between">
            <Col sm={4}>
              <Image src={product.photo} alt="" className={styles.photo}></Image>
            </Col>
            {(product.additionalPhotos && product.additionalPhotos.length > 1) &&
            product.additionalPhotos.map(photo => 
              <Col key={shortid()}  sm={4} >
            <Image src={photo} alt="" className={styles.photo}></Image>
            </Col>)}
          </Row>
        </Col>
      </Row>
    </Container>
  )
};

export default ProductPage;