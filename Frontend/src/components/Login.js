import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 

    const showToast = (message, type) => {
        toast[type](message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const onButtonClick = async () => {
        setEmailError("");
        setPasswordError("");

        if (loading) return;

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

        try {
            setLoading(true);
            const response = await fetch("https://todoapp-f5si.onrender.com/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Email: email, Password: password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("user", JSON.stringify({ email, token: data.token }));
                props.setLoggedIn(true);
                props.setEmail(email);
                navigate("/todolist");
                showToast("Logged in successfully!", "success");
            } else {
                const data = await response.json();
                console.error("Error logging in:", data.message);
                showToast("Wrong email or password", "error");
            }
        } catch (error) {
            console.error("Error logging in:", error.message);
            showToast("Wrong email or password", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={"mainContainer"}>
            <div className="center-page-one">
                <div className={"titleContainer"}>
                    <div>Login</div>
                </div>
                <br />
                <div className={"inputContainer"}>
                    <input
                        value={email}
                        placeholder="Enter your email here"
                        onChange={(ev) => setEmail(ev.target.value)}
                        className={"inputBox"}
                    />
                    <label className="errorLabel">{emailError}</label>
                </div>
                <br />
                <div className={"inputContainer"}>
                    <input
                        value={password}
                        placeholder="Enter your password here"
                        onChange={(ev) => setPassword(ev.target.value)}
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
                        value={loading ? "logging.." : "Log in"}
                        disabled={loading}
                    />
                </div>
                <div className={"login-account-have"}>
                    Don't have an account?
                    <span className={"login-link"} onClick={() => navigate("/signup")}>
                        {" "}
                        Sign up
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;