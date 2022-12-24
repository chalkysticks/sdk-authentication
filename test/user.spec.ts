import { expect } from 'chai';
import ModelAuthentication from '../src/Model/Authentication';
import userModel from './data/user';

/**
  ┌────────────────────────────────────────────────────────────────────────────┐
  │                                                                            │
  │ Local tests                                                                │
  │                                                                            │
  └────────────────────────────────────────────────────────────────────────────┘
*/

describe('User - Local', () => {
	it('should have a name', () => {
		expect(userModel.getName()).to.equal('Matt Kenefick');
	});
});

describe('Auth - Local', () => {
	it('should have jwt relationships', () => {
		const auth: ModelAuthentication = new ModelAuthentication({
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

		expect(auth.jwt.getType()).to.equal('bearer');
		expect(auth.user.getEmail()).to.equal('roger@chalkysticks.com');
	});
});
