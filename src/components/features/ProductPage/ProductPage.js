import { Alert, Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductById, getRequest, loadProductsRequest} from '../../../redux/productsRedux';
import { useEffect } from 'react';
import styles from './ProductPage.module.scss';
import shortid from 'shortid';

const ProductPage = () => {
  const {id} = useParams();
  const product = useSelector(state => getProductById(state, id));
  const request = useSelector(getRequest);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(loadProductsRequest())
  }, [dispatch]);

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
          <h5>Options</h5>
          <Form.Select className={styles.dropdown}>
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
          <h5>Price: ${product.minPrice}</h5>
          <Row className="justify-content-center">
              <Col xs={12}>
                <Button className={styles.cartBtn}>Add to cart</Button>
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