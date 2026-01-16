import React from 'react';

const LeadViewModal = ({ lead, onClose, onEdit, onDelete }) => {
  if (!lead) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Lead Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium text-gray-900">{lead.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{lead.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Mobile</p>
                <p className="font-medium text-gray-900">{lead.contact}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Alternate Mobile</p>
                <p className="font-medium text-gray-900">{lead.alternateMobile || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium text-gray-900">{lead.dob || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium text-gray-900">{lead.gender || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Address Information */}
          {(lead.address1 || lead.city || lead.state) && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Address</h3>
              <div className="grid grid-cols-2 gap-4">
                {lead.address1 && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Address 1</p>
                    <p className="font-medium text-gray-900">{lead.address1}</p>
                  </div>
                )}
                {lead.address2 && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Address 2</p>
                    <p className="font-medium text-gray-900">{lead.address2}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">City</p>
                  <p className="font-medium text-gray-900">{lead.city || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">State</p>
                  <p className="font-medium text-gray-900">{lead.state || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pincode</p>
                  <p className="font-medium text-gray-900">{lead.pincode || 'N/A'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Lead Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Lead Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                  lead.status === 'New' ? 'bg-yellow-100 text-yellow-800' :
                  lead.status === 'Contacted' ? 'bg-blue-100 text-blue-800' :
                  lead.status === 'Hot' ? 'bg-red-100 text-red-800' :
                  lead.status === 'Warm' ? 'bg-orange-100 text-orange-800' :
                  lead.status === 'Cold' ? 'bg-gray-100 text-gray-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {lead.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Source</p>
                <p className="font-medium text-gray-900">{lead.source || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Product Type</p>
                <p className="font-medium text-gray-900">{lead.productType || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date Created</p>
                <p className="font-medium text-gray-900">{new Date(lead.date).toLocaleDateString()}</p>
              </div>
              {lead.followUpDate && (
                <div>
                  <p className="text-sm text-gray-500">Follow Up Date</p>
                  <p className="font-medium text-gray-900">{lead.followUpDate}</p>
                </div>
              )}
              {lead.followUpTime && (
                <div>
                  <p className="text-sm text-gray-500">Follow Up Time</p>
                  <p className="font-medium text-gray-900">{lead.followUpTime}</p>
                </div>
              )}
            </div>
          </div>

          {/* Property & Message */}
          {lead.property && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Property Interest</h3>
              <p className="text-gray-900">{lead.property}</p>
            </div>
          )}

          {lead.message && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Message</h3>
              <p className="text-gray-900">{lead.message}</p>
            </div>
          )}

          {lead.description && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Description</h3>
              <p className="text-gray-900">{lead.description}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              onClick={() => {
                onClose();
                onEdit(lead);
              }}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Edit Lead
            </button>
            <button
              onClick={() => {
                onClose();
                onDelete(lead.id);
              }}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Delete Lead
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadViewModal;
