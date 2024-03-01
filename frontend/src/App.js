import './css/App.css'
import Nav from './components/Nav';
import Carousal from './pages/Carousal';
import { Route,Routes } from 'react-router-dom';
import Addnewcat from './Admin/Addnewcat';
import Login from './pages/Login'
import Signin from './pages/Signin';
import AddFood from './Admin/AddFood';
import Update from './pages/Update'
import { Cardprovider } from './components/Contexred';
import Delivered from './pages/Deliverder';
import MyOrder from './pages/NewOrder';
import Carousal2 from './pages/Carousal2';
import Temp from './components/Temp';
import OutFordel from './pages/OutFordel'
import TermsAndConditions from './About/Term';
import PrivacyPolicy from './About/Privacy';

import Footer from './components/Fotter'
function App() {
  return (
    <Cardprovider>
       
        <Nav/>
        <Routes>
          <Route path='/'element={<Carousal/>}/>
          <Route path='/login'element={<Login/>}/>
          <Route path='/Change'element={<Carousal2/>}/>
          <Route path='/createuser'element={<Signin/>}/>
          <Route path='/adminaddfood'element={<AddFood/>}/>
          <Route path='/adminaddcat'element={<Addnewcat/>}/>
          <Route path='/orders'element={<MyOrder/>}/>
          <Route path='/outfordel'element={<OutFordel/>}/>
          <Route path='/delivaredallorders'element={<Delivered/>}/>
          <Route path='/update/:id'element={<Update/>}/>
          <Route path='/term' element={<TermsAndConditions/>}/>
          <Route path='/policy' element={<PrivacyPolicy/>}/>
        </Routes>
        <Footer/>
        <Temp/>
     
    </Cardprovider>
      
        
        
    
  );
}

export default App;
