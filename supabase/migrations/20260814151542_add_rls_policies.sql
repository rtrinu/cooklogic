alter table public.ingredients enable row level security;
alter table public.nutrition enable row level security;
alter table public.ingredient_aliases enable row level security;
alter table public.ingredient_substitutions enable row level security;
alter table public.recipes enable row level security;
alter table public.recipe_steps enable row level security;
alter table public.recipe_ingredients enable row level security;

create policy "ingredient_select" on public.ingredients for select to anon, authenticated using (true);
create policy "nutrition_select" on public.nutrition for select to anon, authenticated using (true);
create policy "ingredient_aliases_select" on public.ingredient_aliases for select to anon, authenticated using (true);
create policy "ingredient_substitutions_select" on public.ingredient_substitutions for select to anon, authenticated using (true);

create policy "recipes_select" on public.recipes for select to anon, authenticated using (true);
create policy "recipe_steps_select" on public.recipe_steps for select to anon, authenticated using (true);
create policy "recipe_ingredients_select" on public.recipe_ingredients for select to anon, authenticated using (true);

revoke insert, update, delete, truncate, references, trigger
  on public.ingredients, public.nutrition, public.ingredient_aliases,
     public.ingredient_substitutions, public.recipes, public.recipe_steps,
     public.recipe_ingredients
  from anon, authenticated;

revoke all on all sequences in schema public from anon, authenticated;