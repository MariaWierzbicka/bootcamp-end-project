import { Container, Spinner, Alert } from 'react-bootstrap';
import { useSelector, useDispatch} from 'react-redux';
import { getProducts, loadProductsRequest, getRequest} from '../../../redux/productsRedux';
import { useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';

const Products = () => {
  const products = useSelector(getProducts);
  const request = useSelector(getRequest);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProductsRequest())
  }, [dispatch]);

  if(request.pending) return <h2>Loading...</h2>; 
  else if(request.error) return <Alert color="warning">{request.error}</Alert>;
  else if(!request.success || !products.length) return <Alert color="info">No products</Alert>;
  else if(request.success) return (
    <div>
      {products.map(product =>  <ProductCard key={product._id} id={product._id}/>)}
    </div>
  )
};

export default Products;