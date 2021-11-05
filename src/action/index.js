import axios from "axios";

export const addItem = (id) => {
    return {
        type: 'ADD_ITEM',
        payload: id
    };
};

export const subItem = (id) => {
    return {
        type: 'SUB_ITEM',
        payload: id
    };
};

export const getProducts = (TYPE) => {
    return async function (dispatch) {
        const response = await axios({
            method: 'get',
            url: `http://localhost:5000/api/products/${TYPE}`,
            headers: { type: TYPE  } 
        })
        dispatch({ type: 'FETCH_PRODUCTS', payload: response.data });
    };
}

export const makeZero = (id) => {
    return {
        type: 'MAKE_ZERO',
        payload: id
    };
}

export const addItemToCart = (id, quantity) => {
    return async function (dispatch) {
        await axios.post(`http://localhost:5000/cart/${id}/${quantity}`);
        dispatch({ type: 'ADD_TO_CART', payload: 'Saved to DB' });
    }
}

export const getCartItems = () => {
    return async function (dispatch) {
        const response = await axios.get('http://localhost:5000/cart/products');

        dispatch({ type: 'FETCH_CART_ITEMS', payload: response.data });
    };
}

export const removeFromCart = (id) => {
    return async function (dispatch) {
        const response = await axios.delete(`http://localhost:5000/cart/products/remove/${id}`, 
        );
        dispatch({ type: 'FETCH_CART_ITEMS', payload: response.data });
    }
}