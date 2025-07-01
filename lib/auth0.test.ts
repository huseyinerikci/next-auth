import { authOptions } from "./auth0";

describe("auth0 callback fonksiyonları", () => {
  it("jwt callback accessToken, id ve role atar", async () => {
    const token = {};
    const account = { access_token: "abc123" };
    const user = { id: "user1" };
    const profile = { "https://next-auth.example.com/roles": "admin" };

    const result = await authOptions.callbacks!.jwt!({
      token,
      account,
      user,
      profile,
    } as any);
    expect(result.accessToken).toBe("abc123");
    expect(result.id).toBe("user1");
    expect(result.role).toBe("admin");
  });

  it("session callback user.id, accessToken ve role atar", async () => {
    const session = { user: {} } as any;
    const token = { id: "user1", accessToken: "abc123", role: "admin" };
    const result = await authOptions.callbacks!.session!({
      session,
      token,
    } as any);
    expect(result.user && (result.user as any).id).toBe("user1");
    expect((result as any).accessToken).toBe("abc123");
    expect(result.user && (result.user as any).role).toBe("admin");
  });

  it("profile'da rol yoksa default olarak 'user' atanır", async () => {
    const token = {};
    const account = { access_token: "abc123" };
    const user = { id: "user1" };
    const profile = {};

    const result = await authOptions.callbacks!.jwt!({
      token,
      account,
      user,
      profile,
    } as any);
    expect(result.role).toBe("user");
  });

  it("profile veya account eksikse role set edilmez", async () => {
    const token = {};
    const result = await authOptions.callbacks!.jwt!({
      token,
      account: undefined,
      user: undefined,
      profile: undefined,
    } as any);
    expect(result.role).toBeUndefined();
  });
});
