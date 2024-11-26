// models/usertypesmodel.ts
import { Document } from 'mongoose';

export interface IStudent extends Document {
  _id: string;  // Add _id explicitly as part of IStudent
  email: string;
  password: string;
  role: string;
  name?: string;
}

export interface ITeacher extends Document {
  _id: string;  // Add _id explicitly as part of ITeacher
  email: string;
  password: string;
  role: string;
  name?: string;
}
