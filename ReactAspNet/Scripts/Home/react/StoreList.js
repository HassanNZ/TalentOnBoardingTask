import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import {form,label,input} from 'semantic-ui-react';


class Stores extends React.Component {
    constructor(props){
        super(props);
        this.state = {custList:[],custInfo:[],custEdit:[],custDelete:[],AddName:"",AddAddress:"",DeletId:0,EditId:0,EditAddress:"DefaultAddress",EditName:"DefaultName",isNameChanged:false,isAddressChanged:false};
        this.testEdit =  this.testEdit.bind(this);
      
    }
    componentDidMount() {
        this.getCustomerList(); 
    }

    getCustomerList(){
        axios.get('./getStores').then(res => {
            this.setState({custList:res.data});
           // console.log(res.data);
        });
    }

    getCustomerInfo(id){
        axios.get('./getStoresInfo?Id='+id).then(res => {
            this.setState({custInfo:res.data});
            console.log(this.state.custInfo.Name);
        });
        $('#info').modal('show');
    }

    getCustomerEdit(id){
        axios.get('./getStoresInfo?Id='+id).then(res => {  
            this.setState({custEdit:res.data});
            {this.state.custEdit.map((store)=> {
                <div key={store.StoreId}>
                    {this.setState({EditId:store.StoreId,EditName:store.StoreName,EditAddress:store.StoreAddress})}
                {console.log("EditId :"+this.state.EditId + "EditName: "+this.state.EditName + "EditAddress : " + this.state.EditAddress)}
            
                </div>})}

        });
        $('#edit').modal('show');
    }

    getCustomerDelete(id){
        axios.get('./getStoresInfo?Id='+id).then(res => {
            this.setState({custDelete:res.data,DeletId:id});
           // console.log("-id:-"+this.state.custDelete.Id + "-name:-" +this.state.custDelete.Name + "-address:-"+this.state.custDelete.Address + "---");
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
            StoreName: this.state.AddName,
            StoreAddress:this.state.AddAddress
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
            StoreId:this.state.EditId ,
            StoreName: this.state.EditName,
            StoreAddress:this.state.EditAddress 
        });
        
        window.location.reload('./Index');
    }
    render() {
        
    const Stores = this.state.custList.map((store)=>
            <tr key={store.StoreId}>
        <td data-label="Name" >{store.StoreName}</td>
        <td data-label="Address" >{store.StoreAddress}</td>
        <td data-label="Action" ><button className="ui basic button" onClick={this.getCustomerEdit.bind(this,store.StoreId)}><i className="edit icon"></i>Edit</button> <button className="ui basic button" onClick={this.getCustomerInfo.bind(this,store.StoreId)}><i className="info circle icon"></i>Info</button> <button className="ui basic button" onClick={this.getCustomerDelete.bind(this,store.StoreId)}><i className="trash alternate outline icon"></i>Remove</button></td>
    </tr>
    );

    return (
    <div >
            
    <h2>Stores</h2>
        <button className="ui basic button" onClick={this.OpenDialogAdd}>
        <i className="icon user"></i>
        Add Store
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
        {Stores}
            </tbody>
            </table>


        <div class="ui modal" id="info">
            <i class="close icon"></i>
            <div class="header">
            Store Details
            </div>
            <div class="content">
                <div class="description">
        {this.state.custInfo.map((store)=>
                <div key={store.StoreId}>
                <p>Name : {store.StoreName}</p>
                    <br/>
                    <p>Address    : {store.StoreAddress}</p>


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
            Delete Stores 
            </div>
                <div class="content">
                    <div class="description">
                        <p>Are you sure you want to delete this customer ?</p>
                {this.state.custDelete.map((store)=>
                <div>
                        <p>Id         : {store.StoreId}</p>
                        <p>Name       : {store.StoreName}</p>
                        <br/>
                        <p>Address    : {store.StoreAddress}</p>


                </div>
                
                
                )}

                        
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
            Store Details
            </div>
                <div class="content">
                    <div class="description">
                        <form class="ui form">
                    {this.state.custEdit.map((store)=>
                    <div>
                     <div class="field">
                                <label>Name</label>
                                <input type="text"  name={"name"+store.StoreId} defaultValue={store.StoreName} placeholder="Name" onChange={this.handleChangeName.bind(this)}/>
                                </div>
                            <div class="field">
                                <label>Address</label>
                                <input type="text" name={"address"+store.StoreId} defaultValue={store.StoreAddress} placeholder="Address" onChange={this.handlechangeAddress.bind(this)} / >          
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
                    Add Store
                    </div>
                        <div class="content">  
                            <div class="description">
                            <form class="ui form"  onSubmit={this.submitAddCustomer.bind(this)}>
                        <div class="field">
                            <label>Store Name</label>
                            <input type="text" name="AddName"   placeholder="Store Name" onChange={this.AddCustomerOnChange.bind(this)}/>
                        </div>
                            <div class="field">
                            <label>Store Address</label>
                            <input type="text" name="AddAddress"  placeholder="Store Address" onChange={this.AddCustomerOnChange.bind(this)}/>
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

export default Stores;
