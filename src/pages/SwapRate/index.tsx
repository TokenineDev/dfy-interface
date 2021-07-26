import { Helmet } from 'react-helmet'
import React, { useEffect, useCallback, useState } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import styled from 'styled-components'
import { useActiveWeb3React } from 'hooks/useActiveWeb3React'

import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { useSwapActionHandlers, useSwapState, useDerivedSwapInfo } from 'state/swap/hooks'
import { Field } from 'state/swap/actions'
import { useCurrency } from 'hooks/Tokens'
import { CgArrowsExchangeAltV } from 'react-icons/cg'
import { useConfig } from './config'
import { Currency, CurrencyAmount, ETHER } from 'dfy-sdk'
import { maxAmountSpend } from '../../utils/maxAmountSpend'

import ItemRateShow from './ItemRateShow'
import { useCurrencyBalances } from 'state/wallet/hooks'

const BackgroundMain = styled.div`
    margin-top: -40px;
    margin-bottom: -80px;
    padding-bottom: 80px;
    overflow-y: scroll;
`

function SwapRate(): JSX.Element {
    const { i18n } = useLingui()

    const { account, chainId } = useActiveWeb3React()

    const factoryAddresses = useConfig(chainId)

    const { onSwitchTokens, onCurrencySelection, onUserInput } = useSwapActionHandlers()

    const startCurrency = useCurrency('ETH')

    const [currencyInput, setCurrencyInput] = useState<Currency | undefined | null>(startCurrency)
    const [currencyOutput, setCurrencyOutput] = useState<Currency | undefined | null>()

    const [inputValue, setInputValue] = useState('')
    
    const {
        [Field.INPUT]: { currencyId: inputCurrencyId},
        [Field.OUTPUT]: { currencyId: outputCurrencyId }
    } = useSwapState()

    const handleTypeInput = useCallback(
        (value: string) => {
            onUserInput(Field.INPUT, value)
            setInputValue(value)
        },
        [onUserInput]
    )

    const handleTypeOutput = useCallback(
        (value: string) => {
            onUserInput(Field.OUTPUT, value)
        },
        [onUserInput]
    )

    const handleInputSelect = useCallback(
        inputCurrency => {
            onCurrencySelection(Field.INPUT, inputCurrency)
            setCurrencyInput(inputCurrency)
        },
        [onCurrencySelection]
    )

    const handleOutputSelect = useCallback(
        outputCurrency => {
            onCurrencySelection(Field.OUTPUT, outputCurrency)
            setCurrencyOutput(outputCurrency)
        }, 
        [onCurrencySelection]
    )

    const relevantTokenBalances = useCurrencyBalances(account ?? undefined, [
        currencyInput ?? undefined,
    ])

    const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(relevantTokenBalances[0])

    const handleMaxInput = useCallback(() => {
        maxAmountInput && onUserInput(Field.INPUT, maxAmountInput.toExact())
        maxAmountInput && setInputValue(maxAmountInput.toExact())
    }, [maxAmountInput, onUserInput])

    useEffect(() => {
        if (startCurrency) {
            onCurrencySelection(Field.INPUT, startCurrency)
        }
    }, [onCurrencySelection, startCurrency])

    return (
        <>
            {' '}
            <Helmet>
                <title>Swap Rate | DFY</title>
            </Helmet>
            <BackgroundMain className="w-screen">
                <div className="navbar-bg-green-thick-to-thin shadow-swap-blue-glow w-full max-w-5xl rounded mx-auto mt-10 border border-black">
                    <div className="max-w-3xl mx-auto">
                        <div className="relative flex flex-col items-center">
                            <div className="container mx-auto max-w-3xl">
                                <div className="font-bold text-center text-4xl my-10 text-white">
                                    {i18n._(t`Swap Rate`)}
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <div>
                                <div>
                                    <CurrencyInputPanel
                                        label={
                                            i18n._(t`Swap From:`)
                                        }
                                        value={inputValue}
                                        showMaxButton={true}
                                        currency={currencyInput}
                                        onUserInput={handleTypeInput}
                                        onMax={handleMaxInput}
                                        onCurrencySelect={handleInputSelect}
                                        otherCurrency={currencyOutput}
                                        id="swap-currency-input"
                                    />
                                </div>
                                <div
                                    className="my-5"
                                >
                                    <CgArrowsExchangeAltV
                                        className="mx-auto text-white cursor-pointer"
                                        size="64"
                                        onClick={() => {
                                            onSwitchTokens()
                                        }}
                                    />
                                </div>
                                <div>
                                    <CurrencyInputPanel
                                        label={
                                            i18n._(t`Swap To:`)
                                        }
                                        hideInput
                                        value={''}
                                        showMaxButton={false}
                                        currency={currencyOutput}
                                        onUserInput={handleTypeOutput}
                                        onCurrencySelect={handleOutputSelect}
                                        otherCurrency={currencyInput}
                                        id="swap-currency-output"
                                    />
                                </div> 
                            </div>                 
                        </div>
                        <div className="px-4 pb-4">
                            {inputValue !== '' && factoryAddresses.map((item, index) => {
                                return <div key={index}>
                                    <ItemRateShow
                                        name={item.exchangeName}
                                        imageLogoUrl={item.logo}
                                        inputCurrencyId={inputCurrencyId}
                                        outputCurrencyId={outputCurrencyId}
                                        inputValue={inputValue}
                                        factoryAddress={item.factoryAddress}
                                        url={item.url}
                                    />
                                </div>
                            })}
                        </div>
                    </div>
                </div>

            </BackgroundMain>
        </>
    )
}

export default SwapRate
