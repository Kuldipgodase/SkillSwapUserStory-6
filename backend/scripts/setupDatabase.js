const mysql = require('mysql2/promise');
require('dotenv').config();

const createDatabase = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT || 3306
  });

  try {
    // Create database
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'skillswap_db'}`);
    console.log('✅ Database created successfully');

    // Use the database
    await connection.execute(`USE ${process.env.DB_NAME || 'skillswap_db'}`);

    // Create categories table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        icon VARCHAR(50),
        color VARCHAR(7),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create users table (teachers)
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        avatar VARCHAR(255),
        bio TEXT,
        rating DECIMAL(3,2) DEFAULT 0.00,
        total_reviews INT DEFAULT 0,
        is_verified BOOLEAN DEFAULT FALSE,
        location VARCHAR(100),
        languages JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create skills table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS skills (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(150) NOT NULL,
        description TEXT,
        category_id INT,
        teacher_id INT,
        skill_level ENUM('Beginner', 'Intermediate', 'Advanced') NOT NULL,
        duration_hours INT,
        price_per_hour DECIMAL(10,2),
        tags JSON,
        prerequisites TEXT,
        learning_outcomes TEXT,
        session_type ENUM('One-on-One', 'Group', 'Workshop') DEFAULT 'One-on-One',
        max_students INT DEFAULT 1,
        available_slots JSON,
        rating DECIMAL(3,2) DEFAULT 0.00,
        total_enrollments INT DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id),
        FOREIGN KEY (teacher_id) REFERENCES users(id)
      )
    `);

    // Insert sample categories
    const categories = [
      ['Programming', 'Learn various programming languages and frameworks', 'code', '#3B82F6'],
      ['Design', 'UI/UX Design, Graphic Design, and Creative Skills', 'palette', '#EF4444'],
      ['Business', 'Entrepreneurship, Marketing, and Business Skills', 'briefcase', '#10B981'],
      ['Languages', 'Learn new languages and improve communication', 'globe', '#8B5CF6'],
      ['Music', 'Musical instruments, theory, and composition', 'music', '#F59E0B'],
      ['Photography', 'Digital photography, editing, and visual storytelling', 'camera', '#EC4899'],
      ['Fitness', 'Physical fitness, yoga, and wellness coaching', 'heart', '#EF4444'],
      ['Cooking', 'Culinary arts, baking, and international cuisines', 'chef-hat', '#F97316']
    ];

    for (const [name, description, icon, color] of categories) {
      await connection.execute(
        'INSERT IGNORE INTO categories (name, description, icon, color) VALUES (?, ?, ?, ?)',
        [name, description, icon, color]
      );
    }

    // Insert sample teachers
    const teachers = [
      ['Sarah Johnson', 'sarah.johnson@email.com', 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150', 'Full-stack developer with 8+ years experience. Passionate about teaching modern web technologies.', 4.9, 127, true, 'San Francisco, CA', '["English", "Spanish"]'],
      ['David Chen', 'david.chen@email.com', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'UI/UX Designer and creative director. Expert in design thinking and user experience.', 4.8, 89, true, 'New York, NY', '["English", "Mandarin"]'],
      ['Maria Garcia', 'maria.garcia@email.com', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', 'Marketing strategist and business consultant. Helping entrepreneurs grow their businesses.', 4.7, 156, true, 'Austin, TX', '["English", "Spanish", "Portuguese"]'],
      ['Ahmed Hassan', 'ahmed.hassan@email.com', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', 'Polyglot and language learning expert. Fluent in 7 languages.', 4.9, 203, true, 'London, UK', '["English", "Arabic", "French", "German"]'],
      ['Lisa Wong', 'lisa.wong@email.com', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', 'Professional photographer and visual storytelling expert.', 4.6, 74, true, 'Los Angeles, CA', '["English", "Cantonese"]'],
      ['Marco Rossi', 'marco.rossi@email.com', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', 'Italian chef and culinary instructor. Specializes in authentic Italian cuisine.', 4.8, 112, true, 'Rome, Italy', '["Italian", "English"]']
    ];

    for (const teacher of teachers) {
      await connection.execute(
        'INSERT IGNORE INTO users (name, email, avatar, bio, rating, total_reviews, is_verified, location, languages) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        teacher
      );
    }

    // Insert sample skills
    const skills = [
      // Programming Skills
      ['React.js Complete Course', 'Master React.js from basics to advanced concepts including hooks, context, and state management.', 1, 1, 'Intermediate', 40, 45.00, '["React", "JavaScript", "Frontend", "Hooks", "Context API"]', 'Basic JavaScript knowledge', 'Build modern web applications with React', 'One-on-One', 1, '["Monday 9-12", "Wednesday 14-17", "Friday 10-13"]'],
      ['Python for Data Science', 'Learn Python programming with focus on data analysis, pandas, numpy, and visualization.', 1, 1, 'Beginner', 30, 40.00, '["Python", "Data Science", "Pandas", "NumPy", "Matplotlib"]', 'No prior programming experience needed', 'Analyze real-world datasets and create visualizations', 'Group', 5, '["Tuesday 18-21", "Thursday 18-21", "Saturday 9-12"]'],
      ['Node.js Backend Development', 'Build scalable backend applications with Node.js, Express, and MongoDB.', 1, 1, 'Advanced', 35, 50.00, '["Node.js", "Express", "MongoDB", "Backend", "API Development"]', 'JavaScript fundamentals', 'Create production-ready backend services', 'One-on-One', 1, '["Monday 14-17", "Wednesday 9-12"]'],
      
      // Design Skills
      ['UI/UX Design Fundamentals', 'Learn the principles of user interface and user experience design using Figma.', 2, 2, 'Beginner', 25, 35.00, '["UI/UX", "Figma", "Design Thinking", "Wireframing", "Prototyping"]', 'Basic computer skills', 'Design professional interfaces and user experiences', 'Workshop', 8, '["Monday 10-13", "Wednesday 15-18", "Friday 14-17"]'],
      ['Advanced Figma Techniques', 'Master advanced Figma features including auto-layout, components, and design systems.', 2, 2, 'Advanced', 20, 55.00, '["Figma", "Design Systems", "Components", "Auto-layout", "Advanced Design"]', 'Basic Figma knowledge', 'Create scalable design systems and advanced prototypes', 'One-on-One', 1, '["Tuesday 9-12", "Thursday 14-17"]'],
      
      // Business Skills
      ['Digital Marketing Strategy', 'Comprehensive guide to digital marketing including SEO, social media, and analytics.', 3, 3, 'Intermediate', 28, 42.00, '["Digital Marketing", "SEO", "Social Media", "Analytics", "Strategy"]', 'Basic marketing knowledge', 'Develop and execute digital marketing campaigns', 'Group', 6, '["Monday 19-22", "Wednesday 19-22", "Saturday 14-17"]'],
      ['Startup Fundamentals', 'Learn how to start, fund, and grow a successful startup business.', 3, 3, 'Beginner', 32, 38.00, '["Entrepreneurship", "Startup", "Business Plan", "Funding", "Growth"]', 'Business idea or interest in entrepreneurship', 'Launch and scale a startup business', 'Workshop', 10, '["Tuesday 18-21", "Thursday 18-21"]'],
      
      // Language Skills
      ['Spanish Conversation Practice', 'Improve your Spanish speaking skills through interactive conversation sessions.', 4, 4, 'Intermediate', 15, 30.00, '["Spanish", "Conversation", "Speaking", "Pronunciation", "Cultural Context"]', 'Basic Spanish vocabulary', 'Speak Spanish confidently in real situations', 'One-on-One', 1, '["Monday 16-19", "Tuesday 10-13", "Wednesday 16-19", "Thursday 10-13", "Friday 16-19"]'],
      ['French for Beginners', 'Start your French learning journey with fundamental grammar, vocabulary, and pronunciation.', 4, 4, 'Beginner', 24, 32.00, '["French", "Grammar", "Vocabulary", "Pronunciation", "Basics"]', 'No prior French knowledge needed', 'Hold basic conversations in French', 'Group', 4, '["Monday 18-21", "Wednesday 18-21", "Saturday 10-13"]'],
      ['German Business Language', 'Learn professional German for business contexts and workplace communication.', 4, 4, 'Advanced', 22, 48.00, '["German", "Business", "Professional", "Workplace", "Communication"]', 'Intermediate German level', 'Communicate effectively in German business environment', 'One-on-One', 1, '["Tuesday 14-17", "Thursday 14-17"]'],
      
      // Photography Skills
      ['Digital Photography Basics', 'Master camera fundamentals, composition, and basic editing techniques.', 6, 5, 'Beginner', 18, 35.00, '["Photography", "Camera Basics", "Composition", "Lighting", "Editing"]', 'DSLR or mirrorless camera', 'Take professional-quality photos', 'Workshop', 6, '["Saturday 9-12", "Sunday 9-12"]'],
      ['Advanced Photo Editing', 'Professional photo editing using Adobe Lightroom and Photoshop.', 6, 5, 'Advanced', 16, 45.00, '["Photo Editing", "Lightroom", "Photoshop", "Color Grading", "Retouching"]', 'Basic photography knowledge', 'Edit photos like a professional', 'One-on-One', 1, '["Monday 15-18", "Friday 15-18"]'],
      
      // Cooking Skills
      ['Italian Cuisine Masterclass', 'Learn to cook authentic Italian dishes from a professional Italian chef.', 8, 6, 'Intermediate', 12, 55.00, '["Italian Cooking", "Pasta", "Pizza", "Traditional Recipes", "Culinary Arts"]', 'Basic cooking skills', 'Cook authentic Italian meals', 'Group', 4, '["Saturday 16-19", "Sunday 16-19"]'],
      ['Baking Fundamentals', 'Master the art of baking breads, pastries, and desserts from scratch.', 8, 6, 'Beginner', 20, 40.00, '["Baking", "Bread", "Pastries", "Desserts", "Fundamentals"]', 'Basic kitchen skills', 'Bake professional-quality goods', 'Workshop', 8, '["Wednesday 10-13", "Saturday 10-13"]']
    ];

    for (const skill of skills) {
      await connection.execute(
        'INSERT IGNORE INTO skills (title, description, category_id, teacher_id, skill_level, duration_hours, price_per_hour, tags, prerequisites, learning_outcomes, session_type, max_students, available_slots) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        skill
      );
    }

    console.log('✅ Sample data inserted successfully');
    console.log('🎉 Database setup completed!');

  } catch (error) {
    console.error('❌ Error setting up database:', error);
  } finally {
    await connection.end();
  }
};

createDatabase();