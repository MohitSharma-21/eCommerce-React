import {React,useState} from 'react';
import { connect } from 'react-redux';

import '../css/Item.css';
import AddSubItem from './AddSubItem.js';
import { makeZero, addItemToCart, getCartItems } from '../action';

const Item = (props) => {

    const [quantity, setquantity] = useState(0);

    const addOnClick = (id) => {
        setquantity(prevquantity => prevquantity+1);
    }
    
    const subOnClick = (id) => {
        if(quantity>0) 
            setquantity(prevquantity => prevquantity-1);
    }
    const addToCart = async (id) => {
        await props.makeZero(quantity);
        await props.addItemToCart(id, quantity);
        await props.getCartItems();
    }


    return (
        <div className="fullItem">
            <img src={props.src} alt="Not Available" />

            <div className="titleItem">
                {props.title}
            </div>

            <div className="priceAndButton">
                <div className="priceItem">
                    &#8377;{props.price}
                </div>
                <AddSubItem id={props.id} quantity={quantity} addOnClick={addOnClick} subOnClick={subOnClick} />
            </div>
            <div className="CartAndBuy">
                <div className="ui buttons">
                    <button className="ui button" onClick={() => {setquantity(0); addToCart(props.id)}}>Add to Cart</button>
                    <div className="or"></div>
                    <button className="ui positive button">Buy Now</button>
                </div>
            </div>
        </div>


    );
}

const mapStateToProps = state => {
    return {
        items: state.items,
        cartItems: state.cartItems
    }
}

export default connect(mapStateToProps, { makeZero, addItemToCart, getCartItems })(Item);