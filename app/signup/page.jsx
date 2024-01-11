import '@styles/Signup.css'; // styles

import UserNameInput from '@components/signup/UserNameInput'; // Client component
import EmailInput from '@components/signup/EmailInput'; // Client component
import PasswordInput from '@components/signup/PasswordInput'; // Client component
import ConfirmPasswordInput from '@components/signup/ConfirmPasswordInput'; // Client component
import SubmitButton from '@components/signup/SubmitButton'; // Client component

//validations components

export default function Signup() {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-200">
      <div className="w-1/2 bg-white rounded-xl p-8">
        <h1 className="text-center text-2xl font-bold mb-4">Signup</h1>
        <form className="flex flex-col gap-4">
          <UserNameInput />
          <EmailInput />
          <PasswordInput />
          <ConfirmPasswordInput />
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
