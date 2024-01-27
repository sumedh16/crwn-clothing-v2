import { Component } from "react";
import Home from './routes/home/home.component'
import Navigation from "./routes/navigation/navigation.component";
import { Route, Routes } from "react-router-dom";
class App extends Component{
  
  render(){
    return(
      <Routes>
        <Route path="/" element={<Navigation/>}>
          <Route index element={<Home/>}></Route>
          <Route path="shop" element={<h2>Inside Shop</h2>}></Route>
        </Route>
      </Routes>
    );
  }
}
export default App;
