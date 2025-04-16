
# Project Name

## Table of Contents

1. [Overview](#overview)
2. [Folder Structure](#folder-structure)
3. [Components](#components)
4. [Lib](#lib)
5. [Services](#services)
6. [UI](#ui)
7. [How to Run](#how-to-run)

---

## Overview

This project is a web application that includes various components and utilities built using **React**, **ShadCN**, **TypeScript**, and other modern web technologies. It includes functionality such as authentication, user interfaces, API actions, and server utilities for managing and processing data.

---

## Folder Structure

The file structure for this project is organized as follows:

```
.
├── app
│   ├── components
│   │   ├── admin
│   │   │   ├── dialogs
│   │   │   │   └── display
│   │   │   └── forms
│   │   ├── auth
│   │   │   ├── login
│   │   │   └── register
│   │   ├── ui
│   │   │   └── (ShadCN components)
│   │   └── common
│   │       ├── AppDialog
│   │       └── GenericFormDialog
├── lib
│   ├── actions
│   ├── contexts
│   ├── schemas
│   │   └── (Zod schemas)
│   ├── types
│   │   └── (API types and more)
│   ├── services
│   │   └── (API actions)
│   ├── serverUtils.ts
│   └── utils.ts
└── services
    └── utils.ts
```

---

## Components

### `app/components`
This folder contains all the UI components used in the project, categorized into various subfolders:

1. **`admin`**: Contains components related to the admin interface, including dialogs and form handling for admin-related tasks.
   - `dialogs`: Displays dialog components related to admin tasks.
   - `forms`: Contains forms for different actions within the admin interface.

2. **`auth`**: Contains components related to authentication.
   - `login`: Login form for user authentication.
   - `register`: Registration form for creating new accounts.

3. **`ui`**: This folder contains UI components built using the **ShadCN** library. These are highly reusable components that form the basic building blocks of the user interface.

4. **`common`**: Contains generic components shared across the app:
   - `AppDialog`: A common dialog box used for different actions in the app.
   - `GenericFormDialog`: A reusable form dialog for different contexts.

---

## Lib

### `lib`
The `lib` folder contains utility functions, types, and actions that provide backend logic and frontend helpers for the app.

1. **`actions`**: Contains functions that define interactions with external APIs or databases.
2. **`contexts`**: Holds React contexts used to manage global states, such as user authentication state or other app-wide settings.
3. **`schemas`**: Defines the structure of data using **Zod** schemas, which are used to validate inputs and API responses.
4. **`types`**: Contains type definitions for API responses, component props, and more.
5. **`services`**: Houses functions that interact with external services or APIs. 
6. **`serverUtils.ts`**: Contains server-side utility functions that may be used for server-side logic or API interactions.
7. **`utils.ts`**: General utility functions, such as reusable functions for handling data or interacting with APIs.

---

## Services

### `services/utils.ts`
This file contains reusable utility functions that can be used throughout the project, including but not limited to:
- `getResource<T>`: A function to retrieve resources from the API.

---

## UI (ShadCN)

The **UI** folder contains components based on the **ShadCN** UI library, offering a collection of common UI elements like buttons, inputs, and modals that have been customized to fit the project’s design.

---

## How to Run

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
4. Set up your environment variables in a .env file:
   ```env
   API_URL=http://localhost:8000/api
   ```
5. Visit the app in your browser at `http://localhost:3000`.

---
