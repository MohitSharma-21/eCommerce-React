import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import '../css/CartItem.css';
import { removeFromCart } from '../action';

const CartItem = (props) => {
    
    const remove = (id) => {
        console.log(id)
        props.removeFromCart(id);
    }


    return (
        <div className="cartItem">
            <div onClick={() => remove(props.obj._id)}>
                <i class="window close icon" ></i>
            </div>
            <div className="itemImage">
                <img src={props.obj.img} />
            </div>
            <div className="itemInfo">
                <div className="itemTitle">
                    {props.obj.title}
                </div>
                <div className="Price">
                    Price : <span className="spaceIt">{props.obj.price}</span>
                </div>
                <div>
                    Quantity : <span className="spaceIt">{props.obj.quantity}</span>
                </div>
                <div>
                    Total = <span className="spaceIt">{(parseInt(props.obj.price.replace(/,/g, '')) * props.obj.quantity).toLocaleString()}</span>
                </div>
            </div>

        </div>

    );
}

// const mapStateToProps = state => {
//     return {
//         itemById: state.itemById,
//     };
// }

export default connect(null, { removeFromCart })(CartItem);