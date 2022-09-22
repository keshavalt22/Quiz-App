import React from "react";
import Header from "./Header";
import Categories from "./Categories";
import Questions from "./Questions";

import { BrowserRouter, Route } from 'react-router-dom';


class App extends React.Component {
  constructor(props) {
    super(props)
  }




  render() {
    return (
      <BrowserRouter>
        <Route path='/'>
          <Header />
        </Route>
        <Route path='/' exact>
          <Categories />
        </Route>
        <Route path='/quiz/:category_id/:difficulties_id' component={Questions} />
      </BrowserRouter>
    )
  }
}


export default App;
