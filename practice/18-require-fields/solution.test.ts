import { test, assert, summary } from "../_helpers/test";
import { requireFields, Req, Res } from "./solution";

function makeRes() {
  const calls: { status?: number; json?: any } = {};
  const res: Res = {
    status(code: number) {
      calls.status = code;
      return res;
    },
    json(body: any) {
      calls.json = body;
    },
  };
  return { res, calls };
}

async function main() {
  await test("llama a next cuando todos los campos estan presentes", () => {
    const middleware = requireFields(["name", "email"]);
    const req: Req = { body: { name: "Jose", email: "j@x.com" } };
    const { res, calls } = makeRes();
    let nextCalled = false;

    middleware(req, res, () => {
      nextCalled = true;
    });

    assert.equal(nextCalled, true);
    assert.equal(calls.status, undefined);
  });

  await test("responde 400 con los campos faltantes", () => {
    const middleware = requireFields(["name", "email"]);
    const req: Req = { body: { name: "Jose" } };
    const { res, calls } = makeRes();
    let nextCalled = false;

    middleware(req, res, () => {
      nextCalled = true;
    });

    assert.equal(nextCalled, false);
    assert.equal(calls.status, 400);
    assert.deepEqual(calls.json, { missingFields: ["email"] });
  });

  await test("string vacio cuenta como faltante", () => {
    const middleware = requireFields(["name"]);
    const req: Req = { body: { name: "" } };
    const { res, calls } = makeRes();

    middleware(req, res, () => {});

    assert.deepEqual(calls.json, { missingFields: ["name"] });
  });

  await test("0 y false no cuentan como faltantes", () => {
    const middleware = requireFields(["count", "active"]);
    const req: Req = { body: { count: 0, active: false } };
    const { res } = makeRes();
    let nextCalled = false;

    middleware(req, res, () => {
      nextCalled = true;
    });

    assert.equal(nextCalled, true);
  });

  await test("fields vacio siempre llama next", () => {
    const middleware = requireFields([]);
    const req: Req = { body: {} };
    const { res } = makeRes();
    let nextCalled = false;

    middleware(req, res, () => {
      nextCalled = true;
    });

    assert.equal(nextCalled, true);
  });

  summary();
}

main();
