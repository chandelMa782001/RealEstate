# Post Property API Integration

## Overview
The Post Property feature has been integrated with the backend API in a 4-step process.

## API Endpoints

### Step 1: User Details
**Endpoint:** `POST /api/properties/user-details`

**Payload:**
```json
{
  "fullName": "Kajal Mehra",
  "mobile": "1234565432",
  "email": "kajal123@gmail.com",
  "userType": "OWNER"
}
```

**Response:**
```json
{
  "message": "User details saved successfully",
  "propertyId": 6
}
```

### Step 2: Basic Information
**Endpoint:** `POST /api/properties/basic-info/{propertyId}`

**Payload:**
```json
{
  "propertyType": "RESIDENTIAL",
  "propertyCategory": "APARTMENT",
  "rentalOption": "BUY",
  "bedrooms": "BHK_2",
  "price": 5000000,
  "areaSqft": 1200,
  "description": "Near metro station",
  "hasGoldOffer": true,
  "goldWeight": 20,
  "goldPurity": "K24",
  "estimatedGoldValue": 120000,
  "goldItemDesc": "Gold necklace included"
}
```

### Step 3: Upload Images
**Endpoint:** `POST /api/properties/{propertyId}/images`

**Content-Type:** `multipart/form-data`

**Form Fields:**
- `EXTERIOR` - Multiple files
- `INTERIOR` - Multiple files
- `FLOOR_PLAN` - Multiple files
- `MASTER_PLAN` - Multiple files
- `LOCATION_MAP` - Multiple files

### Step 4: Location Details
**Endpoint:** `POST /api/properties/{propertyId}/location`

**Payload:**
```json
{
  "address": "Sector 19, Omaxe city",
  "city": "Sonipat",
  "state": "Haryana",
  "pincode": "131312"
}
```

## Implementation Details

### Files Created/Modified

1. **src/apiServcies/propertyApi.js** (New)
   - Contains all API functions for property posting
   - Handles FormData for image uploads
   - Proper error handling

2. **src/pages/PostProperty.jsx** (Modified)
   - Added loading states
   - Integrated API calls in handleNext and handleSubmit
   - Added toast notifications using react-hot-toast
   - Added navigation after successful submission

### Key Features

- **Progressive Saving:** Each step saves data immediately
- **Property ID Tracking:** First step returns propertyId used in subsequent steps
- **Loading States:** Buttons show loading text and are disabled during API calls
- **Error Handling:** Toast notifications for success/error messages
- **Image Upload:** Handles multiple images per category using FormData
- **Auto Navigation:** Redirects to properties page after successful submission

### User Flow

1. User fills Step 1 (User Details) → Click Next → API call saves data and returns propertyId
2. User fills Step 2 (Basic Info) → Click Next → API call saves property details
3. User uploads images in Step 3 → Click Next → Moves to Step 4 (images uploaded on final submit)
4. User fills Step 4 (Location) → Click Submit → Uploads images + saves location → Redirects to properties page

### Gold Offer Integration

The gold offer feature is properly mapped:
- `hasGoldOffer` - Boolean flag
- `goldWeight` - Calculated from gold amount (approximate conversion)
- `goldPurity` - Set to 'K24' when gold offer is enabled
- `estimatedGoldValue` - The gold amount entered by user
- `goldItemDesc` - Description of gold items

## Testing

To test the integration:
1. Fill all required fields in each step
2. Check browser console for API responses
3. Verify toast notifications appear
4. Check that propertyId is maintained across steps
5. Verify images are uploaded correctly
6. Confirm redirect to /properties after submission
