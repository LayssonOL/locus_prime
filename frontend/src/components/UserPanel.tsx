import * as React from "react";
import * as UserServices from "../services/user";
import { useState, useEffect } from "react";
import Product from '../components/Product';
import '../styles/user_panel.css'

const UserPanel = (props: any) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // setProducts(products);
        getMyProducts();
    }, [])
    
    const getMyProducts = () => {
        // console.log(props.user)
        const prods = UserServices.getProducts(props.user.id);
        // console.log(prods);
        const list = prods.then((prod: any) => {
            // console.log(prod);
            setProducts(prod);
        })
        // return prods.unsubscribe();
    }

  return (
    <div className="container">
      <div className="header">
        <p>{props.user.name} Console</p>
      </div>
      <div className="my-products">
        <p>Products</p>
        <ul>
            {products.map((product: any) => {
                return(
                    <li key={product.id}>
                        <Product product={product} />
                    </li>
                )
            })}
        </ul>
      </div>
      <div>
        {/* <button>Cadastrar Produto</button>
        <button>Vender Produto</button> */}
      </div>
    </div>
  );
};

export default UserPanel;
