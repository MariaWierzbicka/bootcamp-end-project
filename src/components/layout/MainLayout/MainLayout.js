// import MainMenu from './../MainMenu/MainMenu';
// import Footer from './../Footer/Footer';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const MainLayout = ({ children }) => (
  <div>
    <Header />
    {children}
    <Footer></Footer>

  </div>
);

export default MainLayout;