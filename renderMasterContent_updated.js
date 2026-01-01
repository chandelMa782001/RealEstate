const renderMasterContent = () => {
  switch(selectedMasterOption) {
    case 'role':
      return (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Manage Role</h3>
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200">
                Add New Role
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200">
                Export Roles
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">Role Name</th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">Description</th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">Users Count</th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 text-sm text-gray-900 font-medium">Super Admin</td>
                  <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">Full system access and control</td>
                  <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">2</td>
                  <td className="border border-gray-200 px-4 py-3">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Active</span>
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                      <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                    </div>
                  </td>
                </tr> 
               <tr className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 text-sm text-gray-900 font-medium">Property Manager</td>
                  <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">Manage properties and listings</td>
                  <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">8</td>
                  <td className="border border-gray-200 px-4 py-3">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Active</span>
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                      <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 text-sm text-gray-900 font-medium">Sales Agent</td>
                  <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">Handle leads and customer interactions</td>
                  <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">15</td>
                  <td className="border border-gray-200 px-4 py-3">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Active</span>
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                      <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 text-sm text-gray-900 font-medium">Viewer</td>
                  <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">Read-only access to system data</td>
                  <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">5</td>
                  <td className="border border-gray-200 px-4 py-3">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Inactive</span>
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                      <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );    case 's
tatus':
      return (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Manage Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-800">Property Status</h4>
              <div className="space-y-3">
                {[
                  { name: 'Available', count: 45, color: 'green' },
                  { name: 'Sold', count: 23, color: 'blue' },
                  { name: 'Under Review', count: 8, color: 'yellow' },
                  { name: 'Suspended', count: 3, color: 'red' }
                ].map((status, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 bg-${status.color}-500`}></div>
                      <span className="text-sm font-medium text-gray-700">{status.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">{status.count} properties</span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-800">Lead Status</h4>
              <div className="space-y-3">
                {[
                  { name: 'New', count: 12, color: 'blue' },
                  { name: 'Contacted', count: 8, color: 'yellow' },
                  { name: 'Qualified', count: 5, color: 'green' },
                  { name: 'Closed', count: 15, color: 'purple' }
                ].map((status, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 bg-${status.color}-500`}></div>
                      <span className="text-sm font-medium text-gray-700">{status.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">{status.count} leads</span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200">
              Add New Status
            </button>
          </div>
        </div>
      );    c
ase 'product':
      return (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Manage Product</h3>
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200">
                Add New Product
              </button>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                <option>All Categories</option>
                <option>Residential</option>
                <option>Commercial</option>
                <option>Industrial</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Luxury Apartments', category: 'Residential', price: '₹45L - ₹1.2Cr', units: 24, status: 'Active' },
              { name: 'Commercial Spaces', category: 'Commercial', price: '₹80L - ₹2.5Cr', units: 12, status: 'Active' },
              { name: 'Villa Projects', category: 'Residential', price: '₹1.5Cr - ₹5Cr', units: 8, status: 'Active' },
              { name: 'Office Complexes', category: 'Commercial', price: '₹2Cr - ₹10Cr', units: 5, status: 'Inactive' },
              { name: 'Industrial Plots', category: 'Industrial', price: '₹50L - ₹3Cr', units: 15, status: 'Active' },
              { name: 'Retail Shops', category: 'Commercial', price: '₹25L - ₹80L', units: 32, status: 'Active' }
            ].map((product, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-sm font-semibold text-gray-800">{product.name}</h4>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.status}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium">Category:</span> {product.category}</p>
                  <p><span className="font-medium">Price Range:</span> {product.price}</p>
                  <p><span className="font-medium">Available Units:</span> {product.units}</p>
                </div>
                <div className="mt-4 flex justify-between">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                  <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );    
case 'source':
      return (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Manage Source</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-800">Lead Sources</h4>
              <div className="space-y-3">
                {[
                  { name: 'Website', leads: 45, conversion: '12%', status: 'Active' },
                  { name: 'Facebook Ads', leads: 32, conversion: '8%', status: 'Active' },
                  { name: 'Google Ads', leads: 28, conversion: '15%', status: 'Active' },
                  { name: 'Referrals', leads: 18, conversion: '25%', status: 'Active' },
                  { name: 'Cold Calling', leads: 12, conversion: '5%', status: 'Inactive' }
                ].map((source, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium text-gray-800">{source.name}</h5>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        source.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {source.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Leads:</span> {source.leads}
                      </div>
                      <div>
                        <span className="font-medium">Conversion:</span> {source.conversion}
                      </div>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                      <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-800">Data Integration</h4>
              <div className="space-y-3">
                {[
                  { name: 'CRM Integration', type: 'API', status: 'Connected', lastSync: '2 hours ago' },
                  { name: 'Email Marketing', type: 'Webhook', status: 'Connected', lastSync: '1 day ago' },
                  { name: 'Analytics Platform', type: 'API', status: 'Disconnected', lastSync: '5 days ago' },
                  { name: 'Social Media', type: 'OAuth', status: 'Connected', lastSync: '30 minutes ago' }
                ].map((integration, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium text-gray-800">{integration.name}</h5>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        integration.status === 'Connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {integration.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p><span className="font-medium">Type:</span> {integration.type}</p>
                      <p><span className="font-medium">Last Sync:</span> {integration.lastSync}</p>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Configure</button>
                      <button className="text-green-600 hover:text-green-800 text-sm">Test</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200">
              Add Integration
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200">
              Add Source
            </button>
          </div>
        </div>
      );    cas
e 'users':
      return (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Manage Users</h3>
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200">
                Add New User
              </button>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                <option>All Roles</option>
                <option>Super Admin</option>
                <option>Property Manager</option>
                <option>Sales Agent</option>
              </select>
              <input 
                type="text" 
                placeholder="Search users..." 
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">User</th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">Role</th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">Last Login</th>
                  <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'John Smith', email: 'john@example.com', role: 'Super Admin', status: 'Active', lastLogin: '2 hours ago' },
                  { name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Property Manager', status: 'Active', lastLogin: '1 day ago' },
                  { name: 'Mike Wilson', email: 'mike@example.com', role: 'Sales Agent', status: 'Active', lastLogin: '3 hours ago' },
                  { name: 'Emily Davis', email: 'emily@example.com', role: 'Sales Agent', status: 'Inactive', lastLogin: '1 week ago' },
                  { name: 'Robert Brown', email: 'robert@example.com', role: 'Property Manager', status: 'Active', lastLogin: '5 hours ago' }
                ].map((user, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-orange-600 font-semibold text-sm">{user.name.charAt(0)}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">{user.email}</td>
                    <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">{user.role}</td>
                    <td className="border border-gray-200 px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">{user.lastLogin}</td>
                    <td className="border border-gray-200 px-4 py-3">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                        <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );    case
 'permission':
      return (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Manage Permission</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-800">Role Permissions</h4>
              <div className="space-y-4">
                {[
                  { role: 'Super Admin', permissions: ['All Access'] },
                  { role: 'Property Manager', permissions: ['Properties', 'Leads', 'Reports'] },
                  { role: 'Sales Agent', permissions: ['Leads', 'Customers', 'Basic Reports'] },
                  { role: 'Viewer', permissions: ['View Only'] }
                ].map((rolePermission, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <h5 className="font-medium text-gray-800 mb-2">{rolePermission.role}</h5>
                    <div className="flex flex-wrap gap-2">
                      {rolePermission.permissions.map((permission, permIndex) => (
                        <span key={permIndex} className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {permission}
                        </span>
                      ))}
                    </div>
                    <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm">Edit Permissions</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-800">System Permissions</h4>
              <div className="space-y-3">
                {[
                  { module: 'User Management', permissions: ['Create', 'Read', 'Update', 'Delete'] },
                  { module: 'Property Management', permissions: ['Create', 'Read', 'Update', 'Delete'] },
                  { module: 'Lead Management', permissions: ['Create', 'Read', 'Update', 'Delete'] },
                  { module: 'Reports & Analytics', permissions: ['Read', 'Export'] },
                  { module: 'System Settings', permissions: ['Read', 'Update'] }
                ].map((module, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg">
                    <h6 className="font-medium text-gray-800 mb-2">{module.module}</h6>
                    <div className="grid grid-cols-2 gap-2">
                      {module.permissions.map((permission, permIndex) => (
                        <label key={permIndex} className="flex items-center text-sm">
                          <input type="checkbox" className="mr-2 text-orange-500" defaultChecked />
                          <span className="text-gray-600">{permission}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200">
              Reset to Default
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200">
              Save Changes
            </button>
          </div>
        </div>
      );
    default:
      return null;
  }
};