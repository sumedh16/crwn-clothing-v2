import {
  signInWithGooglePopup,
  signInWithEmailAndPasswordHandler,
} from "../../utils/firebase/firebase.utils";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import FormInput from "../../components/form-input/form-input.component";
import { validateForm } from "../../utils/forms/form.utils";
import Button from "../../components/button/button.component";

const SignIn = () => {
  const defaultFields = {
    email: "",
    password: "",
  };

  const refs = {
    email: useRef(null),
    password: useRef(null),
  };

  const signInWithGoogle = async () => {

    const { user } = await signInWithGooglePopup();
    if(user) {
      setFormFields(defaultFields);
      setErrors({});
      console.log("User signed in with Google successfully");
    }
  };

  const onChange = (e, name) => {
    setFormFields({ ...formFields, [name]: e.target.value });
    setErrors({ ...errors, [name]: "" });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const formValidations = validateForm(formFields);
    if (formValidations.isValid) {
      try {
        const user = await signInWithEmailAndPasswordHandler(email, password);
        if (user) {
          setFormFields(defaultFields);
          setErrors({});
          console.log("User signed in successfully");
        }
      } catch (e) {
        console.error("Error signing in user", e);
        switch (e.code) {
          case "auth/user-not-found":
            setErrors({ email: "User not found" });
            refs.email.current.focus();
            break;
          case "auth/wrong-password":
            setErrors({ email: "Incorrect password or email", password: "Incorrect password or email" });
            refs.password.current.focus();
            break;
          default:
            alert("An error occurred while signing in. Please try again.");
        }
      }
    } else {
      setErrors(formValidations?.errors);
      const errorField = Object.keys(formValidations?.errors)?.[0];
      if (errorField && refs[errorField]?.current) {
        refs[errorField].current.focus();
        // refs[errorField].current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const [formFields, setFormFields] = useState(defaultFields);
  const [errors, setErrors] = useState({});
  const { email, password } = formFields;
  return (
    <div className="sign-up-container">
      <h1>Welcome !</h1>
      <span>
        Don't have an account ?{" "}
        <Link className={"sec-link"} to="/sign-up">
          Register Now
        </Link>
      </span>
      <form noValidate onSubmit={submitForm}>
        <FormInput
          label="Email"
          type="text"
          required
          value={email}
          onChange={(e) => onChange(e, "email")}
          ref={refs?.email}
          error={errors?.email}
        ></FormInput>
        <FormInput
          label="Password"
          type="password"
          required
          value={password}
          onChange={(e) => onChange(e, "password")}
          ref={refs?.password}
          error={errors?.password}
        ></FormInput>
        <div className="registration-buttons">
          <Button type="submit">Sign In</Button>
          <Button buttonType="google" type="button" onClick={signInWithGoogle}>
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
