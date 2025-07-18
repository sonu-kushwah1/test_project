// app/api/student_list/route.ts
import { NextResponse } from 'next/server';

// Mock data
const students = [
  { id: 1, fname: 'Jon', lname: 'Snow', gender: 'Male', class: 'Nursery', section: 'A', address: 'Winterfell', dob: '2010-01-01', phone: '1234567890' },
  // ... more students
];

export async function GET() {
  return NextResponse.json(students);
}
