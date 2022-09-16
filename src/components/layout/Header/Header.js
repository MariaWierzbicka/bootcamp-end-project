import { Container, Navbar, Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom';

import styles from './Header.module.scss';

const Header = () => {

  return(
    <Navbar>
      <Container>
        <Navbar.Brand className={styles.logo}>
          Brand
        </Navbar.Brand>
        <Nav>
          <Link className={styles.navlink} to="/">Home</Link>
          <Link className={styles.navlink} to="/cart">Cart</Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Header;