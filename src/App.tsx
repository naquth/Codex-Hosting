import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { CartProvider } from './context/CartContext';

// Komponen Halaman Utama
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Locations from './components/Locations';
import Pricing from './components/Pricing';
import Questions from './components/Questions';
import Experience from './components/Experience';
import Reviews from './components/Reviews';
import Cta from './components/Cta';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

// Import semua halaman baru
import DiscordPricing from './pages/discord';
import MinecraftPricing from './pages/minecraft';
import VpsPricing from './pages/vps';
import LavaLinkPricing from './pages/lavalink';
import AboutUs from './pages/aboutus';
import Support from './pages/support';
import Docs from './pages/docs';
import TOS from './pages/tos';
import PrivacyPolicy from './pages/privacy';
import StatusPage from './pages/status';
import Cart from './pages/cart';
import Checkout from './pages/checkout';

// ====================================================
// Import Admin Pages
// ====================================================
import AdminLogin     from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers     from './pages/admin/Users';
import AdminServices  from './pages/admin/Services';
import AdminOrders    from './pages/admin/Orders';
import AdminInvoices  from './pages/admin/Invoices';
import AdminTickets   from './pages/admin/Tickets';
import AdminAnalytics from './pages/admin/Analytics';
import AdminSettings  from './pages/admin/Settings';

// ====================================================
// Import Client Area Pages
// ====================================================
import Login from './pages/client/Login';
import Register from './pages/client/Register';
import Dashboard from './pages/client/Dashboard';
import Services from './pages/client/Services';
import Billing from './pages/client/Billing';
import Tickets from './pages/client/Tickets';
import ClientPricing from './pages/client/Pricing';
import ClientCart from './pages/client/Cart';
import ClientCheckout from './pages/client/Checkout';
import AccountSettings from './pages/client/AccountSettings';

// Komponen untuk scroll ke atas saat ganti halaman
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Check if current path is a client area route (hides public navbar & footer)
const isClientAreaRoute = (pathname: string) =>
  pathname.startsWith('/client/') || pathname.startsWith('/admin/');

const AppContent = () => {
  const { pathname } = useLocation();
  const isClient = isClientAreaRoute(pathname);

  return (
    <div className="min-h-screen">
      {/* Sembunyikan Navbar publik di client area */}
      {!isClient && <Navbar />}
      <main>
        <Routes>
          {/* ---- Rute Halaman Utama ---- */}
          <Route path="/" element={<Home />} />

          {/* ---- Rute Halaman Layanan ---- */}
          <Route path="/discord" element={<DiscordPricing />} />
          <Route path="/minecraft" element={<MinecraftPricing />} />
          <Route path="/vps" element={<VpsPricing />} />
          <Route path="/lavalink" element={<LavaLinkPricing />} />

          {/* ---- Rute Halaman More ---- */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/support" element={<Support />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/tos" element={<TOS />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/status" element={<StatusPage />} />

          {/* ---- Cart & Checkout ---- */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* ====================================================
              CLIENT AREA ROUTES
              ==================================================== */}
          <Route path="/client/login" element={<Login />} />
          <Route path="/client/register" element={<Register />} />
          <Route path="/client/dashboard" element={<Dashboard />} />
          <Route path="/client/services" element={<Services />} />
          <Route path="/client/pricing" element={<ClientPricing />} />
          <Route path="/client/cart" element={<ClientCart />} />
          <Route path="/client/checkout" element={<ClientCheckout />} />
          <Route path="/client/billing" element={<Billing />} />
          <Route path="/client/tickets" element={<Tickets />} />
          <Route path="/client/settings" element={<AccountSettings />} />

          {/* ====================================================
              ADMIN ROUTES
              ==================================================== */}
          <Route path="/admin/login"     element={<AdminLogin />}     />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users"     element={<AdminUsers />}     />
          <Route path="/admin/services"  element={<AdminServices />}  />
          <Route path="/admin/orders"    element={<AdminOrders />}    />
          <Route path="/admin/invoices"  element={<AdminInvoices />}  />
          <Route path="/admin/tickets"   element={<AdminTickets />}   />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/settings"  element={<AdminSettings />}  />

          {/* ---- Rute Not Found ---- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {/* Sembunyikan Footer publik di client area */}
      {!isClient && <Footer />}
    </div>
  );
};

const Home = () => (
  <>
    <Hero />
    <Features />
    <Locations />
    <Pricing />
    <Questions />
    <Experience />
    <Reviews />
    <Cta />
  </>
);

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
