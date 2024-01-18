'use client';

import React, { useEffect, useState, useContext } from "react";
import { SignupContext } from "../../contexts/SignUpContext";
import { collection, query, onSnapshot, addDoc, getDocs, where } from "firebase/firestore";
import { db } from "../../firebasse";

export default function SubmitButton() {
  const [isMounted, setIsMounted] = useState(false);
  const [usersInDb, setUsersInDb] = useState([]);

  const {
    currentUsername,
    currentEmail,
    password1,
    password2,
    setUsernameValid,
    setEmailValid,
    setPasswordValid,
  } = useContext(SignupContext);

  useEffect(() => {
    setIsMounted(true);
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const users = [];
      snapshot.forEach((doc) => {
        users.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUsersInDb(users);
    });

    return () => unsubscribe(); // Clean up the subscription
  }, []);

  const usernameExists = async (username) => {
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const addNewUser = async (e) => {
    e.preventDefault();
    if (await usernameExists(currentUsername)) {
      alert("Username already exists. Please choose a different username.");
      return;
    }

    try {
      await addDoc(collection(db, "users"), {
        username: currentUsername,
        email: currentEmail,
        password: password1, // Note: Storing plain text passwords is not secure
      });
      alert("User added successfully");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <button
      className="bg-green-400 text-2xl font-bold mb-4 border-2 border-gray-200 rounded-xl p-4"
      onClick={addNewUser}
    >
      Sign Up
    </button>
  );
}