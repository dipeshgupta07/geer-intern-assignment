
import supabase from '../../../lib/supabase';

export default async function handler(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');


  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Supabase GET error:', error);
        return res.status(500).json({ error: error.message });
      }
      return res.status(200).json(data);
    } catch (error) {
      console.error('GET request error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'POST') {
    try {
      // Log the incoming request body for debugging
      console.log('POST request body:', req.body);

      const {
        id,
        name,
        price,
        originalPrice,
        category,
        material,
        gemstone,
        weight,
        image, // Make sure this matches your database column name
        imageUrl, // Alternative field name
        description,
        inStock,
        rating,
        reviews,
        tags,
        features
      } = req.body;

      // Validate required fields
      if (!name || !price) {
        return res.status(400).json({
          error: 'Missing required fields',
          message: 'name and price are required',
          received: { name, price }
        });
      }

      const finalImageUrl = image || imageUrl;
      if (!finalImageUrl) {
        return res.status(400).json({
          error: 'Missing required fields',
          message: 'image or imageUrl is required'
        });
      }

  
      const productData = {
        id : id,
        name,
        price: parseFloat(price),
        originalprice: originalPrice ? parseFloat(originalPrice) : null,
        category: category || 'Uncategorized',
        material: material || 'Not specified',
        gemstone: gemstone || 'None',
        weight: weight || 'Not specified',
        image: finalImageUrl, 
        description: description || '',
        
        rating: rating ? parseFloat(rating) : 0,
        reviews: reviews ? parseInt(reviews) : 0,
        tags: tags || [],
        features: features || []
      };

      console.log('Inserting product data:', productData);

      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single();

      if (error) {
        console.error('Supabase INSERT error:', error);
        return res.status(500).json({ 
          error: error.message,
          details: error.details,
          hint: error.hint
        });
      }

      console.log('Product inserted successfully:', data);
      return res.status(201).json(data);

    } catch (error) {
      console.error('POST request error:', error);
      return res.status(500).json({ 
        error: 'Internal server error',
        message: error.message 
      });
    }
  }

  // Method not allowed
  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}