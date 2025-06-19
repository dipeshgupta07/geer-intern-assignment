
import supabase from '../../../lib/supabase';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return res.status(500).json({ error: error.message });
    if (!data) return res.status(404).json({ message: 'Product not found' });

    return res.status(200).json({ product: data });
  }

  if (req.method === 'PUT') {
    const updates = req.body;

    // Validate that we have data to update
    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No update data provided' });
    }

    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    if (!data) return res.status(404).json({ message: 'Product not found' });

    return res.status(200).json({ message: 'Product updated', product: data });
  }

  if (req.method === 'DELETE') {
    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    if (!data) return res.status(404).json({ message: 'Product not found' });

    return res.status(200).json({ message: 'Product deleted', product: data });
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}