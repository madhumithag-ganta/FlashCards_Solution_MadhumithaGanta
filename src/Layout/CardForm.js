import React from "react";


function CardForm({card, changeHandler}) {

    return (
    <div>
                <div>
                    <label>Front</label>
                    <textarea
                        id="front"
                        name="front"
                        type="text"
                        value={card.front}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <label>Back</label>
                    <textarea
                        id="back"
                        name="back"
                        type="text"
                        value={card.back}
                        onChange={changeHandler}
                    />
                </div>
      </div>         
      
    );
}

export default CardForm;
