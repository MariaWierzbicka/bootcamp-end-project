import { Alert, Button, Col, Container, Form, Image, Row, InputGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductById, getRequest, loadProductsRequest} from '../../../redux/productsRedux';
import { addCartProduct, getCart, updateCartProduct} from '../../../redux/cartRedux';
import { useState, useEffect } from 'react';
import styles from './ProductPage.module.scss';
import shortid from 'shortid';

const ProductPage = () => {
  const {id} = useParams();
  const product = useSelector(state => getProductById(state, id));
  const cartProducts = useSelector(state => getCart(state));
  console.log(cartProducts);
  const request = useSelector(getRequest);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(loadProductsRequest());
  }, [dispatch]);

  const [active, setActive] = useState(false);
  const [fullPrice, setFullPrice] = useState('');
  const [amount, setAmount] = useState(1);
  const [cartProduct, setCartProduct] = useState({
    name: '',
    quantity: amount,
    _id: id,
    basePrice: '',
    optionPrice: '',
    optionName: '',
    userComment: ''
  });

  const updateAmount = ( value ) => {
    let newAmount = amount;
    if(value === '+') {
      newAmount = amount + 1;
    } else if(value === '-') {
      newAmount = amount - 1;
    }
      setAmount(newAmount);
      setCartProduct({...cartProduct, quantity: newAmount});
  };
  const updatePrice = ({target}) => {
    setCartProduct({ ...cartProduct, basePrice: product.minPrice, optionPrice: parseInt(target.value), optionName: target.selectedOptions[0].text });
    setFullPrice(parseInt(product.minPrice) + parseInt(target.value));
  };

  if(request.success && !cartProduct.optionName ) {
    setCartProduct({...cartProduct,
      name: product.name,
      optionName: product.options[0].name,
      optionPrice: product.options[0].addedPrice,
      basePrice: product.minPrice
    })
  };

  const addToCart = (e) => {
    e.preventDefault();
    setActive(true);
    setTimeout(() => {
        setActive(false);
      }, 1000);
    const inCart = cartProducts.find(item => item._id === cartProduct._id && item.optionName === cartProduct.optionName);
    
    if(inCart){
      const newQuantity = inCart.quantity + cartProduct.quantity;
      const newProduct = {...inCart, quantity: newQuantity};
      dispatch(updateCartProduct(newProduct));
      setCartProduct({
        name: '',
        quantity: amount,
        _id: id,
        basePrice: '',
        optionPrice: '',
        optionName: '',
        userComment: ''
      });
    } else {
      dispatch(addCartProduct(cartProduct));
      setCartProduct({
        name: '',
        quantity: amount,
        _id: id,
        basePrice: '',
        optionPrice: '',
        optionName: '',
        userComment: ''
      });
    }
  }

  if(request.pending) return <h2>Loading...</h2>; 
  else if(request.error) return <Alert color="warning">{request.error}</Alert>;
  else if(!request.success || !product) return <Alert color="info">No product</Alert>;
  else if(request.success)   
  return (
    <Container className="my-4">
      <Row className="justify-content-around" >
        <Col sm={6} xs={10} >
          <h1>{product.name}</h1>
          <p>{product.description}</p>
        </Col>
        <Col sm={4} xs={9} className="mx-4 mt-2">
          <h5>Choose type of wood</h5>
          <Form.Select onChange={updatePrice} className={styles.dropdown} required>
            {product.options.map(option =>
              <option key={option.name} value={option.addedPrice}>{option.name}</option>
            )}
          </Form.Select>
          <Row className="justify-content-center">
            <Col xs={8}>
              <InputGroup className="my-3">
                <Button variant="outline-secondary" onClick={() => (amount > 1 ? updateAmount('-') : null)}>
                  <FontAwesomeIcon icon={faMinus} className={styles.icon} />
                </Button>
                <Form.Control
                  readOnly
                  value={amount} 
                  className="text-center"
                />
                <Button variant="outline-secondary" align="end" onClick={() => updateAmount('+')}>
                  <FontAwesomeIcon icon={faPlus} className={styles.icon} />
                </Button>
              </InputGroup>
            </Col>
          </Row>
          <h5>Price: ${fullPrice*amount || product.minPrice*amount}</h5>
          <Row className="justify-content-center">
              <Col xs={12}>
                {active && <Button className={styles.successBtn} variant="success">Added!</Button>}
                {!active && <Button className={styles.cartBtn} onClick={addToCart} variant="secondary">Add to cart</Button>}
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