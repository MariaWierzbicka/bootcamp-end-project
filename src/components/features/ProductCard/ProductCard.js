import { Card, Col, Button, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
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
            <Link to={`/products/${_id}`}><Button className={styles.cardBtn} >Details</Button></Link>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  )
};

export default ProductCard;