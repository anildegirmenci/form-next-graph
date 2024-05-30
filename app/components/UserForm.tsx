"use client"; 

import { useState } from 'react';
import { gql, useMutation, ApolloError } from '@apollo/client';

const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!, $phone: String!, $consent: Boolean!) {
    addUser(name: $name, email: $email, phone: $phone, consent: $consent) {
      id
      name
      email
      phone
      consent
    }
  }
`;

const UserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [addUser] = useMutation(ADD_USER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.match(/^\d{10}$/)) {
      alert('Phone number must be 10 digits');
      return;
    }
    if (!consent) {
      alert('You must agree to the consent');
      return;
    }
    try {
      await addUser({
        variables: { name, email, phone, consent },
      });
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
      setName('');
      setEmail('');
      setPhone('');
      setConsent(false);
    } catch (error) {
      if (error instanceof ApolloError) {
        console.error('ApolloError:', error.message);
        console.error('GraphQLErrors:', error.graphQLErrors);
        console.error('NetworkError:', error.networkError);
      } else {
        console.error('Error adding user:', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base px-4 py-2"
            required
          />
          <p className="text-gray-400 text-sm mt-1">Phone number must be 10 digits</p>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="h-4 w-4 text-indigo-600 border-gray-600 rounded focus:ring-indigo-500"
          />
          <label className="ml-2 block text-sm text-gray-300">Consent</label>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
      {showPopup && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50">
          User added successfully!
        </div>
      )}
    </div>
  );
};

export default UserForm;
