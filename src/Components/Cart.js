import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import '../css/Cart.css';
import { getCartItems } from '../action';
import CartItem from '../Components/CartItem';


const Cart = (props) => {

    useEffect(() => {
        props.getCartItems();
    }, []);

    const renderList = props.cartItems.map(obj => {
        return <CartItem obj={obj} />
    })
    return (
        <div className="CartItems">
            {renderList}
            
        </div>
    );
}

const mapStateToProps = state => {
    return {
        cartItems: state.cartItems,
        itemById: state.itemById
    };
}

export default connect(mapStateToProps, { getCartItems })(Cart);