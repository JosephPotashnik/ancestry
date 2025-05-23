import { RequestHandler } from 'express';
import { supabase } from '../config/supabase';
import { Monarch } from '../types/entities';
import { PostgrestError } from '@supabase/supabase-js';
export {}; // <--- add this temporarily to make sure TypeScript treats it as a module

export const getMonarchs : RequestHandler = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('Monarch')
      .select('*') as { 
        data: Monarch[] | null; 
        error: PostgrestError | null;
      };
    
    if (error) throw error;
    
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch Monarchs' });
  }
};

export const getMonarchByID : RequestHandler= async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('Monarch')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error;
    
    if (!data) {
      res.status(404).json({ error: 'Monarch not found' });
    }
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch Monarch' });
  }
};

export const getGenerationsBetweenMonarchs : RequestHandler= async (req, res) => {
  console.log("entered generations");
  try {
    const { id1, id2 } = req.params;

    let { data, error } = await supabase
      .from('Monarch')
      .select('*') 
      .eq('id', id1)
      .single() as { 
        data: Monarch | null; 
        error: PostgrestError | null;
      };
    
    if (error) throw error;


    if (!data) {
      res.status(404).json({ error: 'Monarch not found' });
    }
    const generation1 = data!.Generations;

    ({ data, error } = await supabase
    .from('Monarch')
    .select('*') 
    .eq('id', id2)
    .single() as { 
      data: Monarch | null; 
      error: PostgrestError | null;
    });
  
  if (error) throw error;

  if (!data) {
    res.status(404).json({ error: 'Monarch not found' });
  }
  const generation2 = data!.Generations;

  console.log(`generations 1: ${generation1}`);
  console.log(`generations 2: ${generation2}`);
  
  const gap = generation2 - generation1;
  console.log(`gap: ${gap}`);

  res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch Monarch' });
  }
};

export const createMonarch : RequestHandler= async (req, res) => {
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      res.status(400).json({ error: 'Name and email are required' });
    }
    
    const { data, error } = await supabase
      .from('Monarch')
      .insert([{ name, email }])
      .select();
    
    if (error) throw error;
    
    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};