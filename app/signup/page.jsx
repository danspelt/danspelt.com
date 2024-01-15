import '@styles/Signup.css'; // styles

import { addUser } from 'app/db-tools/userFunction';
import UserNameInput from '@components/signup/UserNameInput'; // Client component
import EmailInput from '@components/signup/EmailInput'; // Client component
import PasswordInput from '@components/signup/PasswordInput'; // Client component
import ConfirmPasswordInput from '@components/signup/ConfirmPasswordInput'; // Client component
import SubmitButton from '@components/signup/SubmitButton'; // Client component

//validations components

export default function Signup() {

  const handleSubmit = async (formData) => {
    
    "use server"
    const username = 'test';
    const password = '<PASSWORD>';
    const avatar = 'https://avatars.githubusercontent.com/u/15192983?v=4';
    const email = '<EMAIL>';

    await addUser(username, password, avatar, email);
  };          
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-200">
      <div className="w-1/2 bg-white rounded-xl p-8">
        <h1 className="text-center text-2xl font-bold mb-4">Signup</h1>
        <form action={handleSubmit} className="flex flex-col gap-4">
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
