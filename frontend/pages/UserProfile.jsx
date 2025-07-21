import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  FiUser,
  FiMail,
  FiLock,
  FiCamera,
  FiSave,
  FiKey,
  FiTrash2,
} from 'react-icons/fi';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';

const UserProfile = ({ user, setUser, handleLogout }) => {
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState({
    name: user.name || '',
    email: user.email || '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [updatePassword, setUpdatePassword] = useState({
    oldPassword: '',
    password: '',
    passwordConfirm: '',
  });

  const [activeTab, setActiveTab] = useState('profile');

  const handleChange = (key, value) => {
    setUpdateData((prev) => ({ ...prev, [key]: value }));
  };

  const handlePhotoChange = async (file) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('photo', file);
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/UpdateUser`,
        {
          method: 'PATCH',
          credentials: 'include',
          body: formData,
        }
      );

      const respObj = await resp.json();

      if (respObj.status === 'sucess') {
        setUser((prev) => ({
          ...prev,
          photo: respObj.data.user.photo,
        }));
        toast.success('Profile picture updated successfully!');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/UpdateUser`,
        {
          method: 'PATCH',
          credentials: 'include',
          body: JSON.stringify(updateData),
          headers: {
            'content-type': 'application/json',
          },
        }
      );

      const respObj = await resp.json();

      if (respObj.status === 'sucess') {
        setUser((prev) => ({
          ...prev,
          name: respObj.data.user.name,
          email: respObj.data.user.email,
        }));
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = (key, value) => {
    setUpdatePassword((prev) => ({ ...prev, [key]: value }));
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/updatePassword`,
        {
          method: 'PATCH',
          credentials: 'include',
          body: JSON.stringify(updatePassword),
          headers: {
            'content-type': 'application/json',
          },
        }
      );

      const respObj = await resp.json();

      if (respObj.status === 'sucess') {
        toast.success('Password updated successfully!');
        setUpdatePassword({
          oldPassword: '',
          password: '',
          passwordConfirm: '',
        });
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/deleteUser`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );

      const respObj = await resp.json();
      if (respObj.status === 'sucess') {
        toast.success('Account deleted successfully');
        // localStorage.removeItem('isLoggedin');
        setUser({ isLoggedin: false, name: 'guest' });
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar user={user} handleLogout={handleLogout} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative mb-6 group">
            <img
              src={user.photo}
              alt={user.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-sky-400/50 shadow-lg transition-transform group-hover:scale-105"
            />
            <label className="absolute bottom-2 right-2 bg-sky-500 p-2 rounded-full cursor-pointer hover:bg-sky-600 transition-colors shadow-md">
              <FiCamera className="text-white text-lg" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) handlePhotoChange(file);
                }}
                className="hidden"
              />
            </label>
          </div>

          <h1 className="text-3xl font-bold text-white mb-1">{user.name}</h1>
          <p className="text-gray-300 flex items-center">
            <FiMail className="mr-2 text-sky-400" />
            {user.email}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-700 mb-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 font-medium flex items-center transition-colors ${
              activeTab === 'profile'
                ? 'text-sky-400 border-b-2 border-sky-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FiUser className="mr-2" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`px-6 py-3 font-medium flex items-center transition-colors ${
              activeTab === 'password'
                ? 'text-sky-400 border-b-2 border-sky-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FiKey className="mr-2" />
            Password
          </button>
        </div>

        {/* Profile Update Form */}
        {activeTab === 'profile' && (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm shadow-lg mb-8"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-500" />
                  </div>
                  <input
                    name="name"
                    type="text"
                    value={updateData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="pl-10 w-full bg-gray-700/50 border border-gray-600/50 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/30 transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-500" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    value={updateData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="pl-10 w-full bg-gray-700/50 border border-gray-600/50 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/30 transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-sky-500 to-emerald-500 text-white py-3 px-6 rounded-lg font-medium hover:from-sky-600 hover:to-emerald-600 transition-all flex items-center justify-center shadow-md hover:shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoadingSpinner size="small" />
                ) : (
                  <>
                    <FiSave className="mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Password Update Form */}
        {activeTab === 'password' && (
          <form
            onSubmit={handlePasswordUpdate}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm shadow-lg mb-8"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Current Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-500" />
                  </div>
                  <input
                    type="password"
                    value={updatePassword.oldPassword}
                    onChange={(e) =>
                      handlePasswordChange('oldPassword', e.target.value)
                    }
                    className="pl-10 w-full bg-gray-700/50 border border-gray-600/50 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/30 transition-colors"
                    placeholder="Enter current password"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-500" />
                  </div>
                  <input
                    type="password"
                    value={updatePassword.password}
                    onChange={(e) =>
                      handlePasswordChange('password', e.target.value)
                    }
                    className="pl-10 w-full bg-gray-700/50 border border-gray-600/50 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/30 transition-colors"
                    placeholder="Enter new password"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-500" />
                  </div>
                  <input
                    type="password"
                    value={updatePassword.passwordConfirm}
                    onChange={(e) =>
                      handlePasswordChange('passwordConfirm', e.target.value)
                    }
                    className="pl-10 w-full bg-gray-700/50 border border-gray-600/50 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/30 transition-colors"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-sky-500 to-emerald-500 text-white py-3 px-6 rounded-lg font-medium hover:from-sky-600 hover:to-emerald-600 transition-all flex items-center justify-center shadow-md hover:shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoadingSpinner size="small" />
                ) : (
                  <>
                    <FiKey className="mr-2" />
                    Update Password
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Delete Account Section */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm shadow-lg">
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <FiTrash2 className="mr-2 text-rose-500" />
              Dangerous Zone
            </h3>
            {!showDeleteConfirm ? (
              <>
                <p className="text-gray-300 text-center mb-4">
                  Once you delete your account, there is no going back. Please
                  be certain.
                </p>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium transition-colors flex items-center"
                >
                  <FiTrash2 className="mr-2" />
                  Delete Account
                </button>
              </>
            ) : (
              <>
                <p className="text-gray-300 text-center mb-4 font-medium">
                  Are you sure you want to delete your account?
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={handleDeleteAccount}
                    className="px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium transition-colors flex items-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <LoadingSpinner size="small" />
                    ) : (
                      <>
                        <FiTrash2 className="mr-2" />
                        Yes, Delete
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {isLoading && <LoadingSpinner fullPage />}
    </div>
  );
};

export default UserProfile;
