import { Container, Navbar, Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import styles from './Header.module.scss';

const Header = () => {

  return(
    <Navbar>
      <Container>
        <Navbar.Brand>
          <Link className={clsx(styles.logo, styles.navlink)} to="/">Wood shop</Link>
        </Navbar.Brand>
        <Nav>
          <Link className={styles.navlink} to="/">Home</Link>
          <Link className={styles.navlink} to="/cart">
            <FontAwesomeIcon icon={faCartShopping}/> Cart
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Header;