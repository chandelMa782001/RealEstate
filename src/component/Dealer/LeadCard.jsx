import React from 'react';

const LeadCard = ({ lead, onView, onEdit, onDelete }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition duration-200">
      {/* Lead Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center flex-1 min-w-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
            <span className="text-orange-600 font-semibold text-base sm:text-lg">
              {lead.name.charAt(0)}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{lead.name}</h3>
            <span className={`inline-flex px-2 py-0.5 sm:py-1 text-xs font-medium rounded-full ${
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
        </div>
        <div className="text-xs text-gray-500 ml-2 flex-shrink-0">
          {new Date(lead.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-1.5 sm:space-y-2 mb-3">
        <div className="flex items-center text-xs sm:text-sm text-gray-600">
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
          </svg>
          <span className="truncate">{lead.email}</span>
        </div>
        <div className="flex items-center text-xs sm:text-sm text-gray-600">
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
          </svg>
          <span className="truncate">{lead.contact}</span>
        </div>
      </div>

      {/* Property Interest */}
      {lead.property && (
        <div className="mb-2 sm:mb-3">
          <p className="text-xs text-gray-500 mb-1">Property Interest:</p>
          <p className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-1">{lead.property}</p>
        </div>
      )}

      {/* Message */}
      {lead.message && (
        <div className="mb-3 sm:mb-4">
          <p className="text-xs text-gray-500 mb-1">Message:</p>
          <p className="text-xs sm:text-sm text-gray-700 line-clamp-2">{lead.message}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-2 sm:pt-3 border-t border-gray-100">
        <div className="flex space-x-1.5 sm:space-x-2">
          <button 
            onClick={() => onView(lead)}
            className="flex items-center px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition duration-200"
            title="View Details"
          >
            <svg className="w-3 h-3 sm:mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
            </svg>
            <span className="hidden sm:inline">View</span>
          </button>
          <button 
            onClick={() => onEdit(lead)}
            className="flex items-center px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition duration-200"
            title="Edit"
          >
            <svg className="w-3 h-3 sm:mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
            </svg>
            <span className="hidden sm:inline">Edit</span>
          </button>
        </div>
        <button 
          onClick={() => onDelete(lead.id)}
          className="flex items-center px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition duration-200"
          title="Delete"
        >
          <svg className="w-3 h-3 sm:mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
          <span className="hidden sm:inline">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default LeadCard;
