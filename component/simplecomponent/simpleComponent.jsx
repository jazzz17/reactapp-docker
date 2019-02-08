import React,{Component} from 'react';

class SimpleComponent extends Component{
    //the constructor would be used for state definition to accept data from parent component
    //the props represent data to be received from the parent component
    constructor(props){
        super(props);
        //state declaration 
        //event binding to component
    }
    //the render() method encapsulate DOM and its data with behavior
    //this returns the DOM object aka virtual DOM
    render(){
        return(
        <div>
             <h2> The super Component {this.props.myname}</h2>
             <br/>
             <NewComponent></NewComponent>
        </div>);
    }

}

class NewComponent extends Component{
    render(){
        return(<div>
               <h2> The new component</h2>
        </div>);
    }
}

export default SimpleComponent;