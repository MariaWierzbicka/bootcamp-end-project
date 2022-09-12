import { Card, Col, Button } from 'react-bootstrap';
import styles from './ProductCard.module.scss';
const ProductCard = ({product}) => {
  
  return(
    <Col>
      <Card>
        <Card.Img src={product.photo} className={styles.cardImg} />
        <Card.Body className={styles.cardBody}>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary" href={`/products/${product._id}`}>Details</Button>
        </Card.Body>
      </Card>
    </Col>
  )
};

export default ProductCard;