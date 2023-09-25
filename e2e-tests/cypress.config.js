const { defineConfig } = require("cypress");
const dotenv = require("dotenv");

const path = ".env";

console.log("Attempting to apply env vars at", path);
const output = dotenv.config({ path });
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (output.error && output.error.code === "ENOENT") {
  // eslint-disable-next-line no-console
  console.log("Unable to apply", path, "falling back to next opt");
}

const baseUrl = process.env.CYPRESS_BASE_URL;
if (!baseUrl) {
  throw Error("Missing process.env.CYPRESS_BASE_URL");
}

const MAILOSAUR_SERVER_ID = process.env.CYPRESS_MAILOSAUR_SERVER_ID;
if (!MAILOSAUR_SERVER_ID) {
  throw Error("Missing process.env.CYPRESS_MAILOSAUR_SERVER_ID");
}

const MAILOSAUR_API_KEY = process.env.CYPRESS_MAILOSAUR_API_KEY;
if (!MAILOSAUR_API_KEY) {
  throw Error("Missing process.env.CYPRESS_MAILOSAUR_API_KEY");
}

const MAILOSAUR_PHONE_NUMBER = process.env.CYPRESS_MAILOSAUR_PHONE_NUMBER;
if (!MAILOSAUR_PHONE_NUMBER) {
  throw Error("Missing process.env.CYPRESS_MAILOSAUR_PHONE_NUMBER");
}

const CYPRESS_PROJECT_ID = process.env.CYPRESS_PROJECT_ID;
if (!CYPRESS_PROJECT_ID) {
  throw Error("Missing process.env.CYPRESS_MAILOSAUR_PHONE_NUMBER");
}

module.exports = defineConfig({
  e2e: { baseUrl },
  projectId: CYPRESS_PROJECT_ID,
  includeShadowDom: true,
  env: {
    emailName: "stytchtesting",
    newEmailSubjectLine: "Your account creation request for ",
    existingEmailSubjectLine: "Your login request to ",
    fromEmail: "login@test.stytch.com",
    MAILOSAUR_SERVER_ID,
    MAILOSAUR_API_KEY,
    MAILOSAUR_PHONE_NUMBER,
  },
});
