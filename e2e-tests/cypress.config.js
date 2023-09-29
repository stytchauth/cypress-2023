const { defineConfig } = require('cypress');
const dotenv = require('dotenv');
const path = require('path');

const envPath = path.join(__dirname, '.env');

console.log('Attempting to apply env vars at', envPath);
const output = dotenv.config({ path: envPath });

if (output.error && output.error.code === 'ENOENT') {
  console.log('Unable to apply', envPath, 'falling back to next opt');
}

const BASE_URL = process.env.BASE_URL;
if (!BASE_URL) {
  throw Error('Missing process.env.BASE_URL');
}

const MAILOSAUR_SERVER_ID = process.env.MAILOSAUR_SERVER_ID;
if (!MAILOSAUR_SERVER_ID) {
  throw Error('Missing process.env.MAILOSAUR_SERVER_ID');
}

const MAILOSAUR_API_KEY = process.env.MAILOSAUR_API_KEY;
if (!MAILOSAUR_API_KEY) {
  throw Error('Missing process.env.MAILOSAUR_API_KEY');
}

const MAILOSAUR_PHONE_NUMBER = process.env.MAILOSAUR_PHONE_NUMBER;
if (!MAILOSAUR_PHONE_NUMBER) {
  throw Error('Missing process.env.MAILOSAUR_PHONE_NUMBER');
}

const CYPRESS_PROJECT_ID = process.env.CYPRESS_PROJECT_ID;
if (!CYPRESS_PROJECT_ID) {
  throw Error('Missing process.env.CYPRESS_MAILOSAUR_PHONE_NUMBER');
}

module.exports = defineConfig({
  e2e: { baseUrl: BASE_URL },
  projectId: CYPRESS_PROJECT_ID,
  includeShadowDom: true,
  env: {
    emailName: 'stytchtesting',
    newEmailSubjectLine: 'Your account creation request for ',
    existingEmailSubjectLine: 'Your login request to ',
    fromEmail: 'login@test.stytch.com',
    MAILOSAUR_SERVER_ID,
    MAILOSAUR_API_KEY,
    MAILOSAUR_PHONE_NUMBER
  }
});
