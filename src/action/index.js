import axios from "axios";

const token = localStorage.getItem("Token");

export const addItem = (id) => {
  return {
    type: "ADD_ITEM",
    payload: id,
  };
};

export const subItem = (id) => {
  return {
    type: "SUB_ITEM",
    payload: id,
  };
};

export const getProducts = (TYPE) => {
  //   console.log(token);
  // console.log(TYPE);
  return async function (dispatch) {
    const response = await axios({
      method: "get",
      url: `http://localhost:5000/api/products/${TYPE}`,
      headers: { type: TYPE },
    });
    dispatch({ type: "FETCH_PRODUCTS", payload: response.data });
  };
};

export const makeZero = (id) => {
  return {
    type: "MAKE_ZERO",
    payload: id,
  };
};

export const addItemToCart = (id, quantity) => {
  console.log("additem   ",quantity);
  if(!quantity)
  quantity=1;

  return async function (dispatch) {
    // await axios.post(`http://localhost:5000/cart/${id}/${quantity}`);
    await axios({
        url: `http://localhost:5000/cart/${id}/${quantity}/`,
      method: "POST",
      headers: {
        Authorization: token
      }
    }).then(()=> console.log(token))
    .catch((err) => console.log(err))
    dispatch({ type: "ADD_TO_CART", payload: "Saved to DB" });
  };
};

export const getCartItems = () => {
  return async function (dispatch) {
    // const response = await axios.get("http://localhost:5000/cart/products");
    const response = await axios({
    url: "http://localhost:5000/cart/products",
      method: "GET",
      headers: {
        Authorization: token,
      }
    });
    
    dispatch({ type: "FETCH_CART_ITEMS", payload: response.data });
  };
};

export const removeFromCart = (id) => {
  return async function (dispatch) {
    // const response = await axios.delete(
    //   `http://localhost:5000/cart/products/remove/${id}`
    // );
    // console.log(response.data);
    const response = await axios({
        url: `http://localhost:5000/cart/products/remove/${id}`,
          method: "DELETE",
          headers: {
            Authorization: token,
          }
        });
    dispatch({ type: "FETCH_CART_ITEMS", payload: response.data });
  };
};
