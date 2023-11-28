import MockAdapter from 'axios-mock-adapter';
import UserService from '../services/UserData';
import http from '../http-common';

// Create a new instance of the mock adapter
const mock = new MockAdapter(http);

describe('UserService', () => {
  afterEach(() => {
    mock.reset(); // Reset the mock after each test
  });

  it('should login successfully', async () => {
    // Mock setup
    const username = 'testuser';
    const password = 'testpassword';
    const responseData = { /* Mock response */ };
    mock.onPost('/user/login').reply(200, responseData);

    // Execute test
    const response = await UserService.login(username, password);
    expect(response.status).toBe(200);
  });

  it('should edit user credentials successfully', async () => {
    // Mock setup
    const username = 'testuser';
    const newUsername = 'newtestuser';
    const newPassword = 'newtestpassword';
    const token = 'testtoken';
    const responseData = { /* Mock response */ };
    mock.onPost('/user/editUser').reply(200, responseData);

    // Execute test
    const response = await UserService.editUserCred(username, newUsername, newPassword, token);
    expect(response.status).toBe(200);
  });

  it('should get user by token successfully', async () => {
    // Mock setup
    const token = 'testtoken';
    const responseData = { username: 'testuser' };
    mock.onPost('/user/retrieveToken').reply(200, responseData);

    // Execute test
    const response = await UserService.getUserbyToken(token);
    expect(response).toBe('testuser');
  });
});