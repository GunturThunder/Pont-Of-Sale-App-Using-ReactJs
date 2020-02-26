import React from 'react';
// import Cart from './cart/Cart';
// import ItemSel from './itemSel/ItemSel';
import './contentPart.css'
import Navbar from './navbar/Navbar';
import NavLeft from './navLeft/NavLeft';
import Content from './content/Content';
// import axios from 'axios';


const ContentPart = () => {
        return(
            <div className="content-part">
             <Navbar />
             <NavLeft />
            {/* <Content /> */}
         </div>
            
        )
    }
export default ContentPart;