import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addItem, subItem, getProducts } from '../action';

const AddSubItem = (props) => {
    const [quantity, setquantity] = useState(0);

    const addOnClick = (id) => {
        setquantity(prevquantity => prevquantity+1);
        props.addItem(id);
    }

    const subOnClick = (id) => {
        
        if(quantity>0) 
        {
            setquantity(prevquantity => prevquantity-1);
        }
        props.subItem(id);
    }

    return (
        <div className="AddSubButton">
            <button className="ui small primary button" onClick={() => subOnClick(props.id)}>
                -
            </button>
            <div className="countItem" >
                {/* {props.items[props.id]} */}
                {quantity}
            </div>
            <button className="ui small button" onClick={() => addOnClick(props.id)}>
                +
            </button>
        </div>
    );
}

const mapStateToProps = state => {
    return { items: state.items };
}

export default connect(mapStateToProps, { addItem, subItem })(AddSubItem);