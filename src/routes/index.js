import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Main from './Main/Main'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact>
        <Main />
      </Route>
    </Switch>
  </BrowserRouter>
)

export default App
