import React from 'react';
import Shirt from "./Shirt";
import PropTypes from "prop-types";

function ShirtList(props){
  return(
    <React.Fragment>
      <h4>shirt list</h4>
      {Object.values(props.shirtList).map((shirt)=>
        <Shirt
        whenShirtClicked={props.onShirtSelection}
        name={shirt.name}
        description={shirt.description}
        quantity={shirt.quantity}
        price={shirt.price}
        id={shirt.id}
        key={shirt.id}
        />
        )}
    </React.Fragment>
  );
}

ShirtList.propTypes = {
  shirtList: PropTypes.object,
  onShirtSelection: PropTypes.func
};


export default ShirtList;

//name, description, quantity, price