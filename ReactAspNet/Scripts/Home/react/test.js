import React from 'react';
import { render } from 'react-dom';


export default class Test extends React.Component {
    constructor(props){
        super(props);
        this.state ={ID:"root"}
       
    }
    componentDidMount() {
        this.getHTML();
    }
    getHTML(){

        var v =   document.getElementById('box').innerHTML ;
        this.setState({ID:v});
        //alert(v);
        
    }
    render(){
        return (
           <h1>hello test </h1>
        )
    }
    



}