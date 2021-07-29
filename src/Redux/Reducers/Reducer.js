import {
  ADD_TO_CART,
  DELETE_CART,
  FETCH_PRODUCT,
  SHOW_PRODUCT,
} from "../Actions/Constaint";

const initialState = {
  product: [],
  cart: [],
  fetchProduct: {},
  qty: 0,
  totalPrice: 0,
  status: false,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };

      /////  Reducer for Product Detail
   
    case FETCH_PRODUCT:
      console.log("id is", action.id);
      return {
        ...state,
        fetchProduct: state.product.find(
          (item) => item.id === parseInt(action.id)
        ),
      };

    case ADD_TO_CART:
      console.log(" logged here ", action.payload);
      console.log("Fetch product is", state.fetchProduct);
      let addedItem = state.cart.find(
        (item) => item.id === action.payload.fetchProduct.id
      );

      const finalPrice =
        state.totalPrice +
        action.payload.fetchProduct.price * action.payload.quantity;
      action.payload.fetchProduct.quantity = action.payload.quantity;

      const totalQuantity = state.qty + action.payload.quantity;
      console.log("Total Quantity", totalQuantity);

      if (addedItem) {
        return state;
      } else {
        return {
          ...state,
          cart: [...state.cart, action.payload.fetchProduct],
          totalPrice: finalPrice,
          qty: totalQuantity,
        };
      }

    case DELETE_CART:
      let findPro = state.cart.find((product) => product.id === action.payload);
      const filltred = state.cart.filter(
        (product) => product.id !== action.payload
      );
      return {
        ...state,
        cart: filltred,
        totalPrice: state.totalPrice - findPro.price * findPro.quantity,
        qty: state.qty - findPro.quantity,
      };
    
    default:
      return state;
  }
}
