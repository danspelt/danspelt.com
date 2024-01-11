
import PasswordBox from "./components/login/PasswordBox";
import MyButton from "./components/login/MyButton";
import "./styles/Login.css";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <PasswordBox />
      <div className="flex items-center justify-between">
        <MyButton label="Login" />
      </div>
    </div>
  );
}
