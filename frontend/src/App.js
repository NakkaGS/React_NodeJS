import './App.css';

//Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' //it is used for the endpoints

//Components
import HeaderNew from './components/HeaderNew'

//Screens
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import ProductCreateScreen from './screens/ProductCreateScreen';
import ProductListScreen from './screens/ProductListScreen'

import CartScreen from './screens/CartScreen';
import PaymentSuccess from './screens/PaymentSuccess';
import PaymentFailed from './screens/PaymentFailed';

import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';

import MyOrdersScreen from './screens/MyOrdersScreen';
import MyOrderDetailScreen from './screens/MyOrderDetailScreen'

import CategoryListScreen from './screens/CategoryListScreen'
import CategoryCreateScreen from './screens/CategoryCreateScreen'

import AdminScreen from './screens/AdminScreen';


function App() {
  return (
    <Router>
      <div>
        <HeaderNew/>
        <Routes>

          <Route path='/' element={<HomeScreen/>} exact/>
          <Route path='product/:id' element={<ProductDetailScreen/>} />
          <Route path='product/create' element={<ProductCreateScreen/>} />
          <Route path='product/list' element={<ProductListScreen/>} />

          <Route path='category' element={<CategoryListScreen/>} />
          <Route path='category/create' element={<CategoryCreateScreen/>} />

          <Route path='cart' element={<CartScreen/>}/>

          <Route path='register' element={<RegisterScreen/>}/>
          <Route path='login' element={<LoginScreen/>}/>
          <Route path='profile' element={<ProfileScreen/>}/>

          <Route path='admin' element={<AdminScreen/>}/>

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
