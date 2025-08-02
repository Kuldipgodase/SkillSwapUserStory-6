const { getConnection } = require('../config/database');

class SkillController {
  // Get all skills with search and filters
  static async getSkills(req, res) {
    try {
      const {
        search = '',
        category = '',
        skill_level = '',
        session_type = '',
        min_price = 0,
        max_price = 1000,
        sort_by = 'created_at',
        sort_order = 'DESC',
        page = 1,
        limit = 12
      } = req.query;

      const db = getConnection();
      let query = `
        SELECT 
          s.*,
          c.name as category_name,
          c.icon as category_icon,
          c.color as category_color,
          u.name as teacher_name,
          u.avatar as teacher_avatar,
          u.rating as teacher_rating,
          u.total_reviews as teacher_reviews,
          u.is_verified as teacher_verified,
          u.location as teacher_location
        FROM skills s
        LEFT JOIN categories c ON s.category_id = c.id
        LEFT JOIN users u ON s.teacher_id = u.id
        WHERE s.is_active = true
      `;

      const queryParams = [];

      // Search functionality
      if (search) {
        query += ` AND (
          s.title LIKE ? OR 
          s.description LIKE ? OR 
          JSON_SEARCH(s.tags, 'one', ?) IS NOT NULL OR
          u.name LIKE ?
        )`;
        const searchTerm = `%${search}%`;
        queryParams.push(searchTerm, searchTerm, `%${search}%`, searchTerm);
      }

      // Category filter
      if (category) {
        query += ` AND c.name = ?`;
        queryParams.push(category);
      }

      // Skill level filter
      if (skill_level) {
        query += ` AND s.skill_level = ?`;
        queryParams.push(skill_level);
      }

      // Session type filter
      if (session_type) {
        query += ` AND s.session_type = ?`;
        queryParams.push(session_type);
      }

      // Price range filter
      if (min_price || max_price) {
        query += ` AND s.price_per_hour BETWEEN ? AND ?`;
        queryParams.push(Number(min_price), Number(max_price));
      }

      // Sorting
      const validSortFields = ['created_at', 'price_per_hour', 'rating', 'total_enrollments', 'title'];
      const sortField = validSortFields.includes(sort_by) ? sort_by : 'created_at';
      const sortDirection = sort_order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
      query += ` ORDER BY s.${sortField} ${sortDirection}`;

      // Pagination
      const offset = (Number(page) - 1) * Number(limit);
      query += ` LIMIT ? OFFSET ?`;
      queryParams.push(Number(limit), offset);

      const [skills] = await db.execute(query, queryParams);

      // Get total count for pagination
      let countQuery = `
        SELECT COUNT(*) as total
        FROM skills s
        LEFT JOIN categories c ON s.category_id = c.id
        LEFT JOIN users u ON s.teacher_id = u.id
        WHERE s.is_active = true
      `;

      const countParams = [];
      if (search) {
        countQuery += ` AND (
          s.title LIKE ? OR 
          s.description LIKE ? OR 
          JSON_SEARCH(s.tags, 'one', ?) IS NOT NULL OR
          u.name LIKE ?
        )`;
        const searchTerm = `%${search}%`;
        countParams.push(searchTerm, searchTerm, `%${search}%`, searchTerm);
      }

      if (category) {
        countQuery += ` AND c.name = ?`;
        countParams.push(category);
      }

      if (skill_level) {
        countQuery += ` AND s.skill_level = ?`;
        countParams.push(skill_level);
      }

      if (session_type) {
        countQuery += ` AND s.session_type = ?`;
        countParams.push(session_type);
      }

      if (min_price || max_price) {
        countQuery += ` AND s.price_per_hour BETWEEN ? AND ?`;
        countParams.push(Number(min_price), Number(max_price));
      }

      const [countResult] = await db.execute(countQuery, countParams);
      const total = countResult[0].total;

      // Process skills data
      const processedSkills = skills.map(skill => ({
        ...skill,
        tags: skill.tags ? JSON.parse(skill.tags) : [],
        available_slots: skill.available_slots ? JSON.parse(skill.available_slots) : []
      }));

      res.json({
        success: true,
        data: {
          skills: processedSkills,
          pagination: {
            current_page: Number(page),
            total_pages: Math.ceil(total / Number(limit)),
            total_items: total,
            items_per_page: Number(limit)
          }
        }
      });

    } catch (error) {
      console.error('Error fetching skills:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching skills',
        error: error.message
      });
    }
  }

  // Get skill by ID
  static async getSkillById(req, res) {
    try {
      const { id } = req.params;
      const db = getConnection();

      const query = `
        SELECT 
          s.*,
          c.name as category_name,
          c.icon as category_icon,
          c.color as category_color,
          u.name as teacher_name,
          u.avatar as teacher_avatar,
          u.rating as teacher_rating,
          u.total_reviews as teacher_reviews,
          u.is_verified as teacher_verified,
          u.location as teacher_location,
          u.bio as teacher_bio,
          u.languages as teacher_languages
        FROM skills s
        LEFT JOIN categories c ON s.category_id = c.id
        LEFT JOIN users u ON s.teacher_id = u.id
        WHERE s.id = ? AND s.is_active = true
      `;

      const [skills] = await db.execute(query, [id]);

      if (skills.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Skill not found'
        });
      }

      const skill = {
        ...skills[0],
        tags: skills[0].tags ? JSON.parse(skills[0].tags) : [],
        available_slots: skills[0].available_slots ? JSON.parse(skills[0].available_slots) : [],
        teacher_languages: skills[0].teacher_languages ? JSON.parse(skills[0].teacher_languages) : []
      };

      res.json({
        success: true,
        data: skill
      });

    } catch (error) {
      console.error('Error fetching skill:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching skill',
        error: error.message
      });
    }
  }

  // Get all categories
  static async getCategories(req, res) {
    try {
      const db = getConnection();
      
      const query = `
        SELECT 
          c.*,
          COUNT(s.id) as skill_count
        FROM categories c
        LEFT JOIN skills s ON c.id = s.category_id AND s.is_active = true
        GROUP BY c.id
        ORDER BY c.name
      `;

      const [categories] = await db.execute(query);

      res.json({
        success: true,
        data: categories
      });

    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching categories',
        error: error.message
      });
    }
  }

  // Get filter options
  static async getFilterOptions(req, res) {
    try {
      const db = getConnection();

      // Get price range
      const [priceRange] = await db.execute(`
        SELECT 
          MIN(price_per_hour) as min_price,
          MAX(price_per_hour) as max_price
        FROM skills 
        WHERE is_active = true AND price_per_hour > 0
      `);

      // Get skill levels
      const [skillLevels] = await db.execute(`
        SELECT DISTINCT skill_level
        FROM skills 
        WHERE is_active = true
        ORDER BY 
          CASE skill_level 
            WHEN 'Beginner' THEN 1 
            WHEN 'Intermediate' THEN 2 
            WHEN 'Advanced' THEN 3 
          END
      `);

      // Get session types
      const [sessionTypes] = await db.execute(`
        SELECT DISTINCT session_type
        FROM skills 
        WHERE is_active = true
        ORDER BY session_type
      `);

      res.json({
        success: true,
        data: {
          price_range: priceRange[0],
          skill_levels: skillLevels.map(item => item.skill_level),
          session_types: sessionTypes.map(item => item.session_type)
        }
      });

    } catch (error) {
      console.error('Error fetching filter options:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching filter options',
        error: error.message
      });
    }
  }
}

module.exports = SkillController;