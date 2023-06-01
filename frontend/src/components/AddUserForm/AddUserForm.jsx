import { useState } from 'react';
import axios from 'axios';
import './AddUserForm.css';

const DEFAULT_FORM_VALUES = {
  email: '',
  nickname: '',
  name: '',
};

function AddUserForm({ onSuccessfulUserCreation }) {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);

  const [userCreationError, setUserCreationError] = useState(null);
  const [userCreationSuccess, setUserCreationSuccess] = useState(null);

  const displayCreationSuccessMessage = () => {
    setUserCreationSuccess('New user created successfully');
    setTimeout(() => {
      setUserCreationSuccess(null);
    }, 3000);
  };

  const saveUser = (event) => {
    // This avoid default page reload behavior on form submit
    event.preventDefault();

    setUserCreationError(null);

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/users/new`, formValues)
      .then(() => {
        displayCreationSuccessMessage();
        setFormValues(DEFAULT_FORM_VALUES);
        onSuccessfulUserCreation();
      })
      .catch((error) => {
        setUserCreationError('An error occured while creating new user.');
        console.error(error);
      });
  };

  return (
    <div>
      <form className="add-user-form" onSubmit={saveUser}>
        <input
          className="add-user-input"
          required
          type="Email"
          placeholder="Email"
          value={formValues.email}
          onChange={(event) =>
            setFormValues({ ...formValues, email: event.target.value })
          }
        />
        <input
          className="add-user-input"
          placeholder="Nickname"
          value={formValues.nickname}
          onChange={(event) =>
            setFormValues({ ...formValues, nickname: event.target.value })
          }
        />
        <input
          className="add-user-input"
          placeholder="Name"
          value={formValues.name}
          onChange={(event) =>
            setFormValues({ ...formValues, name: event.target.value })
          }
        />
        <button className="add-user-button" type="submit">
          Add user
        </button>
      </form>
      {userCreationSuccess !== null && (
        <div className="user-creation-success">{userCreationSuccess}</div>
      )}
      {userCreationError !== null && (
        <div className="user-creation-error">{userCreationError}</div>
      )}
    </div>
  );
}

export default AddUserForm;
