import connectMongo from '../../lib/db';
import Task from '../../models/Task';

export default async function handler(req, res) {
  await connectMongo();

  const { query, category, minPrice, maxPrice } = req.query;

  // Build the MongoDB query object
  const searchCriteria = {};

  if (query) {
    searchCriteria.name = { $regex: query, $options: 'i' };
  }

  if (category) {
    searchCriteria.category = category;
  }

  if (minPrice) {
    searchCriteria.price = { ...searchCriteria.price, $gte: Number(minPrice) };
  }

  if (maxPrice) {
    searchCriteria.price = { ...searchCriteria.price, $lte: Number(maxPrice) };
  }

  try {
    const items = await Task.find(searchCriteria);
    res.status(200).json({ success: true, data: items });
  } 
  catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching data' });
  }
}
