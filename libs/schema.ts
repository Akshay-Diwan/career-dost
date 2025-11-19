import { z } from "zod";

//LOCATIONS
export const LocationSchema = z.object({
  id: z.number().int().min(1).optional(), // Auto-generated
  city: z.string().max(100),
  state: z.string().max(100),
  country: z.string().max(100).default("India"), // optional default
});


export const CollegeSchema = z.object({
  id: z.number().int().min(1).optional(), // AUTO_INCREMENT
  name: z.string().max(120),
  city_id: z.number().int().min(1),
  state_id: z.number().int().min(1),
  website: z.string().url().max(120).optional(),
});


export const FieldSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().max(100),
  category: z.enum(["Science", "Commerce", "Arts"]),
  description: z.string().max(1000).optional(),
  infographic: z.string().url().optional(),  // e.g. image URL
  roadmap: z.string().url().optional(),
  resources: z.string().optional(), // could be JSON or Markdown
});


export const FieldCollegeMapSchema = z.object({
  field_id: z.number().int().min(1),
  college_id: z.number().int().min(1),
});


export const UserSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().max(80).optional(),
  email: z.string().optional(),
  age: z.coerce.number().int().min(5).max(120).optional(),
  class: z.coerce.number().int().min(1).max(12).optional(),
  city_id: z.coerce.number().int().min(1).optional(),
  state_id: z.coerce.number().int().min(1).optional(),
  created_at: z.date().optional(), // usually generated automatically
});


export const InterestTypeSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().max(40),
});


export const UserInterestSchema = z.object({
  user_id: z.number().int().min(1),
  interest_id: z.number().int().min(1),
});


