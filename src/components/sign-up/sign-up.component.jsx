import { useState, useRef, useContext } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserProfileDocument,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-up.styles.scss";
import { validateForm } from "../../utils/forms/form.utils";
import { Link } from "react-router-dom";
import Button from "../button/button.component";
import { userContext } from "../../context/user.context";

const SignUp = () => {
  const refs = {
    email: useRef(null),
    password: useRef(null),
    userName: useRef(null),
    confirmPassword: useRef(null),
  };

  const defaultFields = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const formValidations = validateForm(formFields);
    if (formValidations.isValid ) {
      try {
        const { user } = await createAuthUserWithEmailAndPassword(
          formFields.email,
          formFields.password
        );
        setFormFields(defaultFields);
        setErros({});
        console.log("User created successfully", user);
        setCurrentUser(user);
        const userDocRef = await createUserProfileDocument({
          ...user,
          displayName: formFields.userName,
          emailVerified: user.emailVerified,
        });
        console.log("User document reference", userDocRef);
      } catch (e) {
        console.error("Error creating user", e);
        switch (e.code) {
          case "auth/email-already-in-use":
            setErros({ email: "Email already in use" });
            refs.email.current.focus();
            break;
          case "auth/invalid-email":
            setErros({ email: "Invalid email address" });
            refs.email.current.focus();
            break;
          default:
            alert(
              "An error occurred while creating the user. Please try again."
            );
        }
      }
    } else {
      setErros(formValidations?.errors);
      const errorField = Object.keys(formValidations?.errors)?.[0];
      if (errorField && refs[errorField]?.current) {
        refs[errorField].current.focus();
        // refs[errorField].current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const onChange = (e, name) => {
    setFormFields({ ...formFields, [name]: e.target.value });
    setErros({ ...errors, [name]: "" });
  };

  const [formFields, setFormFields] = useState(defaultFields);
  const [errors, setErros] = useState({});
  const { userName, email, password, confirmPassword } = formFields;
  const { setCurrentUser } = useContext(userContext);

  return (
    <div className={"sign-up-container"}>
      <h1>Register and Get Started ! </h1>
      <span>
        Already have an account ?{" "}
        <Link className="sec-link" to="/sign-in">
          Log In
        </Link>
      </span>

      <form noValidate onSubmit={submitForm}>
        <FormInput
          label="User Name"
          type="text"
          required
          value={userName}
          onChange={(e) => onChange(e, "userName")}
          ref={refs?.userName}
          error={errors?.userName}
        ></FormInput>
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
        <FormInput
          label="Confirm Password"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => onChange(e, "confirmPassword")}
          ref={refs?.confirmPassword}
          error={errors?.confirmPassword}
        ></FormInput>
        <Button type="submit" style={{ margin: "auto" }}>
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
