import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const defaultFormFields = {
  username: "",
  password: "",
};

const SignUp = () => {
  const [userCredential, setUserCredential] = useState(defaultFormFields);
  const [message, setMessage] = useState("");
  const { username, password } = userCredential;

  const resetFormFields = () => {
    setUserCredential(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserCredential({ ...userCredential, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(username);
    console.log(password);
    // sign up process:
    // request to backend -> check if unique username
    // set user state if success
    // show error message if fail -> setMessage()
    resetFormFields();
  };

  return (
    <div className="pt-3 pb-5 px-4">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <TextField
          label="Username"
          type="text"
          required
          onChange={handleChange}
          name="username"
          value={username}
          variant="outlined"
        />

        <TextField
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
          variant="outlined"
        />
        <div className="text-sm text-rose-700">{message}</div>
        <Button type="submit" color="secondary" variant="contained">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
