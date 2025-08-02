import React from 'react';
import { motion } from 'framer-motion';

const SkillCardSkeleton = () => (
  <div className="skill-card">
    <div className="h-2 w-full loading-skeleton" />
    <div className="p-6">
      <div className="space-y-4">
        <div className="h-6 loading-skeleton rounded" />
        <div className="h-4 loading-skeleton rounded w-3/4" />
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 loading-skeleton rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-4 loading-skeleton rounded w-1/2" />
            <div className="h-3 loading-skeleton rounded w-1/3" />
          </div>
          <div className="h-4 loading-skeleton rounded w-12" />
        </div>
        
        <div className="flex gap-2">
          <div className="h-6 loading-skeleton rounded w-16" />
          <div className="h-6 loading-skeleton rounded w-20" />
          <div className="h-6 loading-skeleton rounded w-14" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="h-4 loading-skeleton rounded" />
          <div className="h-4 loading-skeleton rounded" />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="h-6 loading-skeleton rounded w-20" />
          <div className="h-6 loading-skeleton rounded w-16" />
        </div>
        
        <div className="pt-4 border-t border-gray-100">
          <div className="h-3 loading-skeleton rounded w-24" />
        </div>
      </div>
    </div>
  </div>
);

const LoadingSkeleton = ({ viewMode = 'grid' }) => {
  const skeletonCount = 12;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
          : 'space-y-4'
      }
    >
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <SkillCardSkeleton />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default LoadingSkeleton;