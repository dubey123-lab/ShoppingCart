import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import   InternalLayout from "../src/Components/Layouts/InternalLayout"
import ExternalLayout from "../src/Components/Layouts/ExternalLayout"
import Addproduct from "../src/Components/Pages/Addproduct"
import Displayproduct from "./Components/Pages/Displayproduct";
import DisplayProduct from "./Components/Pages/Customer/DisplayProduct";
import AddtoCart from "./Components/Pages/Customer/AddtoCart";
import { ProductDetail } from "./Components/Pages/Customer/ProductDetail";


//// Import Layouts

//// Import Components

function Routes() {
  // Internal Layout for Admin
  // External Layout for customr

  return (
   
      <Router>
        <Switch>
          <InternalLayout exact path="/" component={Addproduct} />
          <InternalLayout exact path="/display_product" component={Displayproduct} />  
          <ExternalLayout exact path="/product_list"  component={DisplayProduct} />
          <ExternalLayout exact path="/cartlist"  component={AddtoCart} />
          <ExternalLayout exact path="/product_detail/:id"  component={ProductDetail} />
         
        </Switch>
      </Router>
  
  );
}

export default Routes;
