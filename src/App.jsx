import { Route, Routes } from "react-router-dom";
import LoginPage from "./component/LoginPage";
import SigupPage from "./component/SigupPage";
import ForgotpwPage from "./component/ForgotpwPage";
// import AuthProvider from "./context/Authcontext";
import Home from "./component/Home";
import Shop from "./component/Shop";
import ProductDetailes from "./component/ProductDetailes";
import FAQs from "./component/FAQs";
import Teams from "./component/Teams";
import Blog from "./component/Blog";
import Contact from "./component/Contact";
import Homeslid from "./component/Homeslid";
import HomeShop from "./component/HomeShop";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Checkout from "./component/Checkout";
import Sliderswiper from "./component/Sliderswiper";
import Dashboard from "./component/dashboard/Dashboard";

function App() {
  return (
    <>
        <Navbar />
        <Routes>
          <Route path="/" element={<><Homeslid /><Sliderswiper/> 
          {/* <HomeShop /> */}
          </>}/>
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Sigup" element={<SigupPage />} />
          <Route path="/ForgotpwPage" element={<ForgotpwPage />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/Shop/:productId" element={<ProductDetailes />} />
          <Route path="/FAQs" element={<FAQs />} />
          <Route path="/Terms" element={<Teams />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          

          <Route path="*" element={<><h1>Page Not Found</h1></>} />
        </Routes>
        <Footer />
    </>
  );
}

export default App;
