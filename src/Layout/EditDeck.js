import React, {useEffect, useState} from "react";
import { Link, useHistory} from "react-router-dom";
import { readDeck, updateDeck} from "../utils/api/index";
import "../App.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";


function EditDeck() {
    const history = useHistory();
    const {deckId}= useParams();

    const [deck, setDeck] = useState({name:"",description:""});

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
    
    }, [deckId]);


    function changeHandler({ target }) {
        setDeck({
          ...deck,
          [target.name]: target.value
        });
    }

    function cancelHandler() {
        history.push(`/decks/${deckId}`)
    }

    async function submitHandler(event) {
        event.preventDefault();
        const abortController = new AbortController();
        const response = await updateDeck({ ...deck }, abortController.signal);
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
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item">Edit Deck</li>
            </ul>
            <form onSubmit={submitHandler}> 
                <h2>Edit Deck</h2>
                <div>
                    <label>Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={deck.name}
                        onChange={changeHandler}
                    
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        id="description"
                        name="description"
                        type="text"
                        value={deck.description}
                        onChange={changeHandler}
                   
                    />
                </div>
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
