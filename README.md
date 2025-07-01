# Next.js + Auth0 + NextAuth.js Kimlik Doğrulama ve Yetkilendirme Sistemi

Bu proje, Next.js 14+ (App Router) kullanarak Auth0 üzerinden kullanıcı girişi, JWT tabanlı oturum kontrolü ve rol bazlı yetkilendirme sistemi içeren modern bir kimlik doğrulama uygulamasıdır.

## 🚀 Özellikler

- **Auth0 Entegrasyonu**: OAuth provider olarak Auth0 kullanımı
- **NextAuth.js**: JWT tabanlı oturum yönetimi
- **Rol Bazlı Yetkilendirme**: Admin ve user rolleri ile sayfa erişim kontrolü
- **Middleware Koruması**: Route bazlı oturum ve yetki kontrolü
- **TypeScript**: Tam tip güvenliği
- **TailwindCSS**: Modern UI tasarımı
- **Test Altyapısı**: Jest + Testing Library ile kapsamlı testler
- **SOLID Prensipleri**: Modüler ve sürdürülebilir kod yapısı
- **12Factor App**: Environment-based configuration

## 🛠️ Teknolojiler

- **Next.js 14+** (App Router)
- **Auth0** (OAuth Provider)
- **NextAuth.js** (Authentication)
- **JWT** (JSON Web Token)
- **TypeScript**
- **TailwindCSS**
- **Jest** + **Testing Library**

## Uygulama Önizleme

![next-auth](https://github.com/user-attachments/assets/cefcbf8f-6390-4d6c-bd28-75c404ec7bec)


## 📋 Gereksinimler

- Node.js 18+
- npm veya yarn
- Auth0 hesabı

## 🔧 Kurulum

### 1. Projeyi Klonlayın

```bash
git clone <repository-url>
cd next-auth-copy
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Environment Variables

`.env.local` dosyası oluşturun:

```env
# Auth0 Configuration
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret
AUTH0_ISSUER=https://your-domain.auth0.com

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### 4. Auth0 Kurulumu

1. [Auth0 Dashboard](https://manage.auth0.com/)'a gidin
2. Yeni bir Application oluşturun (Regular Web Applications)
3. Allowed Callback URLs: `http://localhost:3000/api/auth/callback/auth0`
4. Allowed Logout URLs: `http://localhost:3000`
5. Client ID ve Client Secret'ı `.env.local` dosyasına ekleyin

### 5. Uygulamayı Çalıştırın

```bash
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışacaktır.

## 🔐 Kimlik Doğrulama ve Yetkilendirme

### Rol Sistemi

- **user**: Temel kullanıcı yetkileri
- **admin**: Yönetici yetkileri (admin paneline erişim)

### Korumalı Route'lar

- `/admin`: Sadece admin rolüne sahip kullanıcılar
- `/profile`: Giriş yapmış tüm kullanıcılar

## 🧪 Testler

### Test Altyapısı

- **Jest**: Test runner
- **Testing Library**: Component testing
- **ts-jest**: TypeScript/JSX desteği

#### Test Kurulumu

```bash
npm install --save-dev jest ts-jest @types/jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event identity-obj-proxy
```

- `jest.config.js`, `jest.setup.ts` ve `tsconfig.jest.json` dosyalarını eklemeyi unutmayın (örnekler proje kökünde mevcut).

### Testleri Çalıştırma

```bash
npm run test
# veya
npx jest
```

### Test Kapsamı

- **NavBar Component**: UI rendering, user interactions, admin/user ayrımı
- **Auth0 Callbacks**: JWT ve session callback'leri, rol ataması
- **Middleware**: Route protection logic, rol kontrolü

### Test Coverage

Testler, aşağıdaki ana senaryoları kapsar:

- Giriş/çıkış butonları ve admin paneli erişimi
- JWT/session callback'lerinde doğru rol ve token ataması
- Middleware ile korumalı route erişimi ve rol doğrulama
- Yükleniyor ve edge-case UI durumları


