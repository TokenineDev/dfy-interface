import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useTokenContract } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import { getConfigDetail } from './config'
import Logo from '../../assets/images/logo.png'
import { FaFacebook, FaTelegram } from 'react-icons/fa'
import { AiFillTwitterCircle } from 'react-icons/ai'
import mepoint from '../../assets/images/mepoint-grey.png'
import slp from '../../assets/images/slp.png'
import xchain from '../../assets/images/xchain.png'

const BackgroundMain = styled.div`
    margin-top: -40px;
    margin-bottom: -80px;
`
const ImageBackground = styled.div`
  position: relative;
  background-image: url('/images/dfy-bg.png');
  /* background-position: center; */
  background-size: cover;
`

const CardBlur = styled.div`
  background: rgba( 255, 255, 255, 0.20 );
  /* box-shadow: 0 8px 8px 0 rgba(8, 112, 5, 0.369); */
  backdrop-filter: blur( 4.0px );
  -webkit-backdrop-filter: blur( 4.0px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
`

const numberWithCommas = (x: string) => {
  return x.toString().replace(/(\.\d+)|(?=(?:\d{3})+\b)(?!\b)/g, function(m, $1) { return $1 || ',' })
}


function Home(): JSX.Element {

  const { chainId } = useWeb3React()

  const howDetail = getConfigDetail(chainId)

  const hgcToken = useTokenContract(howDetail.hgcAddress)
  const escToken = useTokenContract(howDetail.escAddress)

  const [hgcTotalSupply, setHGCTotalSupply] = useState('0')
  const [escTotalSupply, setESCTotalSupply] = useState('0')

  useEffect(() => {
    const fetchTokenDetail = async () => {
      const hgcTotalSupply = 0
      
      const escTotalSupply = 0

      if (hgcTotalSupply && escTotalSupply) {
        // setHGCTotalSupply(numberWithCommas(hgcTotalSupply[0].toFixed(18).split('.')[0]))
        // setESCTotalSupply(numberWithCommas(escTotalSupply[0].toFixed(18).split('.')[0]))
      }
    }
    fetchTokenDetail()
  }, [hgcToken, escToken])

  return <>
    {' '}
    <Helmet>
        <title>DFY</title>
    </Helmet>
    <BackgroundMain className="navbar-bg-green-thick-to-thin w-screen">
      <div className="px-20 pt-5">
        <ImageBackground className="py-20 mb-10 rounded-md border border-green-thick">
          <div className="uppercase text-center font-bold text-5xl text-white">DeFi Platform</div>
          <div className="text-center mt-20">
            <Link
              className="bg-green-thick uppercase text-white font-bold py-3 px-20 mr-5 rounded shadow  hover:shadow-xl transition-shadow"
              to="/launchpad"
            >
              Launchpad
            </Link>
            <Link
              className="bg-white uppercase text-green-thick  font-semibold py-3 px-20 border border-green-thick rounded shadow  hover:shadow-xl transition-shadow"
              to="/swap-rate">
              Swap rate
            </Link>
          </div>
        </ImageBackground>

        <div className="text-white pt-14 pb-5 text-xl text-center">Our Partners</div>
        <div className="flex flex-wrap gap-4 items-center justify-items-center text-white">
          <div className="flex-1">
            <a href="#blank" target="_blank">
              <img style={{ 'filter': 'brightness(0) invert(1)' }} className="mx-auto" src={mepoint} alt="" />
            </a>
          </div>
          <div className="flex-1">
            <a href="#blank" target="_blank">
              <img style={{ 'filter': 'brightness(0) invert(1)' }} className="mx-auto" src={slp} alt="" />
            </a>
          </div>
          <div className="flex-1">
            <a href="#blank" target="_blank">
              <img style={{ 'filter': 'brightness(0) invert(1)' }} className="mx-auto" src={xchain} alt="" />
            </a>
          </div>
        </div>
      </div>
      <footer className="bg-white mt-20 px-20 py-5 border-t border-green-thick">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <div className="text-green-thick mt-5 inline-block">
              <a href="#blank" target="_blank"><FaFacebook className="inline-block" size="42" /></a>
              <a href="#blank" target="_blank"><FaTelegram className="inline-block ml-5" size="42" /></a>
              <a href="#blank" target="_blank"><AiFillTwitterCircle className="inline-block ml-5" size="46" /></a>
            </div>
          </div>
          <div className="flex-1 text-right">
            <img className="w-20 inline-block" src={Logo} alt="" />
          </div>
        </div>
      </footer>
    </BackgroundMain>
  </>
}

export default Home