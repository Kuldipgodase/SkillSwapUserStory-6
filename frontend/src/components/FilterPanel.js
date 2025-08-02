import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  ChevronDown, 
  X, 
  DollarSign,
  Clock,
  Users,
  BookOpen
} from 'lucide-react';
import { skillsAPI } from '../services/api';

const FilterPanel = ({ filters, onFiltersChange, categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    if (filterOptions) {
      setPriceRange([
        filterOptions.price_range.min_price || 0,
        filterOptions.price_range.max_price || 1000
      ]);
    }
  }, [filterOptions]);

  const fetchFilterOptions = async () => {
    try {
      const response = await skillsAPI.getFilterOptions();
      setFilterOptions(response.data.data);
    } catch (error) {
      console.error('Error fetching filter options:', error);
    }
  };

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handlePriceRangeChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = Number(value);
    setPriceRange(newRange);
    
    onFiltersChange({
      ...filters,
      min_price: newRange[0],
      max_price: newRange[1]
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      category: '',
      skill_level: '',
      session_type: '',
      min_price: 0,
      max_price: 1000,
      sort_by: 'created_at',
      sort_order: 'DESC'
    });
    
    if (filterOptions) {
      setPriceRange([
        filterOptions.price_range.min_price || 0,
        filterOptions.price_range.max_price || 1000
      ]);
    }
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value && value !== '' && value !== 0 && value !== 1000 && 
    value !== 'created_at' && value !== 'DESC'
  ).length;

  return (
    <div className="relative">
      {/* Filter Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
      >
        <Filter className="w-5 h-5 text-gray-600" />
        <span className="font-medium text-gray-700">Filters</span>
        {activeFiltersCount > 0 && (
          <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[1.25rem] text-center">
            {activeFiltersCount}
          </span>
        )}
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-96 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 p-6"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Filter Skills</h3>
              <div className="flex gap-2">
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Clear all
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <BookOpen className="w-4 h-4" />
                Category
              </label>
              <select
                value={filters.category || ''}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name} ({category.skill_count})
                  </option>
                ))}
              </select>
            </div>

            {/* Skill Level */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Users className="w-4 h-4" />
                Skill Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {filterOptions?.skill_levels?.map((level) => (
                  <button
                    key={level}
                    onClick={() => handleFilterChange('skill_level', filters.skill_level === level ? '' : level)}
                    className={`p-2 text-sm rounded-lg border transition-all ${
                      filters.skill_level === level
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Session Type */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Clock className="w-4 h-4" />
                Session Type
              </label>
              <div className="space-y-2">
                {filterOptions?.session_types?.map((type) => (
                  <label key={type} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="session_type"
                      value={type}
                      checked={filters.session_type === type}
                      onChange={(e) => handleFilterChange('session_type', e.target.checked ? type : '')}
                      className="text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="session_type"
                    value=""
                    checked={!filters.session_type}
                    onChange={() => handleFilterChange('session_type', '')}
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">All Types</span>
                </label>
              </div>
            </div>

            {/* Price Range */}
            {filterOptions && (
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                  <DollarSign className="w-4 h-4" />
                  Price Range (per hour)
                </label>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="text-xs text-gray-500">Min</label>
                      <input
                        type="range"
                        min={filterOptions.price_range.min_price || 0}
                        max={filterOptions.price_range.max_price || 1000}
                        value={priceRange[0]}
                        onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                        className="range-slider w-full"
                      />
                      <div className="text-sm font-medium text-center">${priceRange[0]}</div>
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-gray-500">Max</label>
                      <input
                        type="range"
                        min={filterOptions.price_range.min_price || 0}
                        max={filterOptions.price_range.max_price || 1000}
                        value={priceRange[1]}
                        onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                        className="range-slider w-full"
                      />
                      <div className="text-sm font-medium text-center">${priceRange[1]}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sort Options */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 mb-3 block">Sort by</label>
              <select
                value={`${filters.sort_by}_${filters.sort_order}`}
                onChange={(e) => {
                  const [sort_by, sort_order] = e.target.value.split('_');
                  handleFilterChange('sort_by', sort_by);
                  handleFilterChange('sort_order', sort_order);
                }}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="created_at_DESC">Newest First</option>
                <option value="created_at_ASC">Oldest First</option>
                <option value="price_per_hour_ASC">Price: Low to High</option>
                <option value="price_per_hour_DESC">Price: High to Low</option>
                <option value="rating_DESC">Rating: High to Low</option>
                <option value="total_enrollments_DESC">Most Popular</option>
                <option value="title_ASC">Name: A to Z</option>
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterPanel;