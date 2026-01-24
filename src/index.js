/**
 * Rating Service - POC for Auto-Remediation Testing
 * 
 * This service handles product and service ratings.
 * It's designed to demonstrate auto-remediation capabilities.
 */

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Submit rating endpoint
app.post('/api/v1/ratings', async (req, res) => {
  try {
    const { productId, userId, rating, comment } = req.body;
    
    // Validate input
    if (!productId || !userId || !rating) {
      return res.status(400).json({ 
        error: 'Missing required fields: productId, userId, rating' 
      });
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ 
        error: 'Rating must be between 1 and 5' 
      });
    }

    // Save rating
    const ratingResult = await saveRating(productId, userId, rating, comment);
    
    res.status(201).json({
      success: true,
      ratingId: ratingResult.id,
      productId: ratingResult.productId,
      rating: ratingResult.rating
    });
  } catch (error) {
    console.error('Rating submission error:', error);
    res.status(500).json({ 
      error: 'Failed to submit rating',
      message: error.message 
    });
  }
});

// Get ratings for a product
app.get('/api/v1/ratings/product/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const ratings = await getRatingsForProduct(productId);
    
    res.status(200).json({
      productId,
      ratings,
      averageRating: calculateAverage(ratings),
      totalRatings: ratings.length
    });
  } catch (error) {
    console.error('Error fetching ratings:', error);
    res.status(500).json({ 
      error: 'Failed to fetch ratings',
      message: error.message 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    service: 'rating-service',
    timestamp: new Date().toISOString()
  });
});

// Simulate saving rating
async function saveRating(productId, userId, rating, comment) {
  // Simulate potential issues:
  // - Database write timeout
  // - Validation errors
  // - Duplicate rating handling
  
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    id: `RATING-${Date.now()}`,
    productId,
    userId,
    rating,
    comment: comment || null,
    timestamp: new Date().toISOString()
  };
}

// Simulate fetching ratings
async function getRatingsForProduct(productId) {
  // Simulate potential issues:
  // - Database query timeout
  // - Empty result handling
  
  await new Promise(resolve => setTimeout(resolve, 50));
  
  return [
    { id: '1', rating: 5, comment: 'Great product!' },
    { id: '2', rating: 4, comment: 'Good value' },
    { id: '3', rating: 5, comment: 'Highly recommend' }
  ];
}

// Calculate average rating
function calculateAverage(ratings) {
  if (!ratings || ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
  return (sum / ratings.length).toFixed(2);
}

// Start server
app.listen(PORT, () => {
  console.log(`Rating service running on port ${PORT}`);
});

module.exports = app;
