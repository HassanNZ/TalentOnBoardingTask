import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import {form,label,input, calendar,Dropdown} from 'semantic-ui-react';


class SoldProductsList extends React.Component {
    constructor(props){
        super(props);
        this.state = {custList:[],custInfo:[],custEdit:[],custDelete:[],AddName:"",AddAddress:"",DeletId:0,EditId:0,EditAddress:"",EditName:"DefaultName",isNameChanged:false,isAddressChanged:false,
            EditcustomerList:[{"Id":"10","Name":"Hassan"},{"Id":"20","Name":"ali"},{"Id":"30","Name":"Noor"}],EditcustomerList1:[{key:"10",value:"Hassan", text:"Hassan"},{key:"20",value:"Zahrah", text:"Zahrah"},{key:"30",value:"Noor", text:"Noor"}],EditSoldcustomer:[],
            EditSoldproduct:[],EditSoldstore:[],Edit_soldId :0,Edit_customer:"",Edit_product:"",Edit_store:"",Edit_date:"",GetAdd_customer:[],GetAdd_product:[],GetAdd_store:[],
            Add_customer:"",Add_product:"",Add_store:"",Add_date:""
        
        
        
        
        };
        this.testEdit =  this.testEdit.bind(this);
        
       
    }
    componentDidMount() {
        this.GetProductSoldList();
        this.get_Add_customer();
        this.get_Add_product();
        this.get_Add_store();
        
    }
    
    get_Add_customer(){
        axios.get('./GetCustomers').then(res => {  
            this.setState({GetAdd_customer:res.data});
            this.state.GetAdd_customer.map((add)=>{
              
                console.log(" (add customer) -> id: "+add.CustomerId+" Name : "+add.CustomerName);});
        });
        
    }
    get_Add_product(){
        axios.get('./GetProduct').then(res => {  
            this.setState({GetAdd_product:res.data});
            this.state.GetAdd_product.map((add)=>{
                
                console.log(" (add product) -> id: "+add.ProductId+" Name : "+add.ProductName);});
        });
    }
    get_Add_store(){
        axios.get('./GetStore').then(res => {  
            this.setState({GetAdd_store:res.data});
            this.state.GetAdd_store.map((add)=>{
               
                console.log(" (add Store) -> id: "+add.StoreId+" Name : "+add.StoreName);});
        });
    }
    GetProductSoldList(){
        axios.get('./GetProductSold').then(res => {
            this.setState({custList:res.data});
            console.log(res.data);
        });
    }

    getProductSoldInfo(id){
        axios.get('./InfoProductSold?Id='+id).then(res => {
            this.setState({custInfo:res.data});
            console.log(res.data);
        });
        $('#info').modal('show');
    }

    getProductSoldEdit(id){
        axios.get('./InfoProductSold?Id='+id).then(res => {  
            this.setState({custEdit:res.data});
            this.state.custEdit.map((edit)=> {this.setState({Edit_soldId:edit.Id,Edit_customer:edit.CustomerId,Edit_product:edit.ProductId,Edit_store:edit.StoreId,Edit_date:edit.DateSold})});
            //console.log("-id:-"+this.state.custEdit.Id + "-name:-" +this.state.custEdit.Name + "-address:-"+this.state.custEdit.Price + "---");
        });
        // get only the Id
        axios.get('./GetCustomers').then(res => {  
            this.setState({EditSoldcustomer:res.data});
            this.state.EditSoldcustomer.map((edit)=>{console.log("  -> id: "+edit.CustomerId+" Name : "+edit.CustomerName);});
            
        });
        axios.get('./GetProduct').then(res => {  
            this.setState({EditSoldproduct:res.data});
            this.state.EditSoldproduct.map((edit)=>{console.log("  -> id: "+edit.ProductId+" Name : "+edit.ProductName);});
            
        });
        axios.get('./GetStore').then(res => {  
            this.setState({EditSoldstore:res.data});
            this.state.EditSoldstore.map((edit)=>{console.log("  -> id: "+edit.StoreId+" Name : "+edit.StoreName);});
            
        });
        $('#edit').modal('show');
       
    }

