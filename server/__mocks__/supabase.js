export const supabase = {
  from: () => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ data: { id: 1 }, error: null }),
    update: () => Promise.resolve({ data: { id: 1 }, error: null }),
    delete: () => Promise.resolve({ data: { id: 1 }, error: null })
  })
};
