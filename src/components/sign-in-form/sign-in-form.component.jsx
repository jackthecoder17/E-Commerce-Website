import { useState} from "react";
import {useNavigate} from "react-router-dom";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
// import { UserContext } from "../../context/user.context";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithEmailAndPasswordHandler,
} from "../../utils/firebase/firebase.utils";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import "./sign-in-form.styles.scss";
import { toast, ToastContainer } from "react-toastify";
const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  
  // const { setCurrentUser } = useContext(UserContext);

  console.log(formFields);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const signInwithGoogle = async () => {
    await signInWithGooglePopup();    
    navigate("/shop");

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const {user} = await signInWithEmailAndPasswordHandler(email, password);
      // console.log(response);
      // setCurrentUser(user);
      resetFormFields();
      toast.success("Sign In Successful");
      navigate("/shop");
    } catch (error) {
      switch(error.code){
        case "auth/user-not-found":
          toast.error("User not found");
          break;
        case "auth/wrong-password":
          toast.error("Incorrect Password");
          break
        default:
          toast.error("Something went wrong");
          // console.log("User Sign In encountered an error", error);  
      }
    }
  };

  return (
    <div className="sign-up-container">
      <ToastContainer />
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
          label="Email"
        />

        <FormInput
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
          label="Password"
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={signInwithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
