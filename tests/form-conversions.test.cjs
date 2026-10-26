const { test } = require("node:test");
const assert = require("node:assert/strict");
const ts = require("typescript");
const fs = require("node:fs");
const vm = require("node:vm");

function load() {
  const output = ts.transpileModule(fs.readFileSync("lib/deliver-application.ts", "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const exports = {};
  vm.runInNewContext(output, { exports, fetch: (...args) => global.fetch(...args) });
  return exports.deliverApplication;
}

test("an accepted application is delivered once", async () => {
  const deliver = load();
  let calls = 0;
  global.fetch = async () => {
    calls += 1;
    return { ok: true, json: async () => ({ success: true, message: "Email sent successfully!" }) };
  };
  const data = new FormData();
  data.set("name", "Test");
  data.set("business_name", "PLEASE IGNORE");
  data.set("email", "owner@example.com");
  const result = await deliver(data, "test-key");
  assert.equal(result.ok, true);
  assert.equal(calls, 1);
  assert.equal(data.get("access_key"), "test-key");
  assert.equal(data.get("subject"), "New application — PLEASE IGNORE");
});

test("a rejected application is not treated as sent", async () => {
  const deliver = load();
  global.fetch = async () => ({ ok: false, json: async () => ({ success: false, message: "Invalid access key" }) });
  const result = await load()(new FormData(), "test-key");
  assert.equal(result.ok, false);
  assert.match(result.message, /Invalid access key/);
});

test("a filled honeypot is not delivered", async () => {
  const deliver = load();
  let calls = 0;
  global.fetch = async () => {
    calls += 1;
    return { ok: true, json: async () => ({ success: true }) };
  };
  const data = new FormData();
  data.set("botcheck", "on");
  const result = await deliver(data, "test-key");
  assert.equal(result.ok, true);
  assert.equal(calls, 0);
});
