import * as React from 'react';
import '../styles/product.css'

const Product = (props: any) => {
    return(
        <div className="element">
            <div>Name: {props.product.name}</div>
            <br/>
            <div>Price: {props.product.price}</div>
            <br/>
            <div>Size: {props.product.size}</div>
            <br/>
            <div>Stock: {props.product.stock}</div>
            <br/>
            <div>Type: {props.product.type}</div>
            <br/>
        </div>
    );
}

export default Product;