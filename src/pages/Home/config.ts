import { ChainId } from 'dfy-sdk'

interface Config {
  escAddress: string
  hgcAddress: string
}

const HOME_BSC_TESTNET: Config = {
  escAddress: '0xffF3753d511cF17baF36DE1E04A6eb8Eebd73358',
  hgcAddress: '0xB0cE588028CA275F10F9b52B41702464cD2e7675',
}

// use for list token each chain ID
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getConfigDetail = (chainId?: ChainId) => {
  if (ChainId.BSC_TESTNET === chainId) return HOME_BSC_TESTNET
  return HOME_BSC_TESTNET
}