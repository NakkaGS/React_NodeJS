import './App.css';

//Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' //it is used for the endpoints

//Components
import Header from './components/Header'

//Screens
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import ProductCreateScreen from './screens/ProductCreateScreen';
import ProductListScreen from './screens/ProductListScreen';

import ProductCategoryScreen from './screens/ProductCategoryScreen';

import CartScreen from './screens/CartScreen';
import PaymentSuccess from './screens/PaymentSuccess';
import PaymentFailed from './screens/PaymentFailed';

import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';

import MyOrderDetailScreen from './screens/MyOrderDetailScreen'

import CategoryListScreen from './screens/CategoryListScreen'
import CategoryCreateScreen from './screens/CategoryCreateScreen'

import AdminScreen from './screens/AdminScreen';
import OrdersListScreen from './screens/OrdersListScreen';
import UserListScreen from './screens/UserListScreen';
import ProductUpdateScreen from './screens/ProductUpdateScreen';

import MobileMenu from './components/MobileMenu'
import MobileLeftMenu from './components/MobileLeftMenu'
import Footer from './components/Footer'


function App() {
  return (
    <Router>
      <MobileMenu/>
      <MobileLeftMenu/>
      <div>
        <Header/>
        <Routes>

          <Route path='/' element={<HomeScreen/>} exact/>
          <Route path='product/:id' element={<ProductDetailScreen/>} />
          <Route path='category/:category' element={<ProductCategoryScreen/>} />


          <Route path='cart' element={<CartScreen/>}/>

          <Route path='register' element={<RegisterScreen/>}/>
          <Route path='login' element={<LoginScreen/>}/>
          <Route path='profile' element={<ProfileScreen/>}/>

          <Route path='myorders/:id' element={<MyOrderDetailScreen/>}/>
          <Route path='order/payment/success' element={<PaymentSuccess/>}/>
          <Route path='order/payment/failed' element={<PaymentFailed/>}/>

          {/* Admin Pages */}
          <Route path='admin' element={<AdminScreen/>}/>
          <Route path='admin/orders' element={<OrdersListScreen/>}/>

          <Route path='admin/users' element={<UserListScreen/>}/>

          <Route path='admin/category' element={<CategoryListScreen/>} />
          <Route path='admin/category/create' element={<CategoryCreateScreen/>} />

          <Route path='admin/product' element={<ProductListScreen/>} />
          <Route path='admin/product/create' element={<ProductCreateScreen/>} />
          <Route path='admin/product/:id' element={<ProductUpdateScreen/>} />

        </Routes>
      </div>
      <Footer/>
    </Router>
      
  );
}

export default App;
