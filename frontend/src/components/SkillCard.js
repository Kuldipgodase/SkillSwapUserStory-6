import React from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Clock, 
  DollarSign, 
  Users, 
  CheckCircle,
  MapPin
} from 'lucide-react';

const SkillCard = ({ skill, onClick }) => {
  const levelColors = {
    'Beginner': 'bg-green-50 text-green-600 border-green-200',
    'Intermediate': 'bg-yellow-50 text-yellow-600 border-yellow-200',
    'Advanced': 'bg-red-50 text-red-600 border-red-200'
  };

  const sessionTypeIcons = {
    'One-on-One': Users,
    'Group': Users,
    'Workshop': Users
  };

  const SessionIcon = sessionTypeIcons[skill.session_type] || Users;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="skill-card cursor-pointer"
      onClick={() => onClick(skill)}
    >
      {/* Category Header */}
      <div 
        className="h-2 w-full"
        style={{ backgroundColor: skill.category_color }}
      />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
              {skill.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {skill.description}
            </p>
          </div>
        </div>

        {/* Teacher Info */}
        <div className="flex items-center mb-4">
          <img
            src={skill.teacher_avatar}
            alt={skill.teacher_name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div className="flex-1">
            <div className="flex items-center">
              <span className="font-medium text-gray-900">{skill.teacher_name}</span>
              {skill.teacher_verified && (
                <CheckCircle className="w-4 h-4 text-blue-500 ml-1" />
              )}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-3 h-3 mr-1" />
              {skill.teacher_location}
            </div>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium ml-1">{skill.teacher_rating}</span>
            <span className="text-xs text-gray-500 ml-1">({skill.teacher_reviews})</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {skill.tags && skill.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
          {skill.tags && skill.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
              +{skill.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>{skill.duration_hours}h total</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <SessionIcon className="w-4 h-4 mr-2" />
            <span>{skill.session_type}</span>
          </div>
        </div>

        {/* Level and Price */}
        <div className="flex justify-between items-center">
          <span 
            className={`px-3 py-1 rounded-full text-xs font-medium border ${levelColors[skill.skill_level]}`}
          >
            {skill.skill_level}
          </span>
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="text-lg font-bold text-green-600">
              {skill.price_per_hour}
            </span>
            <span className="text-sm text-gray-500 ml-1">/hour</span>
          </div>
        </div>

        {/* Category Badge */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {skill.category_name}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillCard;