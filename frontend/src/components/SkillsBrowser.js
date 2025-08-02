import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillsAPI } from '../services/api';
import SkillCard from './SkillCard';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import LoadingSkeleton from './LoadingSkeleton';
import Pagination from './Pagination';
import CategoryFilter from './CategoryFilter';
import { Grid, List, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const SkillsBrowser = () => {
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [viewMode, setViewMode] = useState('grid');
  
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    skill_level: '',
    session_type: '',
    min_price: 0,
    max_price: 1000,
    sort_by: 'created_at',
    sort_order: 'DESC',
    page: 1,
    limit: 12
  });

  // Fetch skills data
  const fetchSkills = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await skillsAPI.getSkills(filters);
      
      if (response.data.success) {
        setSkills(response.data.data.skills);
        setPagination(response.data.data.pagination);
      } else {
        throw new Error('Failed to fetch skills');
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
      setError('Failed to load skills. Please try again.');
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await skillsAPI.getCategories();
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Handle search
  const handleSearch = useCallback((searchTerm) => {
    setFilters(prev => ({
      ...prev,
      search: searchTerm,
      page: 1
    }));
  }, []);

  // Handle filters change
  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: 1
    }));
  }, []);

  // Handle category selection
  const handleCategorySelect = useCallback((categoryName) => {
    setFilters(prev => ({
      ...prev,
      category: categoryName,
      page: 1
    }));
  }, []);

  // Handle pagination
  const handlePageChange = useCallback((page) => {
    setFilters(prev => ({
      ...prev,
      page
    }));
  }, []);

  // Handle skill card click
  const handleSkillClick = (skill) => {
    // This would typically navigate to a skill detail page
    toast.success(`Selected: ${skill.title}`);
    console.log('Skill selected:', skill);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 text-center mb-2">
              Discover Your Next Skill
            </h1>
            <p className="text-xl text-gray-600 text-center mb-8">
              Browse and filter from thousands of learning opportunities
            </p>
            
            {/* Search Bar */}
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search skills, teachers, or categories..."
            />
          </motion.div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-b border-gray-100">
        <div className="container py-6">
          <CategoryFilter
            categories={categories}
            selectedCategory={filters.category}
            onCategorySelect={handleCategorySelect}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        {/* Controls */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              categories={categories}
            />
            
            {/* Results count */}
            {pagination.total_items && !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-600"
              >
                Showing {((pagination.current_page - 1) * pagination.items_per_page) + 1} - {Math.min(pagination.current_page * pagination.items_per_page, pagination.total_items)} of {pagination.total_items} skills
              </motion.div>
            )}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingSkeleton viewMode={viewMode} />
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Oops! Something went wrong
              </h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={fetchSkills}
                className="btn btn-primary"
              >
                Try Again
              </button>
            </motion.div>
          ) : skills.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No skills found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filters to find more results.
              </p>
              <button
                onClick={() => handleFiltersChange({
                  search: '',
                  category: '',
                  skill_level: '',
                  session_type: '',
                  min_price: 0,
                  max_price: 1000,
                  sort_by: 'created_at',
                  sort_order: 'DESC'
                })}
                className="btn btn-primary"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={viewMode}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
                  : 'space-y-4'
              }
            >
              {skills.map((skill) => (
                <motion.div
                  key={skill.id}
                  variants={itemVariants}
                  layout
                >
                  <SkillCard
                    skill={skill}
                    onClick={handleSkillClick}
                    viewMode={viewMode}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {skills.length > 0 && pagination.total_pages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={pagination.current_page}
              totalPages={pagination.total_pages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsBrowser;