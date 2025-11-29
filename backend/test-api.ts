#!/usr/bin/env node

/**
 * Simple API Test Script for MediConnect Backend
 * Tests core endpoints: doctors, appointments, ambulances, queue
 */

const BASE_URL = 'http://localhost:5000';

async function test(name: string, method: string, endpoint: string, body: any = null) {
  try {
    const options: any = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };

    if (body) options.body = JSON.stringify(body);

    const res = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await res.json();

    console.log(`\n✓ ${name}`);
    console.log(`  Status: ${res.status}`);
    console.log(`  Response: ${JSON.stringify(data).substring(0, 150)}...`);
    return data;
  } catch (error: any) {
    console.log(`\n✗ ${name}`);
    console.log(`  Error: ${error.message}`);
    return null;
  }
}

async function runTests() {
  console.log('🧪 MediConnect API Tests\n');

  // Test 1: Get all doctors
  console.log('--- Doctors Endpoint ---');
  const doctors = await test('GET /api/doctors', 'GET', '/api/doctors');

  // Test 2: Get specific doctor (if doctors exist)
  if (doctors && doctors.length > 0) {
    const doctorId = doctors[0].id;
    await test(`GET /api/doctors/${doctorId}`, 'GET', `/api/doctors/${doctorId}`);
  }

  // Test 3: Get ambulances near location
  console.log('\n--- Emergency/Ambulances Endpoint ---');
  await test('GET /api/emergency/nearby (Dhaka coords)', 'GET', '/api/emergency/nearby?lat=23.8103&lng=90.4125');

  // Test 4: Queue status (requires doctor ID)
  if (doctors && doctors.length > 0) {
    const doctorId = doctors[0].id;
    console.log('\n--- Queue Endpoint ---');
    await test(`GET /api/queue/${doctorId}`, 'GET', `/api/queue/${doctorId}`);
  }

  console.log('\n✅ Tests complete!\n');
  console.log('To test authenticated endpoints (appointments), you will need to:');
  console.log('1. Call a login endpoint (if implemented) to get JWT token');
  console.log('2. Pass token in Authorization header: Authorization: Bearer <token>');
  console.log('\nTest credentials for reference:');
  console.log('  Patient: john@patient.com / password123');
  console.log('  Doctor:  ahmed@mediconnect.com / password123');
}

runTests().catch(console.error);
