import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import { ProxySwap } from "./ABI/ProxySwap";
import { erc20 } from "./ABI/erc20";

const web3 = new Web3(Web3.givenProvider);
const contractAddress = "0x2eF5539B11aDaA83510C6152a2FD7644E0d4d31d";
const ethAddress = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
const ProxyContract = new web3.eth.Contract(ProxySwap, contractAddress);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: null,

      account: null,
    };

    this.amountToken = React.createRef();
    this.srcToken = React.createRef();
    this.dstToken = React.createRef();
    this.poolfee = React.createRef();
  }

  componentDidMount = async (t) => {
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    this.setState({ account: account });
  };

  ApproveToken = async (tokenAddress) => {
    const erContract = new web3.eth.Contract(erc20, tokenAddress);
    let value = this.amountToken.current.value;
    await erContract.methods.approve(contractAddress, value).send({
      from: this.state.account,
    });
  };

  isEth = async (srcTokenAddress, dstTokenAddress) => {
    if (srcTokenAddress == ethAddress || dstTokenAddress == ethAddress) {
      return true;
    }
    return false;
  };

  swap = async (t) => {
    let poolfee = this.poolfee.current.value;
    let srcAddress = this.srcToken.current.value;
    let dstAddress = this.dstToken.current.value;
    let amountOfToken = this.amountToken.current.value;
    if (
      srcAddress == "" ||
      dstAddress == "" ||
      amountOfToken == "" ||
      poolfee == "" ||
      poolfee > 3000 ||
      poolfee <= 0
    ) {
      return;
    }
    await this.ApproveToken(srcAddress);

    const isEthAddress = await this.isEth(srcAddress, dstAddress);

    if (isEthAddress) {
      await ProxyContract.methods
        .singleSwap(srcAddress, dstAddress, amountOfToken, poolfee)
        .send({
          from: this.state.account,
        });
    } else {
      await ProxyContract.methods
        .multiHubSwap(
          srcAddress,
          dstAddress,
          ethAddress,
          amountOfToken,
          poolfee
        )
        .send({
          from: this.state.account,
        });
    }
  };

  render() {
    const html = (
      <div class="container">
        <div class="header">
          <div>
            <b>your Account address</b> :{this.state.account}
          </div>
        </div>
        <div class="swap-container">
          <div class="swap-box">
            <div class="title">Proxy Swap</div>
            <div class="swap-info-container">
              <div class="token-inputs-group">
                <input
                  ref={this.srcToken}
                  class="token-address-input"
                  placeholder="Token 1 contract address"
                  type="text"
                ></input>
                <input
                  ref={this.dstToken}
                  class="token-address-input"
                  placeholder="Token 2 contract address"
                  type="text"
                ></input>
              </div>
              <div class="token-amount-container">
                <input
                  ref={this.amountToken}
                  type="number"
                  placeholder="Amount Of Token "
                  class="amount"
                ></input>
                <input
                  ref={this.poolfee}
                  id="pool-fee"
                  type="number"
                  placeholder=" pool fee "
                  class="amount"
                ></input>
                <label class="pool-fee-txt" for="pool-fee">
                  Choose a pool fee between 1 and 3000
                </label>
              </div>
            </div>
            <div onClick={this.swap} class="swap-btn">
              Swap
            </div>
          </div>
        </div>
      </div>
    );
    return html;
  }
}

export default App;
