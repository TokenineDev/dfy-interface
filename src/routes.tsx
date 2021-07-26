import { ChainId } from 'dfy-sdk'
import React from 'react'
import { Redirect, Route, RouteComponentProps, useLocation, Switch } from 'react-router-dom'
import { useActiveWeb3React } from 'hooks/useActiveWeb3React'
import Connect from './kashi/pages/Connect'
import LaunchPad from './pages/LaunchPad'
import LaunchPadPage from './pages/LaunchPad/LaunchPadPage'
import {
    RedirectHashRoutes,
    RedirectPathToSwapOnly,
} from './pages/Swap/redirects'
import SwapRate from './pages/SwapRate'
import Home from './pages/Home'

const LaunchPadAllowChaidId: ChainId[] = [
    ChainId.BSC_TESTNET,
    ChainId.BSC
]

function Routes(): JSX.Element {
    const { chainId } = useActiveWeb3React()
    return (
        <Switch>
            <PublicRoute exact path="/connect" component={Connect} />

            <Route exact strict path="/" component={Home} />
            <Route exact strict path="/swap-rate" component={SwapRate} />

            <Route exact strict path="/launchpad" component={LaunchPad} />
            {chainId && LaunchPadAllowChaidId.includes(chainId)
                && <Route strict path="/launchpad/:address" component={LaunchPadPage} />
            }

            {/* Redirects for app routes */}
            <Route
                exact
                strict
                path="/token/:address"
                render={({
                    match: {
                        params: { address }
                    }
                }) => <Redirect to={`/swap/${address}`} />}
            />
            <Route
                exact
                strict
                path="/pair/:address"
                render={({
                    match: {
                        params: { address }
                    }
                }) => <Redirect to={`/pool`} />}
            />

            {/* Redirects for Legacy Hash Router paths */}
            <Route exact strict path="/" component={RedirectHashRoutes} />

            {/* Catch all */}
            <Route component={RedirectPathToSwapOnly} />
        </Switch>
    )
}

export default Routes

// A wrapper for <Route> that redirects to the Connect Wallet
// screen if you're not yet authenticated.
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const PublicRoute = ({ component: Component, children, ...rest }: any) => {
    const { account } = useActiveWeb3React()
    const location = useLocation<any>()
    return (
        <>
            <Route
                {...rest}
                render={(props: RouteComponentProps) =>
                    account ? (
                        <Redirect
                            to={{
                                pathname: location.state ? location.state.from.pathname : '/'
                            }}
                        />
                    ) : Component ? (
                        <Component {...props} />
                    ) : (
                        children
                    )
                }
            />
        </>
    )
}

// A wrapper for <Route> that redirects to the Connect Wallet
// screen if you're not yet authenticated.
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const WalletRoute = ({ component: Component, children, ...rest }: any) => {
    const { account } = useActiveWeb3React()
    return (
        <>
            <Route
                {...rest}
                render={({ location, props, match }: any) => {
                    return account ? (
                        Component ? (
                            <Component {...props} {...rest} match={match} />
                        ) : (
                            children
                        )
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/connect',
                                state: { from: location }
                            }}
                        />
                    )
                }}
            />
        </>
    )
}
