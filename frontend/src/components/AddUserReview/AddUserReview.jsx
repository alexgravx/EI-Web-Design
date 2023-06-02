import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const DEFAULT_FORM_VALUES = {
  user_id: 1,
  rating: '',
  movie_title: '',
  movie_id: '',
};

function AddReview({ onSuccessfulReviewCreation, currentmovie }) {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);

  const SaveReview = () => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/reviews/new`, formValues)
      .then(() => {
        setFormValues(DEFAULT_FORM_VALUES);
        onSuccessfulReviewCreation();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="lk-buttons">
      <button
        className="like-button"
        onClick={
          (() =>
            setFormValues({
              ...formValues,
              rating: 1,
              movie_id: currentmovie.id,
              movie_title: currentmovie.original_title,
            }),
          SaveReview)
        }
      >
        <FontAwesomeIcon icon={faThumbsUp} />
      </button>
      <button
        className="dislike-button"
        onClick={
          (() =>
            setFormValues({
              ...formValues,
              rating: 0,
              movie_id: currentmovie.id,
              movie_title: currentmovie.original_title,
            }),
          SaveReview)
        }
      >
        <FontAwesomeIcon icon={faThumbsDown} />
      </button>
    </div>
  );
}

export default AddReview;
