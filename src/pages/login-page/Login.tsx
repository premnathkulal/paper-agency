import "./Login.scss";
import { FormEvent, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import InputBox, { InputTypes } from "../../components/input-box/InputBox";
import useNavigation from "../../hooks/useNavigation";
import { RoutesList } from "../../routes/main-route";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setShowError(false);
  }, [userName, password]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userName === "yadava" && password === "yadava") {
      await localStorage.setItem(
        "userInfo",
        JSON.stringify({
          isAuthenticated: true,
        })
      );
      navigation.handleNavigation(RoutesList.HOME);
      return;
    }
    setShowError(true);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <div className={`login-container ${showError ? "error-warn" : ""}`}>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-title">
            <p>Login</p>
          </div>
          <InputBox
            id="user-name"
            name="user-name"
            type={InputTypes.Text}
            label="User Name or Email"
            value={userName}
            isRequired
            setInputValue={setUserName}
          />
          <InputBox
            id="password"
            name="password"
            type={!showPassword ? InputTypes.Password : InputTypes.Text}
            label="Password"
            value={password}
            isRequired
            isHiddenInput
            setInputValue={setPassword}
            handleShowHideInput={handleShowPassword}
          />
          <button type="submit" className="btn">
            LOGIN
          </button>
          {/* <a href="/#" className="forgot-password-link">
            Forgot Password?
          </a> */}
          {showError && (
            <p className="warn-message">
              <FontAwesomeIcon icon={faCircleInfo} />
              <span>Invalid Credentials</span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
