import React from "react";
import NewShirtForm from "./NewShirtForm";
import ShirtList from "./ShirtList";
import ShirtDetail from "./ShirtDetail";
import EditShirtForm from "./EditShirtForm";
import PropTypes from "prop-types";
import { connect } from 'react-redux';


class ShirtControl extends React.Component {

  constructor(props){
    super(props);
    this.state={
      // masterShirtList: [],
      formVisibleOnPage: false,
      selectedShirt: null,
      editing: false
    };
  }

  handleClick = () => {
    if(this.state.selectedShirt != null){
      this.setState({
        formVisibleOnPage: false,
        selectedShirt: null,
        editing: false
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage
      }));
    }
  }

  // handleEditingShirt = (shirtToEdit) => {
  //   const editedMasterShirtList = this.state.masterShirtList
  //   .filter(shirt => shirt.id !== this.state.selectedShirt.id)
  //   .concat(shirtToEdit);
  //   this.setState({
  //     masterShirtList: editedMasterShirtList,
  //     editing: false,
  //     selectedShirt: null
  //   });
  // }
  handleEditingShirt = (shirtToEdit) => {
    const { dispatch } = this.props;
    const { id, name, description, quantity, price } = shirtToEdit;
    const action = {
      type: 'EDIT_SHIRT',
      id: id,
      name: name,
      description: description,
      quantity: quantity,
      price: price
    }
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }

  handleIncreaseQuantity = (shirtToIncrease) => {
    // console.log("you have reached increase the button thing");
    // console.log(shirtToIncrease);

    const shirt = this.state.masterShirtList.filter(shirt => shirt.id === this.state.selectedShirt.id)[0]
    parseInt(shirt.quantity)

    const editedMasterShirtList = this.state.masterShirtList
    .filter(shirt => shirt.id !== this.state.selectedShirt.id)
    .concat(shirt);
    this.setState({
      masterShirtList: editedMasterShirtList,
      // editing: false,
      // selectedShirt: null
    });

  }
  // handleDecreaseQuantity = (id) => {
  //   console.log("you have reached decrease the button thing");
  // }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  // handleDeletingShirt = (id) => {
  //   const newMasterShirtList = this.state.masterShirtList.filter(shirt => shirt.id !== id);
  //   this.setState({
  //     masterShirtList: newMasterShirtList,
  //     selectedShirt: null
  //   });
  // }
  
  handleDeletingShirt = id => {
    const { dispatch } = this.props;
    const action = {
      type: 'DELETE_TICKET',
      id: id
    }
    dispatch(action);
    this.setState({selectedShirt: null});
  }

  // handleAddingNewShirt = (newShirt) => {
  //   const newMasterShirtList = this.state.masterShirtList.concat(newShirt);
  //   this.setState({masterShirtList: newMasterShirtList, formVisibleOnPage: false});
  // }

  handleAddingNewShirt = newShirt => {
    const { dispatch } = this.props;
    const { name, description, quantity, price, id } = newShirt;
    const action = {
      type: 'ADD_SHIRT',
      id: id,
      name: name,
      description: description,
      quantity: quantity,
      price: price
    }
    dispatch(action);
    this.setState({formVisibleOnPage: false});
  }

  handleChangingSelectedShirt = (id) => {
    const selectedShirt = this.props.masterShirtList[id];
    this.setState({selectedShirt: selectedShirt});
  }

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    if(this.state.editing){
      currentlyVisibleState = <EditShirtForm shirt = {this.state.selectedShirt} onEditShirt = {this.handleEditingShirt} />
      buttonText = "Return to list of shirts"
    } else if (this.state.formVisibleOnPage){
      currentlyVisibleState= <NewShirtForm onNewShirtCreation={this.handleAddingNewShirt}/>
      buttonText="Back to All Shirts"
    } else if (this.state.selectedShirt!=null){
      currentlyVisibleState = <ShirtDetail onIncreaseQuantity = {this.handleIncreaseQuantity } onClickingEdit={this.handleEditClick} onClickingDelete={this.handleDeletingShirt} shirt = {this.state.selectedShirt} />
      buttonText="Back to All Shirts"
    }
      else {
      currentlyVisibleState = <ShirtList shirtList={this.props.masterShirtList} onShirtSelection={this.handleChangingSelectedShirt} />;
      buttonText= "Add a new shirt";
    }

    return(
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    )
  }

}
ShirtControl.propTypes = {
  masterShirtList: PropTypes.object
}
const mapStateToProps = state => {
  return {
    masterShirtList: state
  }
}
ShirtControl = connect(mapStateToProps)(ShirtControl);

export default ShirtControl;