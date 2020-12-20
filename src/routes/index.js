import React, { useEffect } from 'react'
import { Plugins } from '@capacitor/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Main from './Main/Main'

const useSplashHide = () => {
  useEffect(() => {
    Plugins.SplashScreen.hide();
  }, []);
}

const App = () => {
  useSplashHide()
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
