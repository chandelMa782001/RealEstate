import { useState, useEffect } from 'react';
import { allProperties } from '../../../Constant/Constants';

export const usePropertyFilter = () => {
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
    propertyType: '',
    priceRange: '',
    location: '',
    beds: '',
    sortBy: 'newest'
  });

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let filtered = [...allProperties];

    // Filter by property type
    if (filters.propertyType) {
      filtered = filtered.filter(property => 
        property.type.toLowerCase() === filters.propertyType.toLowerCase()
      );
    }

    // Filter by location
    if (filters.location) {
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filter by beds
    if (filters.beds) {
      filtered = filtered.filter(property => 
        property.beds === parseInt(filters.beds)
      );
    }

    // Filter by price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(property => 
        property.priceValue >= min && property.priceValue <= max
      );
    }

    // Sort properties
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.priceValue - b.priceValue);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.priceValue - a.priceValue);
        break;
      case 'newest':
      default:
        // Keep original order for newest
        break;
    }

    setFilteredProperties(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      propertyType: '',
      priceRange: '',
      location: '',
      beds: '',
      sortBy: 'newest'
    });
  };

  return {
    filteredProperties,
    filters,
    handleFilterChange,
    clearFilters
  };
};