import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Palette, 
  Briefcase, 
  Globe, 
  Music, 
  Camera, 
  Heart,
  ChefHat
} from 'lucide-react';

const CategoryFilter = ({ categories, selectedCategory, onCategorySelect }) => {
  const categoryIcons = {
    'Programming': Code,
    'Design': Palette,
    'Business': Briefcase,
    'Languages': Globe,
    'Music': Music,
    'Photography': Camera,
    'Fitness': Heart,
    'Cooking': ChefHat
  };

  return (
    <div className="relative">
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {/* All Categories */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategorySelect('')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full border font-medium whitespace-nowrap transition-all ${
            !selectedCategory
              ? 'bg-blue-500 text-white border-blue-500 shadow-lg'
              : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
          }`}
        >
          <span>All Categories</span>
        </motion.button>

        {/* Category Filters */}
        {categories.map((category) => {
          const IconComponent = categoryIcons[category.name] || Code;
          const isSelected = selectedCategory === category.name;
          
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategorySelect(category.name)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full border font-medium whitespace-nowrap transition-all ${
                isSelected
                  ? 'text-white border-2 shadow-lg'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
              style={isSelected ? {
                backgroundColor: category.color,
                borderColor: category.color
              } : {}}
            >
              <IconComponent className="w-4 h-4" />
              <span>{category.name}</span>
              <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                {category.skill_count}
              </span>
            </motion.button>
          );
        })}
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
    </div>
  );
};

export default CategoryFilter;