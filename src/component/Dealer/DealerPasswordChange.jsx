import React from 'react';

const DealerPasswordChange = ({ 
  passwordData, 
  handlePasswordChange, 
  handlePasswordSubmit 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Change Password</h2>
      <form onSubmit={handlePasswordSubmit} className="space-y-4">
        <div>
          <input
            type="password"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            placeholder="Current Password*"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
          />
        </div>
        <div>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            placeholder="New Password*"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
          />
        </div>
        <div>
          <input
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            placeholder="Confirm New Password*"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
          />
        </div>
        <button 
          type="submit" 
          className="w-full sm:w-auto px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200 font-medium"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default DealerPasswordChange;