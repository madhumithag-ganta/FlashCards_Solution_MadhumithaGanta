import React, {useEffect, useState} from "react";
import { Link, useHistory, useParams} from "react-router-dom";
import { readDeck, createCard} from "../utils/api/index";
import CardForm from "./CardForm";


function Deck() {
    const history = useHistory();
    const {deckId}= useParams();


    const [newCard, setNewCard] = useState({front: "", back: ""});;
    const [deck, setDeck] = useState({});

    useEffect(()=>{
    
        async function readDecks(){
            const abortController = new AbortController();
            try{
            const response = await readDeck(deckId,abortController.signal);
            setDeck(response);
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
    
    }, [deckId, setDeck]);

    function changeHandler({ target }) {
        setNewCard({
            ...newCard,
            [target.name]: target.value,
        });
    }

    async function doneButtonHandler() {
        history.push(`/decks/${deckId}`);
    }


    async function saveButtonHandler(event) {
        event.preventDefault();
        const abortController = new AbortController();
        const response = await createCard(
            deckId,
            { ...newCard },
            abortController.signal
        );
        history.go(0);
        setNewCard({front: "", back: ""});
        return response;
    }



    return (
        <div>
            <ul className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item">Add Card</li>
            </ul>
            <form onSubmit={saveButtonHandler}> 
                <h2>{deck.name}: Add Card</h2>
                <CardForm card={newCard} changeHandler={changeHandler} label1='Front' label2='Front'/>
                <button
                    className="btn btn-secondary"
                    onClick={doneButtonHandler}
                >
                    Done
                </button>
                <button type="submit"  className="btn btn-primary">
                    Save
                </button>
            </form>
        </div>
    );
}

export default Deck;
