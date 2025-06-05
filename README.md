# 📘 MathonGo Chapter Tracker — Frontend Assignment

This is a fully responsive **chapter-wise question tracker** built as part of the **Frontend Developer Internship Assignment** for **MathonGo**.

It allows users to filter, sort, and view subject-specific chapters with real-time progress, difficulty indicators, and year-wise performance trends.

---

## 🚀 Live Demo

🔗 [https://mathongo-assignmentrajiv.vercel.app](https://mathongo-assignmentrajiv.vercel.app)

---

## 🛠 Tech Stack

| Tech         | Description                                |
|--------------|--------------------------------------------|
| **Next.js** (App Router) | React framework used for routing and page-based layout |
| **Tailwind CSS** | Utility-first CSS framework |
| **shadcn/ui** | Headless UI library based on Radix for consistent, accessible components |
| **TypeScript** | Type-safe modern JavaScript |
| **Zustand** | Lightweight state management for filters (if used) |
| **next-themes** | Dark/light mode support using system preferences |
| **Phosphor Icons** | Modern icon set used for chapter visuals |

---

## 📁 Folder Structure
/app
└── layout.tsx
└── page.tsx

/components
├── dashboard/
├── dashboard-header.tsx
├── dashboard-content.tsx
├── chapter-grid.tsx
├── chapter-list.tsx
├── filter-bar.tsx
├── ui/
├── badge.tsx
├── card.tsx
├── progress.tsx
├── table.tsx

/context
└── subject-context.tsx

/data
└── chapterData.json

/lib
└── types.ts
└── utils.ts

/tsconfig.json

markdown
Copy
Edit


---

## ✨ Features

- ✅ Filter chapters by **Class**, **Unit**, **Status**, and **Weak Chapters**
- ✅ Toggle between **Grid/List view**
- ✅ Dynamic **trend indicators** (⬆️ or ⬇️ from 2024 → 2025)
- ✅ **Progress bars** with color based on completion
- ✅ **Dark mode** using `next-themes`
- ✅ Icons from **Phosphoricons** assigned to each chapter
- ✅ Fully **responsive UI** (mobile/tablet/desktop)
- ✅ Real-time sorting (alphabetical or by total questions)

---

## 📦 Installation & Setup

1. **Clone the repo**
```bash
git clone https://github.com/iwanturequity/mathongo-assignmentRajiv.git
cd mathongo-assignmentRajiv
