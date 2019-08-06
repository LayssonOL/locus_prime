import React from 'react';
import UserServices from '../services/userServices';

const User = (props) => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        setProducts(UserServices.getMyProducts());
    }, [products]);
    
    return(
        <div>

        </div>
    );
}
