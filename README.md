
  

# Full Stack Auth and Register App: Laravel (API) + Next.js (Frontend)

  ## Overview
  

This project consists of:

- Backend: Laravel (API only)

- Frontend: Next.js (React)


## Prerequisites


**Make sure you have installed:**

- PHP ≥ 8.1

- Composer

- Node.js ≥ 18.x

- npm or yarn

- MySQL / PostgreSQL

- Laravel CLI: composer global require laravel/installer

  

## Project Structure

### /backend → Laravel app (API)
Laravel is used strictly for serving APIs 

#### Key Directories

-   `/app/Http/Controllers/Api/`  
    Contains API controllers ( AuthController`, `RegisterController`) for routing business logic.
    
-   `/routes/api.php`  
    All API routes are registered here. They're prefixed with `/api`.
    
-   `/app/Models/`  
    Contains Eloquent models ( User ) .
    
-   `/app/Http/Requests/`  
    Handles validation logic cleanly with Form Request classes ( RegisterRequest ).
    
-   `.env`  
    Handles configuration like DB credentials, mail, etc.
    
#### Design Decisions

 -   API Only: Using `api.php` and returning JSON responses only.
    
 -   Validation: Centralized using Laravel's `FormRequest` classes.
    
 -   Auth: Laravel Sanctum.
    
 -   CORS: Enabled via middleware to allow frontend communication.

### /frontend → Next.js app (UI)

Built with **Next.js** using **React**, featuring:

-   Server-side rendering (SSR) for better SEO
    
-   API integration via `axios` or `fetch`
    
-   Form validation
    
-   Reusable components
    

#### Key Directories

-   `/app/`
    -   `/layout.tsx/` Wraps the entire application providing consistent fonts, styling, layout structure, and global providers.
    -   `/dashboard/page.tsx` – Authenticated user dashboard
    -   `/login/page.tsx` – Login form
    -   `/register/page.tsx` – Register form
-   `/components/`
    
    -   `AuthContext.tsx` – Global context for login state
    -   `AuthContext.tsx` – Wraps all pages with shared UI (header, footer, toast notifications, auth context).    
    -   `ErrorAlert.tsx` – Reusable component for error messages
        
-   `/lib/`
    -   `api.tsx` – API handler functions (`register`, `login` , `logout`)

#### Design Decisions

-   Context API: Used for global auth state and loading indicators.
    
-   Form Handling: Local state (`useState`) for form inputs and errors.
    
-   Reusable Components: `ErrorAlert.tsx` for uniform error handling.
    
-   Validation: Server-driven, catching Laravel’s 422 errors cleanly.
    
-   Styling: Bootstrap 5 with utility classes.

## Setup Project
Clone a repo
```
git clone https://github.com/devbik069/laravel-nextjs-app.git

```
**Setup Backend Server (Laravel API)**

Navigate to Backend

```

cd backend

```

  

** Install Dependencies**

```

composer install

```

** Set Up Environment**

```

cp .env.example .env

php artisan key:generate

```

Edit .env and configure:

```

DB_CONNECTION=mysql

DB_HOST=127.0.0.1

DB_PORT=3306

DB_DATABASE=your_db

DB_USERNAME=your_user

DB_PASSWORD=your_pass

```

** Run Migrations (optional seed)**

```

php artisan migrate --seed

```

**Serve the API**

```

php artisan serve

```

By default: http://127.0.0.1:8000

  

**Set Up Frontend (Next.js)**

**Navigate to Frontend**

```

cd frontend

```

**Install Dependencies**

```

npm install

# or

yarn

```

**Set Up Environment**

  

Create .env.local:

```

NEXT_PUBLIC_API_URL=http://127.0.0.1:8000

```

You can use a proxy or reverse proxy (like Nginx) in production.

**Run the Dev Server**

```

npm run dev

  

# or

  

yarn dev

```

By default: http://127.0.0.1:3000
