import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addItem, subItem, getProducts } from '../action';

const AddSubItem = (props) => {
    
    const addOnClick = (quantity) => {
        props.addItem(quantity);
    }
    
    const subOnClick = (quantity) => {
        props.subItem(quantity);
    }

    return (
        <div className="AddSubButton">
            <button className="ui small primary button" onClick={() => { props.subOnClick(); subOnClick(props.quantity)}}>
                -
            </button>
            <div className="countItem" >
                {/* {props.items[props.id]} */}
                {props.quantity}
            </div>
            <button className="ui small button" onClick={() => {props.addOnClick(); addOnClick(props.quantity)}}>
                +
            </button>
        </div>
    );
}

const mapStateToProps = state => {
    return { items: state.items };
}

export default connect(mapStateToProps, { addItem, subItem })(AddSubItem);