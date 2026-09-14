alter table public.ingredients
  alter column is_active set default false;

update public.ingredients
  set is_active = false
  where is_active;