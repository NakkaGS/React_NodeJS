import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' //it is used for the endpoints

import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import Header from './components/Header';

function App() {
  return (
    <Router>
    <div>
      <Header />
      <Routes>

        <Route path='/' element={<HomeScreen/>} exact/>
        <Route path='product/:id' element={<ProductDetailScreen/>} />

      </Routes>
    </div>
    </Router>
      
  );
}

export default App;
