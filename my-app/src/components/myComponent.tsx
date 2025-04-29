import React, {Component, use} from "react";
import { FactItem } from "./FactItem";
import { fact } from "./fact";
interface StateData {
       
       facts: [];
       loading: boolean;
       error: boolean;
       errorMessage:string;
       
}
class HomeWorkClass extends Component<{},StateData>{
    constructor(props:{}) {
        super(props);
        this.state={
            facts: [] ,
            loading:true,
            error: false,
            errorMessage: ""

        }
     console.log('Constructor: компонент создается');
    }
      componentDidMount() {
    console.log('componentDidMount: компонент был смонтирован');
    this.fetchFacts();
  }
    fetchFacts=async ()=>{
        try{
            await fetch(`https://catfact.ninja/facts?limit=15`)
            .then((res)=>
                {
                    if (res.status==200)
                        return res.json();
                    else 
                    throw new Error(' status is not 200 ');

                })
            .then((list)=>{
                    console.log('List: '+list);
                    this.setState({
                        facts: list.data,
                        loading:false,
                        error: false,
                        errorMessage:""
                    })
            });
            
        }catch (errorMsg){
            console.error('Ошибка при загрузке данных:', errorMsg);
            this.setState({ loading: false,error: true,errorMessage:errorMsg.message });
        }
    }
    render() {
        console.log("render");
        const { facts, loading,error,errorMessage } = this.state;
        if(loading){
            return <div>Loading...</div>
        }
        // if (error){
        //     return <p id="factlistError">{errorMessage}</p>
        // }
        return( 
            <div>
        <p>This is my first component!</p>
        <div>
            <h1>Fast list</h1>
         
            <ul id="factlist">
            { 
                facts.map((item,index)=>
                    <li key={index}> {item.fact}</li>
                ) 
            }
            </ul>
            {error &&<p id="factlistError">{errorMessage}</p>}
        </div>
        </div>
        )
    }
}
 
export default HomeWorkClass;