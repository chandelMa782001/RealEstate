import React from 'react';

const LeadForm = ({ formData, editingLead, users, onFormChange, onSubmit, onReset }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-indigo-700 mb-4">
        {editingLead ? 'Edit Lead' : 'Create New Lead'}
      </h3>
      
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => onFormChange('name', e.target.value)}
              placeholder="Enter full name"
              className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Mobile Number *</label>
            <input
              type="tel"
              value={formData.mobile}
              onChange={(e) => onFormChange('mobile', e.target.value)}
              placeholder="9900112233"
              className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Alternate Mobile Number</label>
            <input
              type="tel"
              value={formData.alternateMobile}
              onChange={(e) => onFormChange('alternateMobile', e.target.value)}
              placeholder="9900112233"
              className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => onFormChange('email', e.target.value)}
              placeholder="abc@gmail.com"
              className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Date of Birth</label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => onFormChange('dob', e.target.value)}
                className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => onFormChange('gender', e.target.value)}
                className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900 bg-white"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-sm font-medium text-gray-500">Address Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Address 1</label>
            <input
              type="text"
              value={formData.address1}
              onChange={(e) => onFormChange('address1', e.target.value)}
              placeholder="Enter Address 1"
              className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Address 2</label>
            <input
              type="text"
              value={formData.address2}
              onChange={(e) => onFormChange('address2', e.target.value)}
              placeholder="Enter Address 2"
              className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => onFormChange('city', e.target.value)}
                placeholder="Enter City"
                className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">State</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => onFormChange('state', e.target.value)}
                placeholder="Enter State"
                className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Pincode</label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => onFormChange('pincode', e.target.value)}
                placeholder="Enter Pincode"
                className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Lead Information */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-sm font-medium text-gray-500">Lead Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Status *</label>
            <select
              value={formData.status}
              onChange={(e) => onFormChange('status', e.target.value)}
              className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900 bg-white"
              required
            >
              <option value="">Select Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Hot">Hot</option>
              <option value="Warm">Warm</option>
              <option value="Cold">Cold</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Source</label>
            <select
              value={formData.source}
              onChange={(e) => onFormChange('source', e.target.value)}
              className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900 bg-white"
            >
              <option value="">Select Source</option>
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Social Media">Social Media</option>
              <option value="Advertisement">Advertisement</option>
              <option value="Walk-in">Walk-in</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Product Type</label>
            <select
              value={formData.productType}
              onChange={(e) => onFormChange('productType', e.target.value)}
              className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900 bg-white"
            >
              <option value="">Select Product Type</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Plot">Plot</option>
              <option value="Commercial">Commercial</option>
              <option value="Office">Office Space</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Property Interest</label>
            <input
              type="text"
              value={formData.property}
              onChange={(e) => onFormChange('property', e.target.value)}
              placeholder="Enter property details"
              className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Follow up Date</label>
              <input
                type="date"
                value={formData.followUpDate}
                onChange={(e) => onFormChange('followUpDate', e.target.value)}
                className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Follow up Time</label>
              <input
                type="time"
                value={formData.followUpTime}
                onChange={(e) => onFormChange('followUpTime', e.target.value)}
                className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Assign To</label>
            <select
              value={formData.assignTo}
              onChange={(e) => onFormChange('assignTo', e.target.value)}
              className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none text-gray-900 bg-white"
            >
              <option value="">Select User</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Lead Description */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-sm font-medium text-gray-500">Lead Description</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Message/Notes</label>
            <textarea
              value={formData.message}
              onChange={(e) => onFormChange('message', e.target.value)}
              placeholder="Enter lead message or notes"
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-gray-900 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => onFormChange('description', e.target.value)}
              placeholder="Please Enter Description"
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-gray-900 resize-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
          <button
            type="submit"
            className="flex-1 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold text-lg rounded-lg transition-colors"
          >
            {editingLead ? 'Update Lead' : 'Save Lead'}
          </button>
          <button
            type="button"
            onClick={onReset}
            className="flex-1 px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-bold text-lg rounded-lg transition-colors"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
