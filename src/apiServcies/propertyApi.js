import api from './axios';

// Step 1: Save user details
export const saveUserDetails = async (userData) => {
  try {
    const response = await api.post('/properties/user-details', userData);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error saving user details:', error);
    throw error;
  }
};

// Step 2: Save basic property information
export const saveBasicInfo = async (propertyId, basicInfo) => {
  try {
    // Try the documented endpoint first
    let response;
    try {
      response = await api.put(`/properties/basic-info/${propertyId}`, basicInfo);
    } catch (error) {
      if (error.response?.status === 404) {
        // If 404, try alternative endpoint structures
        console.log('🔄 Trying alternative endpoint: /properties/${propertyId}/basic-info');
        try {
          response = await api.post(`/properties/${propertyId}/basic-info`, basicInfo);
        } catch (altError) {
          console.log('🔄 Trying another alternative: /properties/${propertyId}');
          response = await api.put(`/properties/${propertyId}`, basicInfo);
        }
      } else {
        throw error;
      }
    }
    
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error saving basic info:', error);
    throw error;
  }
};

// Step 3: Upload property images
export const uploadPropertyImages = async (propertyId, images) => {
  try {
    const formData = new FormData();
    
    // Append images for each category
    if (images.exterior?.length > 0) {
      images.exterior.forEach(file => {
        formData.append('EXTERIOR', file);
      });
    }
    
    if (images.interior?.length > 0) {
      images.interior.forEach(file => {
        formData.append('INTERIOR', file);
      });
    }
    
    if (images.floorPlan?.length > 0) {
      images.floorPlan.forEach(file => {
        formData.append('FLOOR_PLAN', file);
      });
    }
    
    if (images.masterPlan?.length > 0) {
      images.masterPlan.forEach(file => {
        formData.append('MASTER_PLAN', file);
      });
    }
    
    if (images.locationMap?.length > 0) {
      images.locationMap.forEach(file => {
        formData.append('LOCATION_MAP', file);
      });
    }

    const response = await api.post(`/properties/${propertyId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
};

// Step 4: Save location details
export const saveLocationDetails = async (propertyId, locationData) => {
  try {
    const response = await api.post(`/properties/${propertyId}/location`, locationData);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error saving location details:', error);
    throw error;
  }
};
