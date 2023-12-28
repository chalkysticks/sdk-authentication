import test from 'node:test';
import assert from 'node:assert/strict';
import { Model } from '../src';
import userModel from './data/user';

test('hello', () => {
	const message = 'Hello';
	assert.equal(message, 'Hello', 'checking the greeting');
});

test('User - Local should have a name', () => {
	assert.equal(userModel.getName(), 'Matt Kenefick');
});

test('Auth - Local', () => {
	const auth: Model.Authentication = new Model.Authentication({
		jwt: {
			token: 'MzM.PihJqt-z_xSrRbfWu_cKaCwriOfGZGxJ-AyE1UAEEuOm2sfXYOlLDMDi8S4u',
			type: 'bearer',
		},
		user: {
			created_at: '2021-06-15T11:53:28.000-04:00',
			email: 'roger@chalkysticks.com',
			id: 1,
			latitude: null,
			longitude: null,
			name: 'Billie Joe',
			permissions: 0,
			phone: null,
			slug: 'billie-joe',
			status: 0,
			updated_at: '2021-06-15T14:17:59.000-04:00',
		},
	});

	assert.equal(auth.jwt.getType(), 'bearer');
	assert.equal(auth.user.getEmail(), 'roger@chalkysticks.com');
});
