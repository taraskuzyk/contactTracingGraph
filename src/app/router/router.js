import React, {useState} from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'

import LoginLayout from "../../layouts/LoginLayout/LoginLayout";
import LoginPage from "../../components/LoginPage/LoginPage";

import MainLayout from '../../layouts/MainLayout/MainLayout'
import MainPage from '../../components/MainPage/MainPage'

import notFoundLayout from '../../layouts/NotFoundLayout/NotFoundLayout'
import notFound from '../../components/404/404'

const AppRoute = ({Component, layout: Layout, ...rest }) => (
    <Route {...rest} render={props => {
        console.log('props', props)

        return (
            <Layout>
                <Component {...props} />
            </Layout>
        )
    }} />
)

export const Routes = () => {
    return (
        <Switch>
            <AppRoute exact path='/login' layout={LoginLayout} component={LoginPage} />
            <AppRoute exact path='/' layout={MainLayout} component={MainPage} />
            <AppRoute layout={notFoundLayout} component={notFound} />
        </Switch>
    )

}

export default withRouter(Routes)
