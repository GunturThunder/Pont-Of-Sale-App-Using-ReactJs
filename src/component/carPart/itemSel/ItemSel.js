import React from 'react';
import './ItemSel.css';
import logo from './pic.png';

const ItemSel = () => {
    return(
        <div className="itemSel">
            <center><img src={logo} style={{marginTop: "35px"}}/><br/><b>Your Cart Is Empty</b></center>
        </div>
    )
}

export default ItemSel;