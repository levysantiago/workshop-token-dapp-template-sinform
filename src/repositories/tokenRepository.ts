import { ethers } from "ethers"
import { ERC20ABI, ERC20ABI__factory } from "../smc-types"
import { Web3Provider } from "@ethersproject/providers"

class TokenRepository{
  private token: ERC20ABI
  private provider: Web3Provider | undefined

  constructor(provider: ethers.providers.Web3Provider){
    this.provider = provider
    this.token = ERC20ABI__factory.connect(
      process.env.REACT_APP_TOKEN_ADDRESS || "",
      provider
    )
  }

  public async balanceOf(address: string){
    if(!this.token) throw new Error("token not defined")
    const balance = await this.token.balanceOf(address)
    return ethers.utils.formatEther(balance)
  }

  public async totalSupply(){
    if(!this.token) throw new Error("token not defined")
    const _totalSupply = await this.token.totalSupply()
    return ethers.utils.formatEther(_totalSupply)
  }
  
  public async mint(address: string, amount: string){
    if(!this.token) throw new Error("token not defined")
    const signer = this.provider?.getSigner()
    const unsignedTrx = await this.token.populateTransaction.mint(
      address, 
      ethers.utils.parseEther(amount)
    )
    return await signer?.sendTransaction(unsignedTrx)
  }
  
  public async burn(amount: string){
    if(!this.token) throw new Error("token not defined")
    const signer = this.provider?.getSigner()
    const unsignedTrx = await this.token.populateTransaction.burn(
      ethers.utils.parseEther(amount)
    )
    return await signer?.sendTransaction(unsignedTrx)
  }

  public async transfer(addressTo: string, amount: string){
    if(!this.token) throw new Error("token not defined")
    const signer = this.provider?.getSigner()
    const unsignedTrx = await this.token.populateTransaction.transfer(
      addressTo, 
      ethers.utils.parseEther(amount)
    )
    return await signer?.sendTransaction(unsignedTrx)
  }
}

export default TokenRepository