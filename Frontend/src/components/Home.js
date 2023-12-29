import React from "react";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
    const { loggedIn, email } = props;
    const navigate = useNavigate();

    const onButtonClick = () => {
        if (loggedIn) {
            localStorage.removeItem("user");
            props.setLoggedIn(false);
        } else {
            navigate("/signup");
        }
    };

    const onLoginLinkClick = () => {
        navigate("/login");
    };

    const isUserLoggedIn = !!localStorage.getItem("user");

    return (
        <div className="mainContainer">
        <div className="center-page-one">
            <div className={"titleContainer"}>
                <div>Welcome!</div>
            </div>
            <div className={"buttonContainer"}>
                <input
                    className={"inputButton"}
                    type="button"
                    onClick={onButtonClick}
                    value={"Sign up"}
                />
            </div>
            <div className={"login-account-have"}>
                Already have an account?
                <span className={"login-link"} onClick={onLoginLinkClick}>
                    {" "}
                    Login
                </span>
            </div>
        </div>
    </div>
    );
};

export default Home;