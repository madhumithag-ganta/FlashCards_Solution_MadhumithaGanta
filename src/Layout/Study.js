import React, {useEffect, useState} from "react";
import { Link, useHistory, useParams} from "react-router-dom";
import { readDeck } from "../utils/api/index";
import "../App.css";

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function Home() {
    const history = useHistory();
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const [front, setFront] = useState(true);
    const [cardNumber, setCardNumber] = useState(1);




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


function flip() {
    if (front) {
        setFront(false);
    } else {
        setFront(true);
    }
}


function nextCard(index, total) {
    console.log(index);
    if (index < total) {
        setCardNumber(cardNumber + 1);
        setFront(true);
    } else {
        if (
            window.confirm(
                `Restart Cards? Click 'cancel' to return to the Home Page`
            )
        ) {
            setCardNumber(1);
            setFront(true);
        } else {
            history.push("/");
        }
    }
}


function moreThanTwoCards() {
    return (
        <div className="card">
                {cards.map((card, index) => {
                    if (index === cardNumber - 1) {
                        return (
                            <div className="card-body" key={card.id}>
                                <div className="card-title">
                                    {`Card ${index + 1} of ${cards.length}`}
                                </div>
                                <div className="card-text">
                                    {front ? card.front : card.back}
                                </div>
                                <button
                                    onClick={flip}
                                    className="btn btn-secondary mx-1"
                                >
                                    Flip
                                </button>
                                {nextButton(cards, index)}
                            </div>
                        );
                    }
                    return false;

                })}
            </div>
    );
}

function lessThanThreeCards() {
    return (
        <div>
        <h2>Not enough cards.</h2>
        <p>
            You need at least 3 cards to study. There are {cards.length}{" "}
            cards in this deck.
        </p>
        <Link
            to={`/decks/${deck.id}/cards/new`}
            className="btn btn-primary mx-1"
        >
            Add Cards
        </Link>
    </div>
    );
}

function nextButton(cards, index) {
    if (front) {
        return null;
    } else {
        return (
            <button
            type="button"
                onClick={() => nextCard(index + 1, cards.length)}
            >
                Next
            </button>
        );
    }
}


 return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
        <ul  className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`} >{deck.name}</Link>
                </li>
                <li className="breadcrumb-item">Study</li>
            </ul>
            <div>
            <div>
                <h2>{`${deck.name}: Study`}</h2>
                <div>
                    {   cards.length===0 ?lessThanThreeCards()
                        :(cards.length > 2
                        ? moreThanTwoCards()
                        : lessThanThreeCards())
                    }
                </div>
            </div>
              </div>
    </div>
  );
}

export default Home;
