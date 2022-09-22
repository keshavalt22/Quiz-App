import React from "react";
import Header from "./Header";
import Categories from "./Categories";
import Questions from "./Questions";
import Result from './Result';

import { BrowserRouter, Route } from 'react-router-dom';


class App extends React.Component {



  render() {
    return (
      <BrowserRouter>
        <Route path='/'>
          <Header />
        </Route>
        <Route path='/' exact>
          <Categories />
        </Route>
        <Route path='/quiz/:noOfqestion_id/:category_id/:difficulties_id' component={Questions} />
        <Route path='/result/:score/:noOfqestion_id' component={Result} />
      </BrowserRouter>
    )
  }
}


export default App;
