import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import {form,label,input} from 'semantic-ui-react';


class ProductsList extends React.Component {
    constructor(props){
        super(props);
        this.state = {custList:[],custInfo:[],custEdit:[],custDelete:[],AddName:"",AddAddress:"",DeletId:0,EditId:0,EditAddress:0,EditName:"DefaultName",isNameChanged:false,isAddressChanged:false};
        this.testEdit =  this.testEdit.bind(this);
      
    }
    componentDidMount() {
        this.getCustomerList(); 
    }

    getCustomerList(){
        axios.get('./getProducts').then(res => {
            this.setState({custList:res.data});
           // console.log(res.data);
        });
    }

    getCustomerInfo(id){
        axios.get('./getProductInfo?Id='+id).then(res => {
            this.setState({custInfo:res.data});
            //console.log(this.state.custInfo.Name);
        });
        $('#info').modal('show');
    }

    getCustomerEdit(id){
        axios.get('./getProductInfo?Id='+id).then(res => {  
            this.setState({custEdit:res.data});
         
            {this.state.custEdit.map((product)=> {
                <div key={product.ProductId}>
                    {this.setState({EditId:product.ProductId,EditName:product.ProductName,EditAddress:product.PriceProduct})}
                {console.log("EditId :"+this.state.EditId + "EditName: "+this.state.EditName + "EditAddress : " + this.state.EditAddress)}
            
                </div>})}

        });
        $('#edit').modal('show');
    }

    getCustomerDelete(id){
        axios.get('./getProductInfo?Id='+id).then(res => {
            this.setState({custDelete:res.data,DeletId:id});
           // console.log("-id:-"+this.state.custDelete.Id + "-name:-" +this.state.custDelete.Name + "-address:-"+this.state.custDelete.Price + "---");
        });
        $('#delete').modal('show');
    }

    CustomerDelete(){
        axios.get('./Delete?Id='+ this.state.DeletId);
        window.location.reload('./Index');
    }

    OpenDialogAdd(){ 
        $('#add').modal('show');
    }

    OpenDialogDelete(){ 
        $('#delete').modal('show');
    }

    AddCustomerOnChange(e){
        if(e.target.name == "AddName"){
            this.setState({AddName:e.target.value})
        }else{
            this.setState({AddAddress:e.target.value})
        }
        
    }

    submitAddCustomer(){
        axios.post('./Create/', {
            ProductName: this.state.AddName,
            ProductPrice:this.state.AddAddress
        });
        event.preventDefault();
        window.location.reload('./Index');
    }


   

    handleChangeName(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({EditName:value,isNameChanged:true});
    }
    handlechangeAddress(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({EditAddress:value,isAddressChanged:true});
    }
    
    testEdit(){
       
        axios.post('./Edit/', {
            ProductId:this.state.EditId ,
            ProductName: this.state.EditName,
            ProductPrice:this.state.EditAddress 
        });
        alert(this.state.EditAddress);
        window.location.reload('./Index');
        
       
    }
    render() {
        
    const customers = this.state.custList.map((customer)=>
    <tr key={customer.Id}>
        <td data-label="Name" >{customer.ProductName}</td>
        <td data-label="Address" >{customer.ProductPrice}</td>
        <td data-label="Action" ><button className="ui basic button" onClick={this.getCustomerEdit.bind(this,customer.ProductId)}><i className="edit icon"></i>Edit</button> <button className="ui basic button" onClick={this.getCustomerInfo.bind(this,customer.ProductId)}><i className="info circle icon"></i>Info</button> <button className="ui basic button" onClick={this.getCustomerDelete.bind(this,customer.ProductId)}><i className="trash alternate outline icon"></i>Remove</button></td>
    </tr>
    );

    return (
    <div >
            
    <h1>Products</h1>
        <button className="ui basic button" onClick={this.OpenDialogAdd}>
        <i className="icon user"></i>
        Add Products
        </button>
 
 

        <table className="ui table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {customers}
            </tbody>
            </table>


        <div class="ui modal" id="info">
            <i class="close icon"></i>
            <div class="header">
            Product Details
            </div>
            <div class="content">
                <div class="description">
        {this.state.custInfo.map((product) =>
        <div>
        
         <p>Name   : {product.ProductName}</p>
                    
                    
        <p>Price : {product.ProductPrice}</p>
        
        </div>
        )}
                </div>
            </div>
            <div class="actions">

            <div class="ui button">
            Close
            </div>

            </div>
        </div>


        <div class="ui modal" id="delete">
            <i class="close icon"></i>
            <div class="header">
            Delete Customer 
            </div>
                <div class="content">
                    <div class="description">
                        <p>Are you sure you want to delete this customer ?</p>
                {this.state.custDelete.map((product)=> <div key={product.ProductId}>
                
        <p>Id : {product.ProductId}</p>
        <p>Name : {product.ProductName}</p>
        <p>Price    : {product.ProductPrice}</p>
                        
                        
                        
                        
        </div>)}
                    </div>
                </div>
                <div class="actions">
                    <div class="ui button" onClick={this.CustomerDelete.bind(this)}>
                    Confirm
                    </div>
                    <div class="ui button" >
                    Cancel
                    </div>
                </div>
        </div>




        <div class="ui modal" id="edit">
            <i class="close icon"></i>
            <div class="header">
            Customer Details
            </div>
                <div class="content">
                    <div class="description">
                        <form class="ui form">
                    {this.state.custEdit.map((product)=> 
                        <div key={product.ProductId}>
                            
                        <div class="field">
                        <label>Name</label>
                        <input type="text"  name={"name"+product.ProductId} defaultValue={product.ProductName} placeholder="Name" onChange={this.handleChangeName.bind(this)}/>
                        </div>
                        <div class="field">
                        <label>Address</label>
                        <input type="text" name={"address"+product.ProductId} defaultValue={product.ProductPrice} placeholder="Address" onChange={this.handlechangeAddress.bind(this)} / >          
                        </div>

                        </div>
                        
                        )}


                        </form>
                    </div>
                </div>
            <div class="actions">        
                <div class="ui button" onClick={this.testEdit.bind(this) }>
                Save              
                </div>
                <div class="ui button">
                Close
                </div>
            </div>
        </div>



        <div class="ui modal" id="add">
            <i class="close icon"></i>
            <div class="header">
            Customer Details
            </div>
                <div class="content">  
                    <div class="description">
                    <form class="ui form"  onSubmit={this.submitAddCustomer.bind(this)}>
                        <div class="field">
                            <label>First Name</label>
                            <input type="text" name="AddName"   placeholder="Product Name" onChange={this.AddCustomerOnChange.bind(this)}/>
                        </div>
                            <div class="field">
                            <label>Last Name</label>
                            <input type="text" name="AddAddress"  placeholder="Price" onChange={this.AddCustomerOnChange.bind(this)}/>
                        </div>
                            <div class="actions">               
                                <button class="ui button" type="submit">Submit</button>
                                <div class="ui button">
                                Close
                                </div>
                            </div>
                    </form>
                </div>
            </div>                
        </div>
    </div>
         );
  }
                    }

                    
export default ProductsList;