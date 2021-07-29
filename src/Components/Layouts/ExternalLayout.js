import React from "react";
import { Route } from "react-router-dom";
import Customernavbar from "../Pages/Customer/Customernavbar"

const ExternalLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <div>
           <Customernavbar />
          <Component {...matchProps} />
        </div>
      )}
    />
  );
};

export default ExternalLayout;
