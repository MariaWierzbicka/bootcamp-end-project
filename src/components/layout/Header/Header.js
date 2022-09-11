import { Container, Navbar, Nav } from 'react-bootstrap';
import styles from './Header.module.scss';

const Header = () => (
  <Navbar>
    <Container>
      <Navbar.Brand className={styles.logo}>
        Brand
      </Navbar.Brand>
      <Nav>
        <Nav.Link className={styles.navlink} href="/">Home</Nav.Link>
        <Nav.Link className={styles.navlink} href="/cart">Cart</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);

export default Header;