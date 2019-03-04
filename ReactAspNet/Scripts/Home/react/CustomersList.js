import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import {form,label,input} from 'semantic-ui-react';


class CustomersList extends React.Component {
    constructor(props){
        super(props);
        this.state = {custList:[],custInfo:[],custEdit:[],custDelete:[],AddName:"",AddAddress:""};
       
        this.getCustomerInfo = this.getCustomerInfo.bind(this);
        this.getCustomerEdit = this.getCustomerEdit.bind(this);
        this.getCustomerAdd  = this.getCustomerAdd.bind(this);
        this.OpenDialogAdd = this.OpenDialogAdd.bind(this);
        this.OpenDialogDelete = this.OpenDialogDelete.bind(this);
        this.submitAddCustomer = this.submitAddCustomer.bind(this);
        this.CustomerDelete = this.CustomerDelete.bind(this);
    }
    componentDidMount() {
       // this.getCustomerInfo();// = this.getCustomerInfo.bind(this);
        this.getCustomerList();
       
    }
    getCustomerList(){
       
        axios.get('./getCustomers').then(res => {
            
            this.setState({custList:res.data});
            console.log(res.data);
        
        });


    }
    getCustomerInfo(id){
        axios.get('./getCustomerInfo?Id='+id).then(res => {
            
            this.setState({custInfo:res.data});
            console.log(this.state.custInfo.Name);
        
        });
        $('#info').modal('show');

    }
    getCustomerEdit(id){
        axios.get('./getCustomerInfo?Id='+id).then(res => {
            
            this.setState({custEdit:res.data});
            console.log("-id:-"+this.state.custEdit.Id + "-name:-" +this.state.custEdit.Name + "-address:-"+this.state.custEdit.Address + "---");
        });
       
        $('#edit').modal('show');

    }

    getCustomerDelete(id){
        axios.get('./getCustomerInfo?Id='+id).then(res => {
            
            this.setState({custDelete:res.data});
            console.log("-id:-"+this.state.custDelete.Id + "-name:-" +this.state.custDelete.Name + "-address:-"+this.state.custDelete.Address + "---");
        });
       
        $('#delete').modal('show');

    }

    getCustomerAdd(name,address){
        //axios.post('./Createtest/', {
        //    Name: name,
        //    Address:address
        //})

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
        
        axios.post('./Createtest/', {
            Name: this.state.AddName,
            Address:this.state.AddAddress
        });
       // $('#add').modal('close');
       // alert("you submitted name: " + this.state.AddName + "  Address : "+ this.state.AddAddress);
        event.preventDefault();
        

    }
    CustomerDelete(id){
        axios.get('./Deletetest?Id='+id);



    }

    handleChange(e,id){
        const target = e.target;
        const value = target.value;
        const name = target.name;
       
        this.setState({[name+id]:value});
    }
    
    render() {
        
        const customers = this.state.custList.map((customer)=>
            <tr key={customer.Id}>
      <td data-label="Name" >{customer.Name}</td>
      <td data-label="Address" >{customer.Name}</td>
      <td data-label="Action" ><button className="ui basic button" onClick={this.getCustomerEdit.bind(this,customer.Id)}><i className="edit icon"></i></button> <button className="ui basic button" onClick={this.getCustomerInfo.bind(this,customer.Id)}><i className="info circle icon"></i></button> <button className="ui basic button" onClick={this.getCustomerDelete.bind(this,customer.Id)}><i className="trash alternate outline icon"></i></button></td>
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
                <tr><th>Name</th>
                <th>Address</th>
                <th></th>
              </tr></thead>
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
              <p>Name : {this.state.custInfo.Name}</p>
              <br/>
              <p>Address    : {this.state.custInfo.Address}</p>
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
            <p>Id : {this.state.custDelete.Id}</p>
              <p>Name : {this.state.custDelete.Name}</p>
              <br/>
              <p>Address    : {this.state.custDelete.Address}</p>
    </div>
  </div>
  <div class="actions">
  <div class="ui button" onClick={this.CustomerDelete(this.state.custDelete.Id)}>
      Confirm
    </div>
    <div class="ui button">
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
  <div class="field">
    <label>Name</label>
    <input type="text"   placeholder="Name" onChange={this.handleChange.bind(this)}/>
                  </div>
                  <div class="field">
                    <label>Address</label>
                    <input type="text"   placeholder="Address" onChange={this.handleChange.bind(this)}/ > 
                    <div class="ui input"><input type="text" placeholder="Search..." onChange={this.handleChange.bind(this)}/></div>
                  </div>
  
 
                </form>


                    </div>
                  </div>
                  <div class="actions">
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