import React from 'react'
import {button,container,modal,header,image} from 'semantic-ui-react'
import Login from './Login';
import { Container } from 'semantic-ui-react';
class CustomerModal extends React.Component{
    constructor(){
        super();
       
       // this.test();
        
    }

    //test(){
    //    $('.ui.modal').modal('show');
      
    //}
    render(){
        return(
            <div>
                

   
            <div class="ui modal">
  <i class="close icon"></i>
  <div class="header">
    header here
  </div>
  <div class="content">
   
    <div class="description">
       <p>hello boday modal</p>
    </div>
  </div>
  <div class="actions">
    <div class="ui black deny button">
      Nope
    </div>
    <div class="ui positive right labeled icon button">
      Yep, that's me
      <i class="checkmark icon"></i>
    </div>
  </div>
</div>
          

          <button class="ui basic button" onClick={this.test}> show modal</button>
          
              </div>
            
            );
    }




}

export default CustomerModal;
