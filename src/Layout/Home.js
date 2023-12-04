import React, {useEffect, useState} from "react";
import { Link, useHistory} from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index";
import "../App.css";

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function Home() {
    const history = useHistory();
    const [decks, setDecks] = useState([]);

useEffect(()=>{
    
    async function fetchDecks(){
        const abortController = new AbortController();
        try{
        const response = await listDecks(abortController.signal);
        setDecks(response);
      }catch(err){
        if(err.name === 'AbortError'){
          console.log('Fetch aborted');
        }else{
          throw err;
        }
      }
    }

    fetchDecks();

}, []);


    async function deleteHandler(deck) {
        if (
            window.confirm(
                `Delete this deck? You will not be able to recover it`
            )
        ) {
            history.go(0);
            return await deleteDeck(deck.id);
        }
    }


  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
        <Link to="/decks/new" className="breadcrumb">
                Create Deck
        </Link>
        <div className="card-deck" style={{display: 'flex', flexDirection: 'column'}}>
        {decks.map(deck => (
          <div
            key={deck.id}
            className="card"
          >
          <div style={{display: "flex" , flexDirection: 'row', justifyContent: "space-between"}}>
          <div>
            {deck.name}
          </div>
          <div>
          {`${deck.cards.length} cards`}
          </div>
          </div>
          <div>
          {deck.description}
          </div>
          <div style={{display: 'flex', gap:'10px', flexDirection: 'row'}}>
          <Link to={`/decks/${deck.id}`}>
                View
        </Link>
        <Link to={`/decks/${deck.id}/study`}>
               Study
        </Link>
        </div>
        <button type="button" onClick={()=> deleteHandler(deck)}>
            Delete
        </button>
          </div>

        ))}
    </div>
    </div>
  );
}

export default Home;
