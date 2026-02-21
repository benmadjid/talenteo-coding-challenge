# Talenteo Coding Challenge — Employee CRUD

This repository is my submission for the **Frontend Developer** coding challenge at Talenteo. It implements a full **Employee CRUD** (Create, Read, Update, Delete) feature on top of the forked base ([bilalbentoumi/talenteo-coding-challenge](https://github.com/bilalbentoumi/talenteo-coding-challenge)).

---

## Challenge objective

- Implement an **Employee CRUD** feature.
- **Route:** `/employees` for the Employee List page.
- **Table columns:** Name (Avatar + Full name), Registration number, Email, Date of birth, Gender, Job title, Department, Actions (Edit/Delete).
- **Add Employee:** modal form.
- **Edit Employee:** modal with prefilled form.
- **Delete Employee:** confirmation dialog.
- Use **shadcn/ui** where appropriate.

---

## What was implemented

All required behaviors are in place:

| Requirement | Implementation |
|-------------|----------------|
| **Route `/employees`** | TanStack Router route with `EmployeesView` as the page component. |
| **Employee list** | Data table with the requested columns (Avatar + name, registration number, email, DOB, gender, job title, department, actions). |
| **Add Employee** | Add flow via a **Drawer** (shadcn-style) opened from the toolbar; form uses React Hook Form + Zod. |
| **Edit Employee** | Edit flow via a **Drawer** opened from the row actions; form is prefilled with the selected employee. |
| **Delete Employee** | **Dialog** with confirmation message and destructive action. |

Additional behavior:

- **Search:** debounced search input that filters the list (via API params when the mock API supports it).
- **Loading & error states:** table shows loading and error states from TanStack Query.
- **Toasts:** success/error feedback for create, update, and delete (Sonner + shadcn).
- **Responsive Add/Edit:** Drawer opens from the right on desktop and from the bottom on mobile (Vaul drawer).
- **Column visibility:** toolbar toggle to show/hide columns.
- **Row selection:** optional selection with checkboxes for future bulk actions.

---

## Architecture and tech stack

### High-level architecture

The app is structured with a **feature-based vertical slice** approach:

- **Features** own their UI, data fetching, local state, types, and API calls.
- **Shared** code lives in `components/`, `hooks/`, `lib/`, and `types/`.

So the Employee feature is self-contained under `src/features/employees/` and does not depend on other domains.

### Main layers (Employee feature)

1. **Services** (`services/employee-service.ts`)  
   - Plain async functions using a shared Axios instance.  
   - No React; only HTTP (GET list, GET by id, POST, PUT, DELETE).  
   - Typed with `Employee`, `CreateEmployeeDto`, `UpdateEmployeeDto`, `EmployeeFilters`.  
   - 404 from the mock API is treated as an empty list.

2. **Data (server state)** (`data/`)  
   - **TanStack Query** for list and detail: `useEmployees(filters)`, `useEmployee(id)`.  
   - **Mutations:** `useCreateEmployee`, `useUpdateEmployee`, `useDeleteEmployee` with cache invalidation and toasts.  
   - **Query keys** centralized in `keys.ts` for consistent invalidation (e.g. after create/update/delete).

3. **Client state** (`store/useEmployeeStore.ts`)  
   - **Zustand** store for: list filters (page, limit, search), search input, table state (sorting, column visibility, pagination, row selection), and “Add” modal open state.  
   - Components use `useShallow` when subscribing to avoid unnecessary re-renders.

4. **UI**  
   - **Pages/views:** `EmployeesView` (and `EmployeesPage`) wires the feature: toolbar, table, and modals.  
   - **Table:** `DataTable` + `columns` (TanStack Table), with Avatar, Badges, dropdown actions (Edit/Delete).  
   - **Forms:** shared `EmployeeForm` (React Hook Form + Zod via `employee-schema`), used in Add and Edit drawers.  
   - **Modals:** Add and Edit use **Drawer** (Vaul); Delete uses **Dialog** (shadcn).  
   - **Toolbar:** search, “Add employee” button, column visibility.  
   - **Types:** `Employee`, DTOs, and filters in `types/employee.ts`; form schema in `schemas/employee-schema.ts`.

### Global app setup (since base commit)

- **Routing:** TanStack Router with a root layout and an `_app` layout that wraps `/documents` and `/employees`.
- **Layout:** Dashboard layout (sidebar + header + outlet) with the Add Employee drawer state and modal rendered at layout level so it can be opened from the sidebar or toolbar.
- **Data & API:**  
  - TanStack Query `QueryClientProvider` and optional devtools.  
  - Axios instance in `lib/axios.ts` with `baseURL` from `VITE_API_URL`.
- **Shared hooks:** e.g. `useDebounce` for search input.
- **Documents:** existing documents feature moved under `features/documents/` for consistency.

### Libraries

- **React 19**, **TypeScript**, **Vite**
- **TanStack** Router, Query, Table
- **Zustand** (client state)
- **React Hook Form** + **Zod** + **@hookform/resolvers** (forms and validation)
- **Axios** (HTTP)
- **shadcn/ui** (Button, Dialog, Drawer/Vaul, Form, Input, Select, etc.)
- **Sonner** (toasts)
- **Tabler Icons**

---

## Running the project

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Configure the API**

   Create a `.env` (or `.env.local`) with the mock API base URL:

   ```env
   VITE_API_URL=https://your-mock-api-base-url
   ```

   The app expects this variable; see the challenge’s [API documentation](https://github.com/bilalbentoumi/talenteo-coding-challenge/blob/master/API.md) for the correct base URL and endpoints.

3. **Run the app**

   ```bash
   pnpm dev
   ```

4. **Build**

   ```bash
   pnpm build
   ```

5. **Lint**

   ```bash
   pnpm lint
   ```

---

## Summary of changes since base commit (`68c2c30`)

- **Routing & layout:** TanStack Router, `_app` layout, `/employees` route, dashboard layout with sidebar and Add Employee drawer.
- **Employee feature:** full CRUD with service layer, TanStack Query (queries + mutations), Zustand store, list + search + table (with columns as required), Add/Edit drawers, Delete confirmation dialog, loading and error states, and toasts.
- **Reuse of shadcn/ui:** Dialog, Drawer (Vaul), Form, inputs, buttons, table primitives, dropdowns, etc.
- **Code organization:** feature-based structure, shared hooks (`useDebounce`), centralized API (Axios) and query keys, typed DTOs and filters.

---

**Author:** Abdelmadjid  
**Challenge:** Talenteo Frontend Developer — Employee CRUD  
**Base:** [talenteo-coding-challenge](https://github.com/bilalbentoumi/talenteo-coding-challenge) 
