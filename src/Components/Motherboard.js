import React, { useEffect } from 'react';
import Item from './Item';
import '../css/Motherboard.css';
import { getProducts } from '../action';
import { connect } from 'react-redux';

const Motherboard = (props) => {

    useEffect(() => {
        props.getProducts();
    }, []);

    const renderList = props.prodList.map(({ _id, img, price, title }) => {
        return <Item id={_id} title={title} src={img} price={price} />;
    })


    return (
        <div className="ItemContainer">
            <div className="ItemGrid">
                {renderList}

            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return ({
        prodList: state.prodList,
    })
}


export default connect(mapStateToProps, { getProducts })(Motherboard);