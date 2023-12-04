import React, {useEffect, useState} from "react";
import { Link, useHistory} from "react-router-dom";
import { readCard, readDeck, updateCard} from "../utils/api/index";
import CardForm from "./CardForm";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";


function EditDeck() {
    const history = useHistory();
    const {cardId, deckId}= useParams();

    const [deck, setDeck] = useState({name:"",description:""});
    const [card, setCard] = useState({front:"", back:""});;

    useEffect(()=>{
    
        async function readDecks(){
            const abortController = new AbortController();
            try{
                const cardResponse = await readCard(
                    cardId,
                    abortController.signal
                );
                const deckResponse = await readDeck(
                    deckId,
                    abortController.signal
                );
                setCard(cardResponse);
                setDeck(deckResponse);
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
    
    }, [cardId, deckId]);


    function changeHandler({ target }) {
        setCard({
          ...card,
          [target.name]: target.value
        });
    }

    function cancelHandler() {
        history.push(`/decks/${deckId}`)
    }

    async function submitHandler(event) {
        event.preventDefault();
        const abortController = new AbortController();
        const response = await updateCard({ ...card }, abortController.signal);
        history.push(`/decks/${deckId}`);
        return response;
    }

    return (
        <div>
            <ul className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>Deck {deck.name}</Link>
                </li>
                <li className="breadcrumb-item">Edit Card {cardId}</li>
            </ul>
            <form onSubmit={submitHandler}> 
                <h2>Edit Card</h2>
                <CardForm card={card} changeHandler={changeHandler}/>
                <button
                    className="btn btn-secondary"
                    onClick={cancelHandler}
                    
                >
                    Cancel
                </button>
                <button type="submit"  className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );

};


export default EditDeck;
