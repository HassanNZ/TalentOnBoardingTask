import React from 'react';
import { render } from 'react-dom';
import CustomersList from './CustomersList';
import CustomerModal from './CustomerModal';
import { Container } from 'semantic-ui-react';
import Login from './Login';

class App extends React.Component {
    render() {
        return (
            <div>
             <CustomersList/>
            
         
          
            </div>
            
        );
            }
}


render(<App />, document.getElementById('app'));

