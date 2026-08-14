create table if not exists public.ingredients (
  id bigint generated always as identity not null,
  created_at timestamptz not null default now(),
  name text not null,
  category text,
  description text,
  default_unit text,
  is_active boolean not null default true,
  constraint ingredients_pkey primary key (id)
);

create table if not exists public.nutrition (
  id bigint generated always as identity not null,
  created_at timestamptz not null default now(),
  ingredient_id bigint not null,
  source text not null,
  source_id text not null,
  protein_per_100g numeric,
  carbs_per_100g numeric,
  fat_per_100g numeric,
  fiber_per_100g numeric,
  sugar_per_100g numeric,
  saturated_fat_per_100g numeric,
  sodium_mg_per_100g numeric,
  calories_per_100g numeric,
  constraint nutrition_pkey primary key (id),
  constraint nutrition_ingredient_id_fkey foreign key (ingredient_id) references public.ingredients (id)
);

create table if not exists public.ingredient_aliases (
  id bigint generated always as identity not null,
  created_at timestamptz not null default now(),
  ingredient_id bigint not null,
  alias text not null,
  normalised_alias text not null unique,
  constraint ingredient_aliases_pkey primary key (id),
  constraint ingredient_aliases_ingredient_id_fkey foreign key (ingredient_id) references public.ingredients (id)
);

create table if not exists public.recipes (
  id bigint generated always as identity not null,
  created_at timestamptz not null default now(),
  name text not null,
  description text,
  servings smallint not null,
  prep_time_minutes smallint,
  cook_time_minutes smallint,
  difficulty text,
  image_url text,
  constraint recipes_pkey primary key (id)
);

create table if not exists public.recipe_steps (
  id bigint generated always as identity not null,
  recipe_id bigint not null,
  step_number smallint not null,
  instruction text not null,
  constraint recipe_steps_pkey primary key (id),
  constraint recipe_steps_recipe_id_fkey foreign key (recipe_id) references public.recipes (id)
);

create table if not exists public.recipe_ingredients (
  id bigint generated always as identity not null,
  recipe_id bigint not null,
  ingredient_id bigint not null,
  quantity numeric not null,
  unit text not null,
  preparation text,
  is_optional boolean not null default false,
  constraint recipe_ingredients_pkey primary key (id),
  constraint recipe_ingredients_recipe_id_fkey foreign key (recipe_id) references public.recipes (id),
  constraint recipe_ingredients_ingredient_id_fkey foreign key (ingredient_id) references public.ingredients (id)
);

create table if not exists public.ingredient_substitutions (
  id bigint generated always as identity not null,
  created_at timestamptz not null default now(),
  ingredient_id bigint not null,
  substitute_ingredient_id bigint not null,
  functional_similarity real,
  nutrition_similarity real,
  notes text,
  constraint ingredient_substitutions_pkey primary key (id),
  constraint ingredient_substitutions_ingredient_id_fkey foreign key (ingredient_id) references public.ingredients (id),
  constraint ingredient_substitutions_substitute_ingredient_id_fkey foreign key (substitute_ingredient_id) references public.ingredients (id)
);
