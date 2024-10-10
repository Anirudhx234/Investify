import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { selectProfileData, setProfileData, resetProfileData } from "../features/profileSlice";
import HeadShot from '../../public/assets/headshot2.jpg';
import Modal from "../components/Modal";
import { MdEdit } from "react-icons/md";

export default function Profile() {
  const dispatch = useDispatch();
  const deleteModalRef = useRef<HTMLDialogElement>(null);
  const usernameModalRef = useRef<HTMLDialogElement>(null);
  const emailModalRef = useRef<HTMLDialogElement>(null);
  const ageModalRef = useRef<HTMLDialogElement>(null);
  const fingoalsModalRef = useRef<HTMLDialogElement>(null);
  
  const [newUsername, setNewUsername] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [newAge, setNewAge] = useState<number>(0); 
  const [newFingoals, setNewFingoals] = useState<string>(''); 
  
  const profileData = useSelector((state: RootState) => selectProfileData(state)) || {
    username: 'JohnDoe',
    email: 'john.doe@example.com',
    image: HeadShot,
    password: '*********************',
    age: 5,
    fingoals: 'Make a Million',
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setProfileData({
          ...profileData,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const printp = () => {
    console.log("Hi");
  };

  const handleDeleteProfile = () => {
    dispatch(resetProfileData());
    if (deleteModalRef.current) {
      deleteModalRef.current.close();
    }
  };

  const handleUsernameOpen = () => {
    setNewUsername(profileData.username);
    if (usernameModalRef.current) {
      usernameModalRef.current.showModal();
    }
  };

  const handleUsernameClose = () => {
    if (usernameModalRef.current) {
      usernameModalRef.current.close();
    }
  };

  const handleEmailOpen = () => {
    setNewEmail(profileData.email);
    if (emailModalRef.current) {
      emailModalRef.current.showModal();
    }
  };

  const handleEmailClose = () => {
    if (emailModalRef.current) {
      emailModalRef.current.close();
    }
  };

  const handleAgeOpen = () => {
    setNewAge(profileData.age); // Initialize with current age
    if (ageModalRef.current) {
      ageModalRef.current.showModal();
    }
  };

  const handleAgeClose = () => {
    if (ageModalRef.current) {
      ageModalRef.current.close();
    }
  };

  const handleFingoalsOpen = () => {
    setNewFingoals(profileData.fingoals); // Initialize with current financial goals
    if (fingoalsModalRef.current) {
      fingoalsModalRef.current.showModal();
    }
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Parse to number and update state
    const numberValue = value ? parseInt(value, 10) : 0; // Default to 0 if empty
    setNewAge(numberValue);
  };

  const handleFingoalsClose = () => {
    if (fingoalsModalRef.current) {
      fingoalsModalRef.current.close();
    }
  };

  const handleDeleteClose = () => {
    if (deleteModalRef.current) {
      deleteModalRef.current.close();
    }
  };

  const handleDeleteOpen = () => {
    if (deleteModalRef.current) {
      deleteModalRef.current.showModal();
    }
  };

  const handleEditUsername = () => {
    if (newUsername.trim() !== '') {
      dispatch(setProfileData({
        ...profileData,
        username: newUsername.trim(),
      }));
      handleUsernameClose(); 
    } else {
      alert('Username cannot be empty');
    }
  };

  const handleEditEmail = () => {
    if (newEmail.trim() !== '' && newEmail.includes('@')) {
      dispatch(setProfileData({
        ...profileData,
        email: newEmail.trim(),
      }));
      handleEmailClose(); 
    } else {
      alert('Invalid email. Please enter a valid email address.');
    }
  };

  const handleEditAge = () => {
    if (typeof newAge === 'number' && newAge >= 0) {
      dispatch(setProfileData({
        ...profileData,
        age: newAge,
      }));
      handleAgeClose(); 
    } else {
      alert('Please enter a valid age.');
    }
  };

  const handleEditFingoals = () => {
    if (newFingoals.trim() !== '') {
      dispatch(setProfileData({
        ...profileData,
        fingoals: newFingoals.trim(),
      }));
      handleFingoalsClose(); 
    } else {
      alert('Financial goals cannot be empty.');
    }
  };

  return (
    <div className="col-span-2 bg-base-100 p-6 rounded shadow-sm">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-center my-6">Profile</h2>
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
          {profileData.image ? (
            <img src={profileData.image as string} alt="Profile" className="object-cover w-full h-full" />
          ) : (
            <span className="flex items-center justify-center w-full h-full text-gray-500">No Image</span>
          )}
        </div>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload} 
          className="hidden" 
          id="profilePic" 
        />

        <div className="space-y-4">
          {[
            { label: 'Username', value: profileData.username, onEdit: handleUsernameOpen },
            { label: 'Email', value: profileData.email, onEdit: handleEmailOpen },
            { label: 'Password', value: profileData.password, onEdit: printp },
            { label: 'Age', value: profileData.age, onEdit: handleAgeOpen }, 
            { label: 'Financial Goals', value: profileData.fingoals, onEdit: handleFingoalsOpen }, 
          ].map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">{item.label}</label>
                <p className="mt-1 text-gray-500">{item.value}</p>
              </div>
              <button onClick={item.onEdit} className="text-primary pl-4 hover:underline"><MdEdit /></button>
            </div>
          ))}
        </div>
        <br/>

        <div className="flex items-center justify-between space-x-5">
  <label 
    htmlFor="profilePic" 
    className="cursor-pointer bg-primary text-white py-2 px-4 rounded mt-2"
  >
    Update Profile Pic
  </label>

  <button
    onClick={handleDeleteOpen}
    className="bg-error text-white py-2 px-4 rounded mt-2 hover:bg-error-focus"
  >
    Delete Profile
  </button>
</div>


        <Modal ref={deleteModalRef} title="Confirm Deletion" onExit={handleDeleteClose}>
          <p>Are you sure you want to delete your profile?</p>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleDeleteProfile}
              className="mr-2 bg-error text-white py-2 px-4 rounded hover:bg-error-focus"
            >
              Yes, Delete
            </button>
            <button
              onClick={handleDeleteClose}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </Modal>

        <Modal ref={usernameModalRef} title="New UserName" onExit={handleUsernameClose}>
          <div className="space-y-4">
            <br />
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleEditUsername}
              className="mr-2 bg-primary text-white py-2 px-4 rounded hover:bg-primary-focus"
            >
              Save
            </button>
            <button
              onClick={handleUsernameClose}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </Modal>

        <Modal ref={emailModalRef} title="New Email" onExit={handleEmailClose}>
          <div className="space-y-4">
            <br />
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleEditEmail}
              className="mr-2 bg-primary text-white py-2 px-4 rounded hover:bg-primary-focus"
            >
              Save
            </button>
            <button
              onClick={handleEmailClose}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </Modal>

        <Modal ref={ageModalRef} title="New Age" onExit={handleAgeClose}>
          <div className="space-y-4">
            <br />
            <input
              type="number"
              value={newAge}
              onChange={handleAgeChange}
              className="input input-bordered w-full"
              min={0} // Prevent negative age
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleEditAge}
              className="mr-2 bg-primary text-white py-2 px-4 rounded hover:bg-primary-focus"
            >
              Save
            </button>
            <button
              onClick={handleAgeClose}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </Modal>

        <Modal ref={fingoalsModalRef} title="New Financial Goals" onExit={handleFingoalsClose}>
          <div className="space-y-4">
            <br />
            <input
              type="text"
              value={newFingoals}
              onChange={(e) => setNewFingoals(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleEditFingoals}
              className="mr-2 bg-primary text-white py-2 px-4 rounded hover:bg-primary-focus"
            >
              Save
            </button>
            <button
              onClick={handleFingoalsClose}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
