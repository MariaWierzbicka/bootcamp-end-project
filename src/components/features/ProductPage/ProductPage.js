import { Alert, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductById, getRequest, loadProductsRequest} from '../../../redux/productsRedux';
import { useEffect } from 'react';

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
      <h1>{product.name}</h1>
    </Container>
  )
};

export default ProductPage;