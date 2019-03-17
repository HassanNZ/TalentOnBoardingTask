import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import {form,label,input} from 'semantic-ui-react';


class CustomersList extends React.Component {
    constructor(props){
        super(props);
        this.state = {custList:[],custInfo:[],custEdit:[],custDelete:[],AddName:"",AddAddress:"",DeletId:0,EditId:0,EditAddress:"DefaultAddress",EditName:"DefaultName",isNameChanged:false,isAddressChanged:false,infoName:"",infoAddress:""};
        this.customerEdit =  this.customerEdit.bind(this);
      
    }
    componentDidMount() {
        this.getCustomerList(); 
    }

    getCustomerList(){
        axios.get('./getCustomers').then(res => {
            this.setState({custList:res.data});
            });
    }

    getCustomerInfo(id){
        axios.get('./getCustomerInfo?Id='+id).then(res => {
            this.setState({custInfo:res.data});      
        });
       
        $('#info').modal('show');
    }

    getCustomerEdit(id){
        axios.get('./getCustomerInfo?Id='+id).then(res => {  
            this.setState({custEdit:res.data});
          
            {this.state.custEdit.map((customer)=> {
                <div key={customer.CustomerId}>
                    {this.setState({EditId:customer.CustomerId,EditName:customer.CustomerName,EditAddress:customer.CustomerAddress})}
                {console.log("EditId :"+this.state.EditId + "EditName: "+this.state.EditName + "EditAddress : " + this.state.EditAddress)}
            
                </div>})}
        });
        
        $('#edit').modal('show');
    }

     getCustomerDelete(id){
        axios.get('./getCustomerInfo?Id='+id).then(res => {
            this.setState({custDelete:res.data,DeletId:id});
           
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
            CustomerName: this.state.AddName,
            CustomerAddress:this.state.AddAddress
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
    
    customerEdit(){
                axios.post('./Edit/', {
                    CustomerId:this.state.EditId ,
                    CustomerName: this.state.EditName,
                    CustomerAddress:this.state.EditAddress 
                });
 
        window.location.reload('./Index');
    }
    render() {
        
    const customers = this.state.custList.map((customer)=>
    <tr key={customer.CustomerId}>
        <td data-label="Name" >{customer.CustomerName}</td>
        <td data-label="Address" >{customer.CustomerAddress}</td>
        <td data-label="Action" ><button className="ui basic button" onClick={this.getCustomerEdit.bind(this,customer.CustomerId)}><i className="edit icon"></i>Edit</button> <button className="ui basic button" onClick={this.getCustomerInfo.bind(this,customer.CustomerId)}><i className="info circle icon"></i>Info</button> <button className="ui basic button" onClick={this.getCustomerDelete.bind(this,customer.CustomerId)}><i className="trash alternate outline icon"></i>Remove</button></td>
    </tr>
    );

            return (
            <div >
            
            <h2>Customers</h2>
                <button className="ui basic button" onClick={this.OpenDialogAdd}>
        <i className="icon user"></i>
        Add Customer
        </button>
 
 

        <table className="ui table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
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
            Customer Details
            </div>
            <div class="content">
                <div class="description">
        {this.state.custInfo.map((customer) =>
        <div>
        
         <p>Name   : {customer.CustomerName}</p>
                    
                    
        <p>Address : {customer.CustomerAddress}</p>
        
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
                {this.state.custDelete.map((customer)=> <div key={customer.CustomerId}>
                
                <p>Id : {customer.CustomerId}</p>
                <p>Name : {customer.CustomerName}</p>
                <p>Address    : {customer.CustomerAddress}</p>
                        
                        
                        
                        
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
            {this.state.custEdit.map((customer)=> 
                        <div key={customer.CustomerId}>
                            
                        <div class="field">
                        <label>Name</label>
                        <input type="text"  name={"name"+customer.CustomerId} defaultValue={customer.CustomerName} placeholder="Name" onChange={this.handleChangeName.bind(this)}/>
                        </div>
                        <div class="field">
                        <label>Address</label>
                        <input type="text" name={"address"+customer.CustomerId} defaultValue={customer.CustomerAddress} placeholder="Address" onChange={this.handlechangeAddress.bind(this)} / >          
                        </div>

                        </div>
                        
                        )}

                        
                </form>
            </div>
        </div>
    <div class="actions">        
        <div class="ui button" onClick={this.customerEdit.bind(this) }>
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
                    <input type="text" name="AddName"   placeholder="First Name" onChange={this.AddCustomerOnChange.bind(this)}/>
                </div>
                    <div class="field">
                    <label>Last Name</label>
                    <input type="text" name="AddAddress"  placeholder="Last Name" onChange={this.AddCustomerOnChange.bind(this)}/>
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

                                     
export default CustomersList;
