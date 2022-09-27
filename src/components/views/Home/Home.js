import { Container } from 'react-bootstrap';
import Products from '../../features/Products/Products';

const Home = () => {
  return(
  <Container className="my-4">
    <h1>Home</h1>
    <Products />
  </Container>
  )
};

export default Home;