import { Card, Col, Button, Row} from 'react-bootstrap';
import styles from './ProductCard.module.scss';
const ProductCard = ({product}) => {
  const { name, minPrice, photo, _id } = product;
  return(
    <Col>
      <Card className={styles.cardBody}>
        <Card.Img src={photo} className={styles.cardImg} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            Price from: ${minPrice}
          </Card.Text>
          <Row xs={2} className="justify-content-center">
            <Button className={styles.cardBtn} href={`/products/${_id}`}>Details</Button>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  )
};

export default ProductCard;