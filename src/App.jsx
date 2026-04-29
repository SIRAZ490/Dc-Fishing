import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AnnouncementBar from './components/layout/AnnouncementBar';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/layout/CartDrawer';
import WhatsAppButton from './components/layout/WhatsAppButton';
import BackToTop from './components/layout/BackToTop';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import SalePage from './pages/SalePage';
import VisitUsPage from './pages/VisitUsPage';
import BrandsPage from './pages/BrandsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <AnnouncementBar />
      <Navbar />
      <CartDrawer />
      <Routes>
        <Route path="/"            element={<HomePage />} />
        <Route path="/shop"        element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/contact"     element={<ContactPage />} />
        <Route path="/about"       element={<AboutPage />} />
        <Route path="/sale"        element={<SalePage />} />
        <Route path="/visit"       element={<VisitUsPage />} />
        <Route path="/brands"      element={<BrandsPage />} />
        <Route path="/blog"        element={<ShopPage />} />
        <Route path="*"            element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </BrowserRouter>
  );
}
