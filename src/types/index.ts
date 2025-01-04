// ...existing code...

export type CustomizationType = {
  sizes: Record<string, number>;
  colors: Array<{ id: string; value: string }>;
  material: 'standard' | 'premium';
  logoPosition?: string;
  notes?: string;
};

// ...existing code...
