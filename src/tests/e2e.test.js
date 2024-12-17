require('dotenv').config({ path: '.env.test' });
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { User, Availability, Appointment } = require('../models');

let studentTokenA1, studentTokenA2, professorToken;


beforeAll(async () => {
    const mongoURI = process.env.DB_TEST_URI;
    await mongoose.connect(mongoURI);

    await User.deleteMany({});
    await Availability.deleteMany({});
    await Appointment.deleteMany({});
});

describe('End-to-End Tests for Appointment System', () => {
    test('Student A1 authenticates to access the system', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                name: 'studentA1',
                email: 'studentA1@test.com',
                password: 'password123',
                role: 'student',
            })
            .expect(201);

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'studentA1@test.com',
                password: 'password123',
            })
            .expect(200);

        studentTokenA1 = response.body.token;
        expect(studentTokenA1).toBeDefined();
    });

    test('Professor P1 authenticates to access the system', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                name: 'professorP1',
                email: 'professorP1@test.com',
                password: 'password123',
                role: 'professor',
            })
            .expect(201);

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'professorP1@test.com',
                password: 'password123',
            })
            .expect(200);

        professorToken = response.body.token;
        expect(professorToken).toBeDefined();
    });

    test('Professor P1 specifies which time slots he is free for appointments', async () => {
        const response = await request(app)
            .post('/api/availability')
            .set('Authorization', `Bearer ${professorToken}`)
            .send({
                startTime: '2024-12-16T09:00:00.000Z',
                endTime: '2024-12-16T10:00:00.000Z',
            })
            .expect(201);

        expect(response.body).toHaveProperty('_id');
        expect(response.body.professorId).toBeDefined();
    });

    test('Student A1 views available time slots for Professor P1', async () => {
        const professor = await User.findOne({ email: 'professorP1@test.com' });

        const response = await request(app)
            .get(`/api/availability/${professor._id}`)
            .set('Authorization', `Bearer ${studentTokenA1}`)
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].startTime).toBe('2024-12-16T09:00:00.000Z');
    });

    test('Student A1 books an appointment with Professor P1 for time T1', async () => {
        const professor = await User.findOne({ email: 'professorP1@test.com' });

        const response = await request(app)
            .post('/api/appointments')
            .set('Authorization', `Bearer ${studentTokenA1}`)
            .send({
                professorId: professor._id,
                startTime: '2024-12-16T09:00:00.000Z',
            })
            .expect(201);

        expect(response.body).toHaveProperty('_id');
        expect(response.body.studentId).toBeDefined();
    });

    test('Student A2 authenticates to access the system', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                name: 'studentA2',
                email: 'studentA2@test.com',
                password: 'password123',
                role: 'student',
            })
            .expect(201);

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'studentA2@test.com',
                password: 'password123',
            })
            .expect(200);

        studentTokenA2 = response.body.token;
        expect(studentTokenA2).toBeDefined();
    });

    test('Student A2 books an appointment with Professor P1 for time T2', async () => {
        const professor = await User.findOne({ email: 'professorP1@test.com' });

        await Availability.create({
            professorId: professor._id,
            startTime: '2024-12-16T16:30:00.000Z',
            endTime: '2024-12-16T17:30:00.000Z'
        });

        const response = await request(app)
            .post('/api/appointments')
            .set('Authorization', `Bearer ${studentTokenA2}`)
            .send({
                professorId: professor._id,
                startTime: '2024-12-16T16:30:00.000Z'
            })
            .expect(201);

        expect(response.body).toHaveProperty('_id');
        expect(response.body.studentId).toBeDefined();
        expect(response.body.professorId).toEqual(professor._id.toString());
        expect(new Date(response.body.startTime).toISOString()).toBe('2024-12-16T16:30:00.000Z');
    });

    test('Professor P1 cancels the appointment with Student A1', async () => {
        const student = await User.findOne({ email: 'studentA1@test.com' });
        const appointment = await Appointment.findOne({ studentId: student._id });

        const response = await request(app)
            .delete(`/api/appointments/${appointment._id}`)
            .set('Authorization', `Bearer ${professorToken}`)
            .expect(200);

        expect(response.body.message).toBe('Appointment canceled successfully');
    });

    test('Student A1 checks their appointments and realizes they do not have any pending appointments', async () => {
        const response = await request(app)
            .get('/api/appointments')
            .set('Authorization', `Bearer ${studentTokenA1}`)
            .expect(200);

        expect(response.body.length).toBe(0);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
