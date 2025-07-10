# 📝 Prompt Template Web Page – Requirements Document

## 📌 Overview

Create a **responsive single-page web application** (no login required) where users can:

- Upload or add prompt templates containing placeholders like `{today}` or `{input}`
- View a list of all saved prompts
- Click a **“Copy”** button to:
  - Replace `{today}` with the current date in format: `4 July 2025`
  - Replace `{input}` with custom user input (entered via popup)
  - Copy the fully processed prompt to clipboard

The page should work well on **both mobile and desktop devices**, using **Tailwind CSS** for responsive design.

---

## ⚙️ Functional Requirements

### 1. Prompt Template Management

- Interface to add new prompt templates (e.g., via a textarea input + “Add” button)
- Each prompt can contain special tags:
  - `{today}` – replaced with current date in format `D MMMM YYYY`
  - `{input}` – replaced with user input via modal/popup

### 2. Prompt Display

- Display all added prompts in a scrollable list
- Each prompt entry includes:
  - The template text (full width on mobile)
  - A **“Copy” button**

### 3. Copy to Clipboard with Tag Replacement

- On clicking the **“Copy”** button:
  - Replace `{today}` automatically with current date
  - Detect number of `{input}` tags and ask for those many inputs in a popup/modal
    - Support multiple inputs in one prompt
  - After user enters input(s), clicking **“Complete & Copy”** will:
    - Replace all `{input}` tags
    - Copy the final text to clipboard

### 4. Data Persistence

- Store templates in **`localStorage`** so that they persist between page reloads

---

## 🖥️ Tech Stack

- **HTML + JavaScript** (Vanilla JS)
- **Tailwind CSS** for styling and responsive UI
- PHP for save prompts in JSON format and Read from JSON for show.
- Fully responsive layout (mobile-first design)

---

## ✅ Optional Features (Not Required in MVP)

- Allow custom label in `{input:Your Label}` for user-friendly input prompts
- Delete prompt feature
- Import/Export prompts to/from JSON

---

## 📅 Example Prompt Workflow

**Template Stored:**
Dear {input}, your meeting is scheduled for {today}.

**User clicks “Copy”:**
- `{today}` becomes → `4 July 2025`
- Prompted to enter value for `{input}` → `Rahul`
- Final copied text:

Dear Rahul, your meeting is scheduled for 4 July 2025.

---

## 📱 Responsiveness

- Use TailwindCSS breakpoints to ensure:
  - Prompts and controls stack vertically on small screens
  - Side-by-side layout on larger screens
  - Modal/popups work smoothly across screen sizes

---

## 🧪 Testing Guidelines

- Add multiple prompts and verify tag replacements
- Test behavior with multiple `{input}` tags
- Reload the page and ensure prompts persist
- Copy final result and verify clipboard contents
- Test responsiveness on mobile and desktop browsers

---

