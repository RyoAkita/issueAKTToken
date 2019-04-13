import React, { Component } from 'react';
import web3 from './Web3.js';
import CryptosICO from './contracts/CryptosICO.json';
import './App.css';

const address = '0x75673899378b8ad060f88c8224c19b8f0cfb5c73';
const cryptosICO = new web3.eth.Contract(CryptosICO.abi, address);



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transferTo: '',
      amount: '',
      myAmount: '',
      icoState: '',
      message: 'トランザクション情報'
    }
  }

handleChangeText = (event) => {
  this.setState({ [event.target.name]: event.target.value});
}

transfer = async() => {
  const accounts = await web3.eth.getAccounts();
  this.setState({message: 'Waiting on Transaction success...'})

  await cryptosICO.methods.transfer(this.state.transferTo, this.state.amount).send({
    from: accounts[0]
  });
  this.setState({message: 'Succeeded Transfer'})
}

  
  render() {
    return (
      <div className="body">
        <h1 id="title">お小遣いをあげよう</h1>
        <div className="box transferTo">
        <p>どのアドレスに渡す？</p>
        <div className="cp_iptxt">
          <label className="ef">
          <input type="text" name="transferTo" placeholder="" onChange={this.handleChangeText} value={this.state.transferTo}/>
          </label>
        </div>        
        </div>
        <p>兄：0x0233F3fC8c05D9D866B2F03362D874F77f0Ca173</p>
        <p>弟：0x579b309d0292E337d8c2638456A4d928100C1660</p>
        <br></br>
        <div className="box amount">
        <p>何AKT渡す？</p>
        <div className="cp_iptxt">
          <label className="ef">
          <input type="text" name="amount"placeholder="" onChange={this.handleChangeText} value={this.state.amount}/>
          </label>
        </div>        
        </div>
        <button onClick={this.transfer} id="sendMoney">送金</button>
        <p id="message">{this.state.message}</p>
       
      </div>
    );
  }
}


export default App;
