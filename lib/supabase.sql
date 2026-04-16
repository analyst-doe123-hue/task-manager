-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.tasks (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  text text NOT NULL,
  completed boolean DEFAULT false,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT tasks_pkey PRIMARY KEY (id)
);