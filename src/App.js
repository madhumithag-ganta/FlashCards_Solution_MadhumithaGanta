import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Layout/Home";
import Create from "./Layout/Create";
import Header from "./Layout/Header";
import Study from "./Layout/Study";
import Deck from "./Layout/Deck";
import AddCard from "./Layout/AddCard";
import EditDeck from "./Layout/EditDeck";
import EditCard from "./Layout/EditCard";
import NotFound from "./Layout/NotFound";
// import "./App.css";

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */



function App() {
  return (
    <div className="app-routes">
      <Header />
      <div className="container">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/decks/new">
          <Create />
        </Route>
        <Route exact path="/decks/:deckId">
                            <Deck />
                        </Route>
        <Route path="/decks/:deckId/study">
           <Study />
        </Route>

        <Route path="/decks/:deckId/cards/new">
           <AddCard />
        </Route>
        <Route path="/decks/:deckId/edit">
           <EditDeck />
        </Route>
        <Route path="/decks/:deckId/cards/:cardId/edit">
          <EditCard />
        </Route>
        <Route>
          <NotFound />
        </Route>

      </Switch>
      </div>
    </div>
  );
}

export default App;
