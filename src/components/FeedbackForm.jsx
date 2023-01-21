import { useState, useContext, useEffect } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm({}) {

    const[text, setText] = useState("");
    const[rating, setRating] = useState(10);
    const[btnDisabled, setBtnDisabled] = useState(true);
    const[message, setMessage] = useState("");

    const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext);

    useEffect(() => {
        if(feedbackEdit.edit === true){
            setBtnDisabled(false);
            setText(feedbackEdit.item.text);
            setRating(feedbackEdit.item.rating);
        }
    }, [feedbackEdit])

    const handleTextChange = (e) => {
        // let charlength = text.length();
        if(text === ""){
            setBtnDisabled(true);
            setMessage(null);
        } else if(text !== "" && text.trim().length <= 9){
            setMessage("Text must be at least 10 characters.");
            setBtnDisabled(true);
        } else {
            setMessage(null);
            setBtnDisabled(false);
        }
        setText(e.target.value);
    }

    const handleSubmit = (e) => {
        if(text.trim().length > 10) {
            const newFeedback = {
                text, 
                rating,
            }
            if(feedbackEdit.edit){
                updateFeedback(feedbackEdit.item.id, newFeedback)
            } else {
                addFeedback(newFeedback);
            }
            setText("");
        }
        e.preventDefault();
    };

  return (
    <Card>
    <form onSubmit={handleSubmit} action="">
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
            <input onChange={handleTextChange} type="text" placeholder="Write your review here." value={text} />
            <Button type="submit" isDisabled={btnDisabled}> Send </Button>
        </div>
        {message}
    </form>    
    </Card>
  )
}

export default FeedbackForm;