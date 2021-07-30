import { ChainId } from 'dfy-sdk'

export interface LaunchTokenList {
  contractAddress: string
  title: string
  imageTokenUrl: string
  proposalContent: string
  available: boolean
}

const BSC_TESTNET_LAUNCH_TOKEN_LIST: { [key: string]: LaunchTokenList } = {
  '0xbCC466227d5AADD66853339C8e51D1cB7B0E88E9': {
    contractAddress: '0xbCC466227d5AADD66853339C8e51D1cB7B0E88E9',
    title: 'Token AAA',
    imageTokenUrl: '/images/tokens/busd-square.jpg',
    proposalContent: '<p class="mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a ultrices lectus. Sed pharetra tempor cursus. Quisque quis lorem luctus, rutrum justo ut, auctor urna. Pellentesque ut neque sit amet magna dapibus accumsan.</p><p class="mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a ultrices lectus. Sed pharetra tempor cursus. Quisque quis lorem luctus, rutrum justo ut, auctor urna. Pellentesque ut neque sit amet magna dapibus accumsan.</p><p class="mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a ultrices lectus. Sed pharetra tempor cursus. Quisque quis lorem luctus, rutrum justo ut, auctor urna. Pellentesque ut neque sit amet magna dapibus accumsan.</p>',
    available: true
  },
  '0x26665b3fc595c0E35931901CcCeA6FDE1Af8138c': {
    contractAddress: '0x26665b3fc595c0E35931901CcCeA6FDE1Af8138c',
    title: 'Token AAATEST',
    imageTokenUrl: '/images/tokens/usdc-square.jpg',
    proposalContent: '<p class="mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a ultrices lectus. Sed pharetra tempor cursus. Quisque quis lorem luctus, rutrum justo ut, auctor urna. Pellentesque ut neque sit amet magna dapibus accumsan.</p><p class="mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a ultrices lectus. Sed pharetra tempor cursus. Quisque quis lorem luctus, rutrum justo ut, auctor urna. Pellentesque ut neque sit amet magna dapibus accumsan.</p><p class="mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a ultrices lectus. Sed pharetra tempor cursus. Quisque quis lorem luctus, rutrum justo ut, auctor urna. Pellentesque ut neque sit amet magna dapibus accumsan.</p>',
    available: true
  },
  '0x6AB2345b52477AB40815d064Dbdae838f46793b3': {
    contractAddress: '0x6AB2345b52477AB40815d064Dbdae838f46793b3',
    title: 'Token B',
    imageTokenUrl: '/images/tokens/usdt-square.jpg',
    proposalContent: '<p class="mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a ultrices lectus. Sed pharetra tempor cursus. Quisque quis lorem luctus, rutrum justo ut, auctor urna. Pellentesque ut neque sit amet magna dapibus accumsan.</p><p class="mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a ultrices lectus. Sed pharetra tempor cursus. Quisque quis lorem luctus, rutrum justo ut, auctor urna. Pellentesque ut neque sit amet magna dapibus accumsan.</p><p class="mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a ultrices lectus. Sed pharetra tempor cursus. Quisque quis lorem luctus, rutrum justo ut, auctor urna. Pellentesque ut neque sit amet magna dapibus accumsan.</p>',
    available: true
  }
}

const BSC_LAUNCH_TOKEN_LIST: { [key: string]: LaunchTokenList } = {
  '0x724De7de593b9cC2b8719FD3a2F9388A01b2ec7b': {
    contractAddress: '0x724De7de593b9cC2b8719FD3a2F9388A01b2ec7b',
    title: 'DomeCoin',
    imageTokenUrl: '/images/tokens/busd-square.jpg',
    proposalContent: '<p class="mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a ultrices lectus. Sed pharetra tempor cursus. Quisque quis lorem luctus, rutrum justo ut, auctor urna. Pellentesque ut neque sit amet magna dapibus accumsan.</p><p class="mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a ultrices lectus. Sed pharetra tempor cursus. Quisque quis lorem luctus, rutrum justo ut, auctor urna. Pellentesque ut neque sit amet magna dapibus accumsan.</p><p class="mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a ultrices lectus. Sed pharetra tempor cursus. Quisque quis lorem luctus, rutrum justo ut, auctor urna. Pellentesque ut neque sit amet magna dapibus accumsan.</p>',
    available: true
  },
  '0x1942E51D5f92a9301f55a80adE3AEaEaD4509705': {
    contractAddress: '0x1942E51D5f92a9301f55a80adE3AEaEaD4509705',
    title: 'SHOT',
    imageTokenUrl: 'https://presale.bestshot.win/images/shot-token.png',
    proposalContent: '<p class="mb-3"><div class="text-xl">Hit me with your Best SHOT!</div><p>BestShot is a Play-to-earn sports prediction game that leverages blockchain and cryptocurrency\'s power and popularity for a secure sports-based system built especially for fans to engage with their favorite teams.</p> <p class="mt-2">Website: <a class="text-blue" href="https://www.bestshot.win/">https://www.bestshot.win/</a></p></p>',
    available: true
  }
}

// use for list token each chain ID
export const launchTokenListByChainId: { [key: string]: any } = {
  [ChainId.BSC_TESTNET]: BSC_TESTNET_LAUNCH_TOKEN_LIST,
  [ChainId.BSC]: BSC_LAUNCH_TOKEN_LIST
}
