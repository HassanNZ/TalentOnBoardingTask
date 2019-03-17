import React from 'react';
import { render} from 'react-dom';
import CustomersList from './CustomersList';
import { Container,Menu } from 'semantic-ui-react';
import Stores from './StoreList';
import ProductsList from './ProductsList';
import SoldProductsList from './SoldProsuctsList';
import Test from './test';

class App extends React.Component {
  
    constructor(props){
        super(props);
        this.state = {ID:"app"}
    }

    componentDidMount() {
        this.GetID();
    }
    GetID(){
        var getID = document.getElementById('ID').innerHTML ;
        this.setState({ID:getID});
        

    }

    render() {
       
        return (
            <div>
               
             {this.state.ID == "Store" && <Stores />}
        {this.state.ID == "Customer" && <CustomersList />}
    {this.state.ID == "Product" && <ProductsList />}
    {this.state.ID == "Sold Product" && <SoldProductsList />}
        
        
  
          
           
          
          
           
          

            
        
          
          </div>
            
        );
    }
}


render(<App />, document.getElementById('app'));





