import './App.css';

//Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' //it is used for the endpoints

//Components
import Header from './components/Header';

//Screens
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import ProductCreateScreen from './screens/ProductCreateScreen';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>

          <Route path='/' element={<HomeScreen/>} exact/>
          <Route path='product/:id' element={<ProductDetailScreen/>} />
          <Route path='product/create' element={<ProductCreateScreen/>} />

        </Routes>
      </div>
    </Router>
      
  );
}

export default App;
