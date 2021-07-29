
import axios from "axios";
import { SHOW_PRODUCT } from "./Constaint";


export const showProduct = () =>{
  return (dispatch) =>{
      axios
      .get("http://localhost:3000/product")
      .then((res)=>{
          console.log(res);
          const data = res.data
          dispatch({
              type : SHOW_PRODUCT,
              payload : data
          })
      })
      .catch((error) =>{
          console.log(error);
      })

  }
}

