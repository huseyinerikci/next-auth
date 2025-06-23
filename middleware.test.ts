/**
 * @jest-environment node
 */
// @ts-ignore
const Request = require("next/dist/server/web/spec-extension/request").Request;
// @ts-ignore
const Response =
  require("next/dist/server/web/spec-extension/response").Response;

(global as any).Request = Request;
(global as any).Response = Response;

import { middleware } from "./middleware";
import { NextRequest } from "next/server";

const mockRedirect = jest.fn();
jest.mock("next/server", () => ({
  ...jest.requireActual("next/server"),
  NextResponse: {
    redirect: (...args: any[]) => mockRedirect(...args),
    next: jest.fn(() => "next"),
  },
}));

function createRequest(path: string, token: any = null) {
  return {
    nextUrl: {
      pathname: path,
      origin: "http://localhost",
      href: "http://localhost" + path,
    },
    url: "http://localhost" + path,
    cookies: {},
    headers: {},
    clone: () => ({}),
    [Symbol.asyncIterator]: jest.fn(),
    ...(token && { token }),
  } as unknown as NextRequest;
}

jest.mock("next-auth/jwt", () => ({
  getToken: jest.fn(),
}));

const { getToken } = require("next-auth/jwt");

describe("middleware", () => {
  beforeEach(() => {
    mockRedirect.mockClear();
    getToken.mockClear();
  });

  it("token yoksa korumalı sayfaya erişim engellenir", async () => {
    getToken.mockResolvedValue(null);
    const req = createRequest("/profile");
    await middleware(req);
    expect(mockRedirect).toHaveBeenCalled();
  });

  it("token varsa profile'a erişim sağlanır", async () => {
    getToken.mockResolvedValue({ role: "user" });
    const req = createRequest("/profile");
    const result = await middleware(req);
    expect(result).toBe("next");
  });

  it("token'da role 'user' ise admin sayfasına erişim engellenir", async () => {
    getToken.mockResolvedValue({ role: "user" });
    const req = createRequest("/admin");
    await middleware(req);
    expect(mockRedirect).toHaveBeenCalled();
  });

  it("token'da role 'admin' ise admin sayfasına erişim sağlanır", async () => {
    getToken.mockResolvedValue({ role: "admin" });
    const req = createRequest("/admin");
    const result = await middleware(req);
    expect(result).toBe("next");
  });

  it("token'da role yoksa veya beklenmeyen bir role varsa admin sayfasına erişim engellenir", async () => {
    getToken.mockResolvedValue({});
    const req1 = createRequest("/admin");
    await middleware(req1);
    expect(mockRedirect).toHaveBeenCalled();

    getToken.mockResolvedValue({ role: "editor" });
    const req2 = createRequest("/admin");
    await middleware(req2);
    expect(mockRedirect).toHaveBeenCalled();
  });
});
