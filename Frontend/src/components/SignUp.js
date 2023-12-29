import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [ageError, setAgeError] = useState("");
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const showToast = (message, type) => {
        toast[type](message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const createUser = async () => {
        const url = "https://todoapp-f5si.onrender.com/create-user";

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                First_Name: firstName,
                Last_Name: lastName,
                Age: age,
                Email: email,
                Password: password,
            }),
        };

        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();

            if (response.status === 201) {
                console.log("User created successfully!");
                return { status: true };
            } else {
                console.error(data.message);
                return { status: false, error: data };
            }
        } catch (error) {
            if (error.code === 11000) {
                console.error("Error creating user:", error.message);
                return { status: false, error: { message: "Email already exists" } };
            } else {
                console.error("Error creating user:", error.message);
                return { status: false, error: { message: "Something went wrong" } };
            }
        }
    };

    const onButtonClick = async () => {
        setEmailError("");
        setPasswordError("");
        setFirstNameError("");
        setLastNameError("");
        setAgeError("");

        if (loading) return; 

        if ("" === firstName) {
            setFirstNameError("Please enter your first name");
            showToast("Please enter your first name", "error");
            return;
        }

        const NameRegex = /^[A-Za-z]+$/;

        if (!NameRegex.test(firstName)) {
            setFirstNameError("First name should only contain alphabets");
            showToast("First name should only contain alphabets", "error");
            return;
        }

        if ("" === lastName) {
            setLastNameError("Please enter your last name");
            showToast("Please enter your last name", "error");
            return;
        }

        if (!NameRegex.test(lastName)) {
            setLastNameError("Last name should only contain alphabets");
            showToast("Last name should only contain alphabets", "error");
            return;
        }

        if ("" === age) {
            setAgeError("Please enter your age");
            showToast("Please enter your age", "error");
            return;
        }

        const ageRegex = /^\d+$/;
        const ageValue = parseInt(age, 10);

        if (!ageRegex.test(age) || ageValue <= 0) {
            setAgeError("Age should be a positive number");
            showToast("Age should be a positive number", "error");
            return;
        }

        if ("" === email) {
            setEmailError("Please enter your email");
            showToast("Please enter your email", "error");
            return;
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email");
            showToast("Please enter a valid email", "error");
            return;
        }

        if ("" === password) {
            setPasswordError("Please enter a password");
            showToast("Please enter a password", "error");
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if (!passwordRegex.test(password)) {
            setPasswordError("Password 8 & at least one uppercase, lowercase, number, special character.");
            showToast("Password requirements not met", "error");
            return;
        }

        try {
            setLoading(true); 
            const response = await createUser();
            if (response.status) {
                console.log("User created successfully!");
                showToast("User created successfully!", "success");
                navigate("/login");
            } else {
                if (response.error && response.error.code === 11000) {
                    setEmailError("Email already exists. Please use a different email.");
                    showToast("Email already exists. Please use a different email.", "error");
                } else {
                    setEmailError("Email already exists. Please use a different email.");
                    showToast("Email already exists. Please use a different email.", "error");
                    console.error(response.message);
                }
            }
        } catch (error) {
            setEmailError("Something went wrong. Please try again");
            showToast("Something went wrong. Please try again", "error");
            console.error("Error creating user:", error.message);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className={"mainContainer"}>
            <div className="center-page-two">
                <div className={"titleContainer"}>
                    <div>SignUp</div>
                </div>
                <br />
                <div className={"inputContainer"}>
                    <input
                        value={firstName}
                        placeholder="Enter your first name here"
                        onChange={ev => setFirstName(ev.target.value)}
                        className={"inputBox"}
                    />
                    <label className="errorLabel">{firstNameError}</label>
                </div>
                <br />
                <div className={"inputContainer"}>
                    <input
                        value={lastName}
                        placeholder="Enter your last name here"
                        onChange={ev => setLastName(ev.target.value)}
                        className={"inputBox"}
                    />
                    <label className="errorLabel">{lastNameError}</label>
                </div>
                <br />
                <div className={"inputContainer"}>
                    <input
                        value={age}
                        placeholder="Enter your age here"
                        onChange={ev => setAge(ev.target.value)}
                        className={"inputBox"}
                    />
                    <label className="errorLabel">{ageError}</label>
                </div>
                <br />
                <div className={"inputContainer"}>
                    <input
                        value={email}
                        placeholder="Enter your email here"
                        onChange={ev => setEmail(ev.target.value)}
                        className={"inputBox"}
                    />
                    <label className="errorLabel">{emailError}</label>
                </div>
                <br />
                <div className={"inputContainer"}>
                    <input
                        value={password}
                        placeholder="Enter your password here"
                        onChange={ev => setPassword(ev.target.value)}
                        className={"inputBox"}
                    />
                    <label className="errorLabel">{passwordError}</label>
                </div>
                <br />
                <div className={"inputContainer"}>
                    <input
                        className={"inputButton"}
                        type="button"
                        onClick={onButtonClick}
                        value={loading ? "Signing.." : "Sign up"} 
                        disabled={loading} 
                    />
                </div>
            </div>
        </div>
    );
};

export default Signup;