    getCustomerDelete(id){
       
        axios.get('./InfoProductSold?Id='+id).then(res => {
            this.setState({custDelete:res.data,DeletId:id});
            console.log(" Id : "+ id + " res.data : " +res.data);
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
        if(e.target.name == "date"){
            this.setState({Add_date:e.target.value})
          //  alert("date  :"+e.target.value);
        }
        if(e.target.name == "CustomerName"){
            this.setState({Add_customer:e.target.value})
           // alert("CustomerName Id :"+e.target.value);
        }
        if(e.target.name == "ProductName"){
            this.setState({Add_product:e.target.value})
          //  alert("ProductName Id :"+e.target.value);
        }
        if(e.target.name == "StoreName"){
            this.setState({Add_store:e.target.value})
           // alert("StoreName Id :"+e.target.value);
        }
        
    }

    submitAddCustomer(){
        if(this.state.Add_date == "" || this.state.Add_customer == "" || this.state.Add_product =="" || this.state.Add_store=="" 
            && this.state.Add_customer == "customerDefault" || this.state.Add_product =="productDefault" || this.state.Add_store=="storeDefault" ){
            alert("Please Choose all options ");
        }else{
            axios.post('./Create/', {
                CustomerId: this.state.Add_customer,
                ProductId:this.state.Add_product,
                StoreId:this.state.Add_store,
                DateSold:this.state.Add_date
            });
            window.location.reload('./Index');
        }
        //alert("Add_date :"+this.state.Add_date +" add customer"+this.state.Add_customer +" add product"+ this.state.Add_product +"add store: "+this.state.Add_store);
        event.preventDefault();
        
    }
    mycalander(e){
        alert("name : "+e.target.name +"  date :"+e.target.value);
       // $('#example1').show();
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
        alert("("+this.state.Edit_soldId+")cust: "+this.state.Edit_customer+" prod : "+this.state.Edit_product+" store : "+this.state.Edit_store);
        axios.post('./Edit/', {
            Id:this.state.Edit_soldId ,
            CustomerId: this.state.Edit_customer,
            ProductId:this.state.Edit_product, 
            StoreId:this.state.Edit_store,
            DateSold:this.state.Edit_date
        });
        
        window.location.reload('./Index');
    }
    GetOption(e){
        const target = e.target;
        const value = target.value;
        const name = target.name
       if(name ==  "date"){
           this.setState({Edit_date:value});
           alert(this.state.Edit_date+" value : "+value);
        }

        if(name ==  "CustomerName"){
            this.setState({Edit_customer:value});
        }
        if(name ==  "ProductName"){
            this.setState({Edit_product:value});
        }
        if(name ==  "StoreName"){
            this.setState({Edit_store:value});
        }
     
       
        
    }
    render() {
        
        const ProdSold = this.state.custList.map((prodSold)=>
            <tr key={prodSold.Id}>
            
       
        <td data-label="Customer Name" >{prodSold.CustomerName}</td>
        <td data-label="Product Name" >{prodSold.ProductName}</td>
        <td data-label="Store Name" >{prodSold.StoreName}</td>
        <td data-label="Action" ><button className="ui basic button" onClick={this.getProductSoldEdit.bind(this,prodSold.Id)}><i className="edit icon"></i>Edit</button> <button className="ui basic button" onClick={this.getProductSoldInfo.bind(this,prodSold.Id)}><i className="info circle icon"></i>Info</button> <button className="ui basic button" onClick={this.getCustomerDelete.bind(this,prodSold.Id)}><i className="trash alternate outline icon"></i>Remove</button></td>
    </tr>
    );
           

        return (
        <div >
           
        
        

   

<h1>Sold Products</h1>
 <button className="ui basic button" onClick={this.OpenDialogAdd}>
    <i className="icon user"></i>
    Add Sold Products
    </button>
 
 

    <table className="ui table">
        <thead>
            <tr>
                
                <th>Customer Name</th>
                <th>Product Name</th>
                 <th>Store Name</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
    {ProdSold}
        </tbody>
        </table>


    <div class="ui modal" id="info">
        <i class="close icon"></i>
        <div class="header">
        Product Details
        </div>
        <div class="content">
            <div class="description">
        {this.state.custInfo.map((prodSold) =>
    <div key={prodSold.Id}>
      <p>Date Sold   : {prodSold.DateSold}</p>  
     <p>Customer Name   : {prodSold.CustomerName}</p>        
    <p>Product Name : {prodSold.ProductName}</p>
    <p>Store Name : {prodSold.StoreName}</p>
        
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
            {this.state.custDelete.map((prodSold) =>
                        <div key={prodSold.Id}>
                        <p>Date Sold   : {prodSold.DateSold}</p>  
                        <p>Customer Name   : {prodSold.CustomerName}</p>        
                        <p>Product Name : {prodSold.ProductName}</p>
                        <p>Store Name : {prodSold.StoreName}</p>
        
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
Customer Details
</div>
<div class="content">
    <div class="description">
        <form class="ui form">
    {this.state.custEdit.map((customer)=> 
                        <div key={customer.Id}>

                        <div class="ui calendar" id="example1">
                        <div class="ui input left icon">
                        <i class="calendar icon"></i>
                        <input type="date" name="date" placeholder="Date/Time"  onChange={this.GetOption.bind(this)}/>
                        </div>
                        </div>



                            <p><span>Customer Name</span>
                        <select  name="CustomerName" onChange={this.GetOption.bind(this)}>
                            <option   value={customer.CustomerId}>{customer.CustomerName} </option>
                            {this.state.EditSoldcustomer.map((edit)=>
                            
                            <option key={edit.CustomerId} value={edit.CustomerId} >{edit.CustomerName} </option> 
                            
                    )}
                        </select>
                            </p>
                             <p><span>Product Name</span>
                            <select  name="ProductName" onChange={this.GetOption.bind(this)}>
                            <option   value={customer.ProductId}>{customer.ProductName} </option>
                            {this.state.EditSoldproduct.map((edit)=>
                            <option key={edit.ProductId} value={edit.ProductId} >{edit.ProductName} </option>    
                    )}
                        </select>
                            </p>
                             <p><span>Store Name</span>
                            <select  name="StoreName" onChange={this.GetOption.bind(this)}>
                            <option   value={customer.StoreId}>{customer.StoreName} </option>
                            {this.state.EditSoldstore.map((edit)=>
                            <option key={edit.StoreId} value={edit.StoreId} >{edit.StoreName} </option>    
                    )}
                        </select>
                         </p>

                        </div> )}

           
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
           
           <div class="ui calendar" id="example1">
                        <div class="ui input left icon">
                        <i class="calendar icon"></i>
                        <input type="date" name="date" placeholder="Date/Time"  onChange={this.AddCustomerOnChange.bind(this)}/>
                        </div>
                        </div>



                            <p><span>Customer Name</span>
                      
                            <select  name="CustomerName"  onChange={this.AddCustomerOnChange.bind(this)}>
                           <option  value="customerDefault" >Choose Customer Name Please</option>
                        {this.state.GetAdd_customer.map((edit)=>
                            
                        <option key={edit.CustomerId} value={edit.CustomerId} >{edit.CustomerName} </option>  
                        
                )}
                        </select>
                       
                            </p>
                             <p><span>Product Name</span>
                            <select  name="ProductName" onChange={this.AddCustomerOnChange.bind(this)}>
                             <option  value="productDefault" >Choose Product Name Please</option>
                        {this.state.GetAdd_product.map((edit)=>
                            <option key={edit.ProductId} value={edit.ProductId} >{edit.ProductName} </option>    
                    )}
                        </select>
                            </p>
                             <p><span>Store Name</span>
                            <select  name="StoreName" onChange={this.AddCustomerOnChange.bind(this)}>
                            <option  value="storeDefault" >Choose Store Name Please</option>
                        {this.state.GetAdd_store.map((edit)=>
                            <option key={edit.StoreId} value={edit.StoreId} >{edit.StoreName} </option>    
                    )}
                        </select>
                         </p>




                    

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

                  
export default SoldProductsList;