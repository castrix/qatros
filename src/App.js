import React from 'react';
import {evaluate} from 'mathjs';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      current:"",
      ivalue:[],
      result:null,
      copied:false
    }
    this.inRef=React.createRef()
  }
  handleNumber=(i)=>{
    this.setState({...this.state, current:this.state.current+i, result:null, copied:false});
  }
  handleOperators=(i)=>{
    if(i==="="){
      this.setState({...this.state, copied:false},()=>this.handleCalculate())
    }else{
      this.setState({...this.state, copied:false, ivalue:[...this.state.ivalue, this.state.current, i], current:"",result:null});
    }
  }
  handleCalculate=()=>{
    this.setState({...this.state, ivalue:[...this.state.ivalue, this.state.current !== "" ? this.state.current : "0"], current:""}, this.getRes);
  }
  handleCopy=(e)=>{
    this.inRef.current.select();
    document.execCommand("copy");
    this.setState({...this.state, copied:true});
    e.preventDefault();
  }
  getRes(){
    this.setState({...this.state, result:evaluate(this.state.ivalue.join("")), current:"", ivalue:[]})
  }
  componentDidUpdate(){
    this.state.result !== null?
    this.inRef.current.value = this.state.result:
    this.inRef.current.value = this.state.ivalue.join("")+this.state.current;
  }
  
  render(){
    const number=[0,1,2,3,4,5,6,7,8,9];
    return (
      <>
      <div className="container-fluid mt-4 text-center">
        <h1>PT Qatros Frontend Challenge</h1>
      </div>
      <div className="container-fluid text-center">
        <h1>CALCULATOR</h1>
      </div>
      <div className="container-fluid text-center">
        <h3>Oleh: Ihsan Fajar Ramadhan</h3>
      </div>
      <div className="row">
        <div className="container" style={{maxWidth:"700px"}}>
          {this.state.copied?
            <div className="container-fluid text-center">
            <span className="text-success bold">Copied!</span>
          </div>: ""}
          <div className="row">
            <input ref={this.inRef} onClick={(e)=>this.handleCopy(e)} onKeyDown={(e)=>e.preventDefault()} onChange={()=>this.setState({...this.state, copied:!this.state.copied})} type="text" className="form-control text-center" style={{fontWeight:"bold", fontSize:"4vw"}} placeholder="Press the number" aria-label="Press the number" />
          </div>
          <div className="row">
            <div className="col">
            <div className="row">
          {number.reverse().map((item,index)=>{
            if(item===0){
              return(
                <>
                <div className="w-100"></div>
                <div className="col text-center mr-1 mt-1 btn btn-primary" onClick={()=>this.handleNumber(item)}>{item}</div>
                </>
              )
            }else if(item===7 || item === 4){
              return(<>
                <div className="col text-center mr-1 mt-1 btn btn-primary" onClick={()=>this.handleNumber(item)}>{item}</div>
                <div className="w-100"></div>
              </>)
            }else{
              return <div className="col text-center mr-1 mt-1 btn btn-primary" onClick={()=>this.handleNumber(item)}>{item}</div>
            }
          })}
          </div>
          </div>
          <div className="col d-flex flex-column p-0" style={{maxWidth:"15%"}}>
            <div className="col text-center mt-1 btn btn-primary" onClick={()=>this.handleOperators("/")}>:</div>
            <div className="col text-center mt-1 btn btn-primary" onClick={()=>this.handleOperators("*")}>x</div>
            <div className="col text-center mt-1 btn btn-primary" onClick={()=>this.handleOperators("+")}>+</div>
            <div className="col text-center mt-1 btn btn-primary" onClick={()=>this.handleOperators("-")}>-</div>
            <div className="col text-center mt-1 btn btn-success" onClick={()=>this.handleOperators("=")}>=</div>
          </div>
          </div>
        </div>
      </div>
      </>
    );
  }
}

export default App;
