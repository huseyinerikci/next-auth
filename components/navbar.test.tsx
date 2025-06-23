import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavBar from "./navbar";
import { SessionProvider, signIn, signOut } from "next-auth/react";

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  return {
    ...originalModule,
    signIn: jest.fn(),
    signOut: jest.fn(),
  };
});

const mockUserSession = {
  user: {
    id: "1",
    name: "Test User",
    email: "test@example.com",
    role: "user",
  },
} as any;

const mockAdminSession = {
  user: {
    id: "2",
    name: "Admin User",
    email: "admin@example.com",
    role: ["admin"],
  },
} as any;

describe("NavBar", () => {
  it("logo metnini renderlar", () => {
    render(
      <SessionProvider session={null}>
        <NavBar />
      </SessionProvider>
    );
    expect(screen.getByText(/Next-Auth/i)).toBeInTheDocument();
  });

  it("giriş yapılmamışken 'Giriş Yap' butonunu gösterir", () => {
    render(
      <SessionProvider session={null}>
        <NavBar />
      </SessionProvider>
    );
    expect(screen.getByText(/Giriş Yap/i)).toBeInTheDocument();
  });

  it("user giriş yapılınca profil ve çıkış butonlarını gösterir", () => {
    render(
      <SessionProvider session={mockUserSession}>
        <NavBar />
      </SessionProvider>
    );
    expect(screen.getByText(/Profil/i)).toBeInTheDocument();
    expect(screen.getByText(/Çıkış/i)).toBeInTheDocument();
    expect(screen.queryByText(/Admin Paneli/i)).not.toBeInTheDocument();
  });

  it("admin kullanıcı için admin paneli butonunu gösterir", () => {
    render(
      <SessionProvider session={mockAdminSession}>
        <NavBar />
      </SessionProvider>
    );
    expect(screen.getByText(/Admin Paneli/i)).toBeInTheDocument();
  });

  it("'Giriş Yap' butonuna tıklanınca signIn fonksiyonunu çağırır", async () => {
    render(
      <SessionProvider session={null}>
        <NavBar />
      </SessionProvider>
    );
    const button = screen.getByText(/Giriş Yap/i);
    await userEvent.click(button);
    expect(signIn).toHaveBeenCalledWith("auth0", {
      authorizationParams: { prompt: "login" },
    });
  });

  it("'Çıkış' butonuna tıklanınca signOut fonksiyonunu çağırır", async () => {
    render(
      <SessionProvider session={mockUserSession}>
        <NavBar />
      </SessionProvider>
    );
    const button = screen.getByText(/Çıkış/i);
    await userEvent.click(button);
    expect(signOut).toHaveBeenCalledWith({ callbackUrl: "/" });
  });

  it("yükleniyor durumunda 'Yükleniyor...' metnini gösterir", () => {
    const nextAuthReact = require("next-auth/react");
    jest.spyOn(nextAuthReact, "useSession").mockReturnValue({
      data: null,
      status: "loading",
      update: jest.fn(),
    });
    render(<NavBar />);
    expect(screen.getByText(/Yükleniyor.../i)).toBeInTheDocument();
  });

  it("user null ise hata vermeden renderlanır", () => {
    render(
      <SessionProvider session={{ user: null } as any}>
        <NavBar />
      </SessionProvider>
    );
    expect(screen.getByText(/Next-Auth/i)).toBeInTheDocument();
  });
});
