import React, { useEffect, useState } from 'react'
import { fetchPairData } from './utils'
import { Route, TokenAmount, Trade, TradeType, Currency, WETH, ChainId } from 'dfy-sdk'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { utils } from 'ethers'
import { useTokenCheckWrap } from './utils'
import TradeSummary from './TradeSummary'
import Button from 'components/Button'

interface Props {
  name: string,
  inputCurrencyId?: string,
  outputCurrencyId?: string,
  inputValue: string,
  factoryAddress: string,
  imageLogoUrl?: string
  url: string
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ItemRateShow = ({
  name,
  inputCurrencyId,
  outputCurrencyId,
  inputValue,
  factoryAddress,
  imageLogoUrl,
  url
}: Props) => {

  const { chainId, library } = useActiveWeb3React()

  const tokenInput = useTokenCheckWrap(inputCurrencyId, chainId)
  const tokenOutput = useTokenCheckWrap(outputCurrencyId, chainId)

  const [price, setPrice] = useState('0')
  const [trade, setTrade] = useState<Trade>()

  useEffect(() => {
    const fetch = async () => {
      if (!tokenInput || !tokenOutput) return

      const amountIn = utils.parseEther(inputValue !== '' ? inputValue : '0')
      const pair = await fetchPairData(tokenInput, tokenOutput, library, factoryAddress)

      if (!pair || inputValue === '' || amountIn.lte(0)) return
      const route = new Route([pair], tokenInput)
      const trade = new Trade(route, new TokenAmount(tokenInput, amountIn.toString()), TradeType.EXACT_INPUT)
      setPrice(trade.outputAmount.toExact())
      setTrade(trade)
    }
    fetch()
  }, [library, inputCurrencyId, outputCurrencyId, chainId, inputValue, factoryAddress, tokenInput, tokenOutput])

  return <>
    {inputValue !== '' && <div className="p-4 rounded border border-dark-800 mt-4">
      <div className="text-white text-xl">
        {imageLogoUrl && <img alt="launchpad" src={imageLogoUrl} className="inline-block h-10 w-10 rounded-full mr-3" />}
        <span>{name}</span>
      </div>
      {price !== '0' && <div className="text-white text-2xl py-4 font-bold">{price}</div>}
      {trade && <TradeSummary trade={trade} allowedSlippage={0}/>}
      <a rel="noreferrer" href={`${url}?outputCurrency=${outputCurrencyId}&inputCurrency=${inputCurrencyId}`} target="_blank">
        <Button
          color="gradient3"
          className="w-full mt-3 border border-white py-2 font-bold text-center text-white disabled:cursor-not-allowed"
        >
          Go to {name}
        </Button>
      </a>
    </div>}
  </>

}

export default ItemRateShow