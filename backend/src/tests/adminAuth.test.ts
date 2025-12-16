import { test } from 'node:test';
import assert from 'node:assert/strict';

const setEnvCreds = (login: string, password: string) => {
  process.env.ADMIN_LOGIN = login;
  process.env.ADMIN_PASSWORD = password;
};

const loadAuth = async () => {
  const { config } = await import('../config/env.js');
  config.admin.login = process.env.ADMIN_LOGIN || 'admin';
  config.admin.password = process.env.ADMIN_PASSWORD || 'admin123';
  const { adminAuth } = await import('../middleware/adminAuth.js');
  return adminAuth;
};

const createMock = () => {
  const res: any = {
    statusCode: 200,
    body: null as any,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(payload: any) {
      this.body = payload;
      return this;
    },
  };
  let nextCalled = false;
  const next = () => {
    nextCalled = true;
  };
  return { res, next, nextCalledRef: () => nextCalled };
};

test('adminAuth rejects missing auth header', async () => {
  setEnvCreds('admin', 'secret');
  const adminAuth = await loadAuth();
  const { res, next, nextCalledRef } = createMock();

  await adminAuth({ headers: {} } as any, res as any, next);

  assert.equal(res.statusCode, 401);
  assert.deepEqual(res.body, {
    error: 'Unauthorized',
    message: 'Admin credentials required',
  });
  assert.equal(nextCalledRef(), false);
});

test('adminAuth allows valid basic credentials', async () => {
  setEnvCreds('user1', 'pwd1');
  const adminAuth = await loadAuth();
  const { res, next, nextCalledRef } = createMock();

  const header = 'Basic ' + Buffer.from('user1:pwd1').toString('base64');

  await adminAuth({ headers: { authorization: header } } as any, res as any, next);

  assert.equal(res.statusCode, 200);
  assert.equal(res.body, null);
  assert.equal(nextCalledRef(), true);
});
