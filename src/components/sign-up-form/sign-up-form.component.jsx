import { useState } from "react";
import {toast , ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import {createAuthUserwithEmailandPassword , createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
// import { useContext } from "react";
// import { UserContext } from "../../context/user.context";
import "./sign-up-form.styles.scss";
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword:''
}

const SignUpForm = () => {
    const navigate = useNavigate();

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword } = formFields;

    // const {setCurrentUser} = useContext(UserContext);
    console.log(formFields);

    const handleChange = (event) =>{
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    }; 

    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }



    const handleSubmit = async (event) =>{
        event.preventDefault();
        if(password !== confirmPassword ){
              alert("Passwords do not match")
              return;
        }

        try{
            const {user}= await createAuthUserwithEmailandPassword(email,password);
            // setCurrentUser(user);
            
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
            toast.success("Sign Up Successful");
            navigate("/shop");
            console.log("user created successfully");
            console.log(user);


        }catch(error){
            if(error.code === "auth/email-already-in-use"){
                toast.error("Email already in use");
                alert("Email already in use");
            }
            else{
            console.log('User Creation encountered an error',error);
            }
        }
    }

    return(
        <div className="sign-up-container">
            <ToastContainer/>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput type="text" required onChange={handleChange} name="displayName" value={displayName} label="Display Name"/>

               
                <FormInput type="email" required onChange={handleChange} name="email" value={email} label="Email"/>

                <FormInput type="password" required onChange={handleChange} name="password" value={password} label="Password"/>

                
                <FormInput type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} label="Confirm Password"/>

                <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.base}>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;