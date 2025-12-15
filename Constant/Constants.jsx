import { images } from "../utils/Image";
export   const propertiess = [
    {
      id: 1,
      title: 'Luxury Villa in Gurgaon',
      location: 'Sector 47, Gurgaon',
      price: '₹2.5 Cr',
      type: 'Villa',
      beds: 4,
      baths: 3,
      area: '3500 sq.ft',
      // image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600'
      image:images.house_1
    },
    {
      id: 2,
      title: 'Modern Apartment',
      location: 'Dwarka, New Delhi',
      price: '₹85 Lac',
      type: 'Apartment',
      beds: 3,
      baths: 2,
      area: '1800 sq.ft',
      // image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600'
         image:images.house_2

    },
    {
      id: 3,
      title: 'Commercial Space',
      location: 'Connaught Place, Delhi',
      price: '₹5 Cr',
      type: 'Commercial',
      beds: null,
      baths: 2,
      area: '2500 sq.ft',
      // image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'
      image:images.house_3
    },
    {
      id: 4,
      title: 'Residential Plot',
      location: 'Kundli, Sonipat',
      price: '₹45 Lac',
      type: 'Plot',
      beds: null,
      baths: null,
      area: '200 sq.yd',
      image:images.house_4
      // image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600'
    },
    {
      id: 5,
      title: 'Premium Penthouse',
      location: 'Vasant Kunj, Delhi',
      price: '₹3.8 Cr',
      type: 'Penthouse',
      beds: 5,
      baths: 4,
      area: '4200 sq.ft',
      // image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600'
      image:images.house_5
    },
    {
      id: 6,
      title: 'Studio Apartment',
      location: 'Noida Sector 62',
      price: '₹42 Lac',
      type: 'Apartment',
      beds: 1,
      baths: 1,
      area: '650 sq.ft',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600'
    },
    {
      id: 7,
      title: 'Office Space',
      location: 'Cyber City, Gurgaon',
      price: '₹8 Cr',
      type: 'Commercial',
      beds: null,
      baths: 3,
      area: '3800 sq.ft',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600'
    },
    {
      id: 8,
      title: 'Farmhouse Plot',
      location: 'Manesar, Haryana',
      price: '₹1.2 Cr',
      type: 'Plot',
      beds: null,
      baths: null,
      area: '500 sq.yd',
      image: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=600'
    }
  ];

  
  export  const builders = [
      {
        id: 1,
        name: 'Raghav Kumar',
        location: 'Gurgaon, Haryana',
        experience: '10+ Years',
        projects: 50,
        rating: 4.5,
        specialization: 'Residential & Commercial',
        phone: '+91 9354527118',
        email: 'raghav.kumar@realestate.com',
      
        image:images.builder_1,
        description: 'Experienced real estate dealer with over 10 years of expertise in delivering quality residential and commercial projects.',
        completedProjects: ['Luxury Villas', 'Modern Apartments', 'Commercial Spaces']
      },
      {
        id: 2,
        name: 'Priya Sharma',
        location: 'New Delhi, Delhi',
        experience: '15+ Years',
        projects: 80,
        rating: 4.8,
        specialization: 'Luxury Residential',
        phone: '+91 124 4567890',
        email: 'priya.sharma@properties.com',
      
        image:images.builder_2,
        description: 'Trusted property dealer specializing in luxury residential properties across Delhi NCR.',
        completedProjects: ['Premium Apartments', 'Luxury Penthouses', 'Villa Projects']
      },
      {
        id: 3,
        name: 'Amit Verma',
        location: 'Noida, Uttar Pradesh',
        experience: '12+ Years',
        projects: 65,
        rating: 4.6,
        specialization: 'Sustainable Housing',
        phone: '+91 120 4567890',
        email: 'amit.verma@builders.com',
      
        image:images.builder_3,
        description: 'Committed to delivering innovative and sustainable real estate solutions with a focus on eco-friendly projects.',
        completedProjects: ['Green Apartments', 'Eco Villas', 'Smart Homes']
      },
      {
        id: 4,
        name: 'Neha Gupta',
        location: 'Gurgaon, Haryana',
        experience: '8+ Years',
        projects: 45,
        rating: 4.7,
        specialization: 'Affordable & Premium',
        phone: '+91 124 7890123',
        email: 'neha.gupta@realty.com',
  
        image:images.builder_4,
        description: 'Building trust through quality properties, specializing in both affordable and premium segments.',
        completedProjects: ['Budget Apartments', 'Premium Flats', 'Residential Plots']
      },
      {
        id: 5,
        name: 'Vikram Singh',
        location: 'Dwarka, New Delhi',
        experience: '20+ Years',
        projects: 120,
        rating: 4.5,
        specialization: 'Premium Residential',
        phone: '+91 11 4567890',
        email: 'vikram.singh@estates.com',
  
        image:images.builder_5,
        description: 'Renowned for uncompromising quality and customer satisfaction in premium residential projects.',
        completedProjects: ['Luxury Towers', 'Premium Societies', 'High-Rise Apartments']
      },
      {
        id: 6,
        name: 'Anjali Mehta',
        location: 'Noida, Uttar Pradesh',
        experience: '14+ Years',
        projects: 70,
        rating: 4.6,
        specialization: 'Mixed-Use Development',
        phone: '+91 120 9876543',
        email: 'anjali.mehta@properties.com',
  
        image:images.builder_6,
        description: 'Creating landmark projects across residential, commercial, and retail segments with expertise.',
        completedProjects: ['Mixed-Use Complexes', 'Shopping Centers', 'Residential Towers']
      },
      {
        id: 7,
        name: 'Rohit Malhotra',
        location: 'Gurgaon, Haryana',
        experience: '18+ Years',
        projects: 95,
        rating: 4.4,
        specialization: 'Integrated Townships',
        phone: '+91 124 3456789',
        email: 'rohit.malhotra@builders.com',
    
        image:images.builder_7,
        description: 'Pioneer in creating integrated lifestyle communities with modern amenities and facilities.',
        completedProjects: ['Township Projects', 'Gated Communities', 'Residential Complexes']
      },
      {
        id: 8,
        name: 'Kavita Reddy',
        location: 'New Delhi, Delhi',
        experience: '16+ Years',
        projects: 85,
        rating: 4.7,
        specialization: 'Luxury & Ultra-Luxury',
        phone: '+91 11 8765432',
        email: 'kavita.reddy@luxury.com',
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600',
        description: 'Premier real estate dealer known for luxury and ultra-luxury property projects across Delhi NCR.',
        completedProjects: ['Ultra-Luxury Villas', 'Premium Penthouses', 'Luxury Apartments']
      }
    ];
 export   const offerProperties = [
    {
      id: 1,
      title: 'Luxury Villa in Gurgaon',
      location: 'Sector 47, Gurgaon',
      originalPrice: '₹3.0 Cr',
      offerPrice: '₹2.5 Cr',
      discount: '17%',
      type: 'Villa',
      beds: 4,
      baths: 3,
      area: '3500 sq.ft',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600',
      status: 'Ready to Move',
      offerType: 'Limited Time',
      offerEndDate: '2024-12-31',
      offerDescription: 'Year-end special offer! Save ₹50 Lacs on this premium villa.',
      badge: 'HOT DEAL'
    },
    {
      id: 2,
      title: 'Modern Apartment',
      location: 'Dwarka, New Delhi',
      originalPrice: '₹1.0 Cr',
      offerPrice: '₹85 Lac',
      discount: '15%',
      type: 'Apartment',
      beds: 3,
      baths: 2,
      area: '1800 sq.ft',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600',
      status: 'Ready to Move',
      offerType: 'Festival Offer',
      offerEndDate: '2024-12-25',
      offerDescription: 'Festival special pricing with free registration and stamp duty.',
      badge: 'FESTIVAL SPECIAL'
    },
    {
      id: 5,
      title: 'Premium Penthouse',
      location: 'Vasant Kunj, Delhi',
      originalPrice: '₹4.5 Cr',
      offerPrice: '₹3.8 Cr',
      discount: '16%',
      type: 'Penthouse',
      beds: 5,
      baths: 4,
      area: '4200 sq.ft',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600',
      status: 'Under Construction',
      offerType: 'Pre-Launch',
      offerEndDate: '2025-01-15',
      offerDescription: 'Pre-launch offer with flexible payment plans and guaranteed returns.',
      badge: 'PRE-LAUNCH'
    },
    {
      id: 6,
      title: 'Studio Apartment',
      location: 'Noida Sector 62',
      originalPrice: '₹50 Lac',
      offerPrice: '₹42 Lac',
      discount: '16%',
      type: 'Apartment',
      beds: 1,
      baths: 1,
      area: '650 sq.ft',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600',
      status: 'Ready to Move',
      offerType: 'First Time Buyer',
      offerEndDate: '2024-12-30',
      offerDescription: 'Special offer for first-time home buyers with easy EMI options.',
      badge: 'FIRST BUYER'
    },
    {
      id: 7,
      title: 'Office Space',
      location: 'Cyber City, Gurgaon',
      originalPrice: '₹10 Cr',
      offerPrice: '₹8 Cr',
      discount: '20%',
      type: 'Commercial',
      beds: null,
      baths: 3,
      area: '3800 sq.ft',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600',
      status: 'Ready to Move',
      offerType: 'Business Special',
      offerEndDate: '2025-01-31',
      offerDescription: 'Corporate discount for bulk bookings and immediate possession.',
      badge: 'CORPORATE DEAL'
    },
    {
      id: 9,
      title: 'Luxury Penthouse in South Delhi',
      location: 'Greater Kailash, New Delhi',
      originalPrice: '₹5.2 Cr',
      offerPrice: '₹4.5 Cr',
      discount: '13%',
      type: 'Penthouse',
      beds: 4,
      baths: 4,
      area: '3800 sq.ft',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600',
      status: 'Ready to Move',
      offerType: 'Luxury Deal',
      offerEndDate: '2025-02-14',
      offerDescription: 'Valentine special on luxury penthouse with premium amenities.',
      badge: 'LUXURY DEAL'
    }
  ];

  export  const allProperties = [
      {
        id: 1,
        title: 'Luxury Villa in Gurgaon',
        location: 'Sector 47, Gurgaon',
        price: '₹2.5 Cr',
        priceValue: 25000000,
        type: 'Villa',
        beds: 4,
        baths: 3,
        area: '3500 sq.ft',
        image: images.house_1,
        verified: true,
        highlights: ['North-East Facing', 'Gated Society', 'Ready To Move'],
        status: 'Ready To Move'
      },
      {
        id: 2,
        title: 'Modern Apartment',
        location: 'Dwarka, New Delhi',
        price: '₹85 Lac',
        priceValue: 8500000,
        type: 'Apartment',
        beds: 3,
        baths: 2,
        area: '1800 sq.ft',
        image: images.house_2,
        verified: true,
        highlights: ['North Facing', 'Metro Connectivity', 'Ready To Move'],
        status: 'Ready To Move'
      },
      {
        id: 3,
        title: 'Commercial Space',
        location: 'Connaught Place, Delhi',
        price: '₹5 Cr',
        priceValue: 50000000,
        type: 'Commercial',
        beds: null,
        baths: 2,
        area: '2500 sq.ft',
        image: images.house_3,
        verified: false,
        highlights: ['Prime Location', 'High Footfall', 'Parking Available'],
        status: 'Ready To Move'
      },
      {
        id: 4,
        title: 'Residential Plot',
        location: 'Kundli, Sonipat',
        price: '₹45 Lac',
        priceValue: 4500000,
        type: 'Plot',
        beds: null,
        baths: null,
        area: '200 sq.yd',
        image: images.house_4,
        verified: true,
        highlights: ['Corner Plot', 'Clear Title', 'Development Ready'],
        status: 'Ready To Move'
      },
      {
        id: 5,
        title: 'Premium Penthouse',
        location: 'Vasant Kunj, Delhi',
        price: '₹3.8 Cr',
        priceValue: 38000000,
        type: 'Penthouse',
        beds: 5,
        baths: 4,
        area: '4200 sq.ft',
        image: images.house_5,
        verified: true,
        highlights: ['Terrace Garden', 'Premium Location', 'Luxury Amenities'],
        status: 'Ready To Move'
      },
      {
        id: 6,
        title: 'Studio Apartment',
        location: 'Noida Sector 62',
        price: '₹42 Lac',
        priceValue: 4200000,
        type: 'Apartment',
        beds: 1,
        baths: 1,
        area: '650 sq.ft',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600',
        verified: false,
        highlights: ['IT Hub Location', 'Metro Nearby', 'Investment Ready'],
        status: 'Under Construction'
      },
      {
        id: 7,
        title: 'Office Space',
        location: 'Cyber City, Gurgaon',
        price: '₹8 Cr',
        priceValue: 80000000,
        type: 'Commercial',
        beds: null,
        baths: 3,
        area: '3800 sq.ft',
        image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600',
        verified: true,
        highlights: ['IT Hub', 'Modern Amenities', 'Parking Available'],
        status: 'Ready To Move'
      },
      {
        id: 8,
        title: 'Farmhouse Plot',
        location: 'Manesar, Haryana',
        price: '₹1.2 Cr',
        priceValue: 12000000,
        type: 'Plot',
        beds: null,
        baths: null,
        area: '500 sq.yd',
        image: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=600',
        verified: true,
        highlights: ['Peaceful Location', 'Investment Opportunity', 'Clear Title'],
        status: 'Ready To Move'
      }
    ];
  export   const properties = {
        1: {
          title: 'Luxury Villa in Gurgaon',
          location: 'Sector 47, Gurgaon',
          coordinates: { lat: 28.4211, lng: 77.0797 }, 
          price: '₹2.5 Cr',
          type: 'Villa',
          beds: 4,
          baths: 3,
          area: '3500 sq.ft',
          images: [
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200'
          ],
          description: 'Experience luxury living in this stunning villa located in the heart of Gurgaon. This property features modern architecture, spacious rooms, and premium finishes throughout.',
          features: ['Swimming Pool', 'Garden', 'Parking for 3 cars', 'Modular Kitchen', 'Gym', 'Security System'],
          amenities: ['24/7 Security', 'Power Backup', 'Water Supply', 'Club House', 'Children Play Area'],
          propertyId: 'MG001',
          status: 'Ready to Move',
          facing: 'North',
          furnished: 'Semi-Furnished',
          floor: 'Ground Floor',
          totalFloors: '2',
          age: 'Under Construction',
          parking: '3 Covered',
          builder: {
            id: 1,
            name: 'Raghav Kumar',
            logo: images.companylogo,
            experience: '10+ Years',
            projects: '50+ Projects',
            description: 'Experienced real estate dealer with over 10 years of expertise in delivering quality residential and commercial projects.',
            rating: 4.5,
            established: '2015'
          }
        },
        2: {
          title: 'Modern Apartment',
          location: 'Dwarka, New Delhi',
          coordinates: { lat: 28.5921, lng: 77.0460 }, 
          price: '₹85 Lac',
          type: 'Apartment',
          beds: 3,
          baths: 2,
          area: '1800 sq.ft',
          images: [
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200'
          ],
          description: 'Beautiful modern apartment with excellent connectivity and amenities. Perfect for families looking for a comfortable living space in Delhi.',
          features: ['Balcony', 'Modular Kitchen', 'Wooden Flooring', 'Wardrobe', 'False Ceiling'],
          amenities: ['Lift', 'Security', 'Power Backup', 'Park', 'Gym'],
          propertyId: 'MG002',
          status: 'Ready to Move',
          facing: 'East',
          furnished: 'Fully Furnished',
          floor: '5th Floor',
          totalFloors: '12',
          age: '2 Years',
          parking: '1 Covered',
          builder: {
            id: 1,
            name: 'Raghav Kumar',
            logo: images.companylogo,
            experience: '10+ Years',
            projects: '50+ Projects',
            description: 'Experienced real estate dealer with over 10 years of expertise in delivering quality residential and commercial projects.',
            rating: 4.5,
            established: '2015'
          }
        }
      };

      export  const services = [
    {
      icon: '🏠',
      title: 'Buy Property',
      description: 'Find your dream home from thousands of verified listings',
      action: () => navigate('/properties'),
      requiresAuth: false
    },
    {
      icon: '💰',
      title: 'Sell Property',
      description: 'List your property and reach millions of buyers',
      action: () => handleProtectedAction('Sell Property'),
      requiresAuth: true
    },
    {
      icon: '🔑',
      title: 'Rent Property',
      description: 'Discover rental properties that match your needs',
      action: () => handleProtectedAction('Rent Property'),
      requiresAuth: true
    },
    {
      icon: '📊',
      title: 'Property Valuation',
      description: 'Get accurate market value of your property',
      action: () => handleProtectedAction('Property Valuation'),
      requiresAuth: true
    }
  ];