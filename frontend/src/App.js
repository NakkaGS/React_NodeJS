import './App.css';

//Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' //it is used for the endpoints

//Components
import Header from './components/Header';

//Screens
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import ProductCreateScreen from './screens/ProductCreateScreen';
import CartScreen from './screens/CartScreen';

import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';

import PaymentSuccess from './screens/PaymentSuccess';
import PaymentFailed from './screens/PaymentFailed';
import MyOrdersScreen from './screens/MyOrdersScreen';
import MyOrderDetailScreen from './screens/MyOrderDetailScreen'

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>

          <Route path='/' element={<HomeScreen/>} exact/>
          <Route path='product/:id' element={<ProductDetailScreen/>} />
          <Route path='product/create' element={<ProductCreateScreen/>} />

          <Route path='cart' element={<CartScreen/>}/>

          <Route path='register' element={<RegisterScreen/>}/>
          <Route path='login' element={<LoginScreen/>}/>
          <Route path='profile' element={<ProfileScreen/>}/>

          <Route path='myorders' element={<MyOrdersScreen/>}/>
          <Route path='myorders/:id' element={<MyOrderDetailScreen/>}/>
          <Route path='order/payment/success' element={<PaymentSuccess/>}/>
          <Route path='order/payment/failed' element={<PaymentFailed/>}/>

        </Routes>
      </div>
    </Router>
      
  );
}

export default App;
