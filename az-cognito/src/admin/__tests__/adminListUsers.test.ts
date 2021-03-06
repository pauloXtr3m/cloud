import { adminListUsers } from '../adminListUsers';

const fakePromise = {
  promise: jest.fn(),
};

jest.mock('aws-sdk', () => ({
  CognitoIdentityServiceProvider: jest.fn(() => ({
    listUsers: () => fakePromise,
  })),
}));

const POOL_ID = 'us-east-1_asdfsa8';
const EMAIL = 'bender.rodriguez@futurama.space';

const response1 = {
  Users: [
    {
      Username: 'd3112a30343c3-3846495e5-5a5d505d51ed',
      Attributes: [
        { Name: 'sub', Value: 'd3313a40444cd-d8f6f9fed-3a3d4044d1ed' },
        { Name: 'email_verified', Value: 'true' },
        { Name: 'email', Value: EMAIL },
      ],
      UserCreateDate: '2019-07-05T21:37:16.934Z',
      UserLastModifiedDate: '2019-07-05T21:37:16.934Z',
      Enabled: true,
      UserStatus: 'FORCE_CHANGE_PASSWORD',
    },
  ],
};

describe('adminListUsers', () => {
  it('should return users', async () => {
    fakePromise.promise.mockImplementationOnce(() => Promise.resolve(response1));
    const res = await adminListUsers(POOL_ID);
    expect(res).toEqual([
      {
        Username: 'd3112a30343c3-3846495e5-5a5d505d51ed',
        UserCreateDate: '2019-07-05T21:37:16.934Z',
        UserLastModifiedDate: '2019-07-05T21:37:16.934Z',
        Enabled: true,
        UserStatus: 'FORCE_CHANGE_PASSWORD',
        Data: {
          sub: 'd3313a40444cd-d8f6f9fed-3a3d4044d1ed',
          email_verified: 'true',
          email: EMAIL,
        },
      },
    ]);
  });
});
