import { Token, TokenAmount } from 'dfy-sdk'
import { ethers } from 'ethers'

export default interface LPToken {
    id?: number
    address: string
    tokenA: Token
    tokenB: Token
    totalSupply: ethers.BigNumber
    balance: TokenAmount
    name?: string
    symbol?: string
    decimals?: number
    version?: 'v1' | 'v2'
}
