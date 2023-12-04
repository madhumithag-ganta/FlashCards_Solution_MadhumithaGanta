import React, {useEffect, useState} from "react";
import { Link, useHistory} from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";
import "../App.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function Deck() {
    const history = useHistory();
    const {deckId}= useParams();
    const [cards, setCards] = useState([]);
    const [deck, setDeck] = useState([]);

    useEffect(()=>{
    
        async function readDecks(){
            const abortController = new AbortController();
            try{
            const response = await readDeck(deckId,abortController.signal);
            setDeck(response);
            setCards(response.cards);
          }catch(err){
            if(err.name === 'AbortError'){
              console.log('aborted');
            }else{
              throw err;
            }
          }
          return () => {
            abortController.abort();
        };
        }
    
        readDecks();
    
    }, [deckId]);

    function editDeckHandler() {
        history.push(`/decks/${deckId}/edit`);
    }

    function studyHandler() {
        history.push(`/decks/${deckId}/study`);
    }

    function addCardHandler() {
        history.push(`/decks/${deckId}/cards/new`);
    }

    async function editCardHandler(card) {
        history.push(`/decks/${deckId}/cards/${card.id}/edit`);
    }

    async function deleteDeckHandler(deck) {
        if (
            window.confirm(
                `Delete this deck? You will not be able to recover it`
            )
        ) {
            const abortController = new AbortController();
            try {
                history.push("/");
                return await deleteDeck(deck.id, abortController.signal);
            } catch (error) {
                console.error("Error", error);
            }
            return () => {
                abortController.abort();
            };
        }
    }

    async function deleteCardHandler(card) {
        if (
            window.confirm(
                `Delete this card? You will not be able to recover it`
            )
        ) {
            const abortController = new AbortController();
            try {
                history.go(0);
                return await deleteCard(card.id, abortController.signal);
            } catch (error) {
                console.error("Error", error);
            }
            return () => {
                abortController.abort();
            };
        }
    }

    if (cards.length > 0) {
        return (
            <div>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">{deck.name}</li>
                </ol>
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">{deck.name}</h2>
                        <p>{deck.description}</p>
                        <button
                            onClick={() => editDeckHandler()}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => studyHandler()}
                          
                        >
                            Study
                        </button>
                        <button
                            onClick={() => addCardHandler()}
                        >
                            Add Cards
                        </button>
                        <button
                            onClick={() => deleteDeckHandler(deck)}
                     
                        >
                            Delete
                        </button>
                    </div>
                </div>
                <h1>Cards</h1>
                {cards.map((card) => {
                    return (
                        <div className="card-deck" key={card.id}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">{card.front}</div>
                                        <div className="col">{card.back}</div>
                                    </div>
                                    <div className="container row">
                                        <button
                                            onClick={() => editCardHandler(card)}
                                           
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                deleteCardHandler(card)
                                            }
                            
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    } else {
        return (
            <div>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">{deck.name}</li>
                </ol>
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">{deck.name}</h2>
                        <p>{deck.description}</p>
                        <button
                            onClick={() => editDeckHandler()}
                    
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => studyHandler()}
                        >
                            Study
                        </button>
                        <button
                            onClick={() => addCardHandler()}
                        >
                            Add Cards
                        </button>
                        <button
                            onClick={() => deleteDeckHandler(deck)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
                </div>
        )
    }
}

export default Deck;
