import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const MainLayout = ({ children }) => (
  <div>
    <Header />
    {children}
    <Footer />

  </div>
);

export default MainLayout;