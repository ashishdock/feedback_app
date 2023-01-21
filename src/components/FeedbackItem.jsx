import Card from "./shared/Card"
import PropTypes from "prop-types";
import {FaTimes, FaEdit} from "react-icons/fa";
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";


function FeedbackItem({data}) {
  const {deleteFeedback, editFeedback} = useContext (FeedbackContext);
    
  return (
    <Card >
        <div className="num-display">{data.rating}</div>
        <button onClick={() => deleteFeedback(data.id)}  className="close"><FaTimes color="purple" /></button>
        <button onClick={() => editFeedback(data)}  className="edit"><FaEdit color="purple" /></button>
        <div className="text-display">{data.text}</div>
        
    </Card>
  )
}


FeedbackItem.propTypes = {
    data: PropTypes.object.isRequired,

}

export default FeedbackItem