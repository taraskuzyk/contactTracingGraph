import React from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'

import MainLayout from '../../layouts/MainLayout/mainLayout'
import MainPage from '../../components/MainPage/mainPage'

import notFound from '../../components/404/404'
import notFoundLayout from '@/layouts/NotFoundLayout/notFoundLayout'

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
      <AppRoute exact path='/' layout={MainLayout} component={MainPage} />
      <AppRoute layout={notFoundLayout} component={notFound} />
    </Switch>
  )

}

export default withRouter(Routes)
