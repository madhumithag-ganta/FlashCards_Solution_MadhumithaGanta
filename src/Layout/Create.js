import React, {useState} from "react";
import { Link, useHistory} from "react-router-dom";
// import { listDecks, deleteDeck } from "../utils/api/index";
import "../App.css";
import { createDeck } from "../utils/api";

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function Create() {
    const history = useHistory();
    const [newDeck, setNewDeck] = useState({name: '', description: ''});

    async function changeHandler(event){
        setNewDeck({...newDeck, [event.target.name]: event.target.value});

    }
    function CancelHandler (){
        history.push('/');
    }


    async function submitHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const newDate = await createDeck({...newDeck}, abortController.signal);
    history.push('/');
    return newDate;
    }


  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
        <ul className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/">
                Home
        </Link></li>
        <li className="breadcrumb-item">Create Deck</li>
        </ul>
        <form onSubmit={(event)=>submitHandler(event)}>
            <h1> Create Deck</h1>
            <div>
            <label>Name</label>
            <input type="text" name="name" value={newDeck.name} onChange={changeHandler}/>
            </div>
            <div>
            <label>Description</label>
            <textarea type="text" name="description" value={newDeck.description} onChange={changeHandler}/>
            </div>
            <button onClick={CancelHandler}>
                    Cancel
                </button>
                <button  type="submit">
                    Submit
                </button>
        </form>
       

    </div>
  );
}

export default Create;
