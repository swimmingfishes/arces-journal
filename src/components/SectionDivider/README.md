# SectionDivider Component

Komponen modular untuk menampilkan divider header section dengan styling yang konsisten di seluruh aplikasi.

## Usage

```tsx
import { SectionDivider } from '@/components/SectionDivider'

// Basic usage
<SectionDivider title="Section Title" />

// With custom title className
<SectionDivider
  title="Custom Styled Title"
  titleClassName="text-3xl font-extrabold"
/>

// With custom container className
<SectionDivider
  title="Full Width"
  containerClassName="px-4 py-4"
/>

// With React Node as title
<SectionDivider
  title={<span>Title with <em>emphasis</em></span>}
/>
```

## Props

| Prop                 | Type                        | Default     | Description                                           |
| -------------------- | --------------------------- | ----------- | ----------------------------------------------------- |
| `title`              | `string \| React.ReactNode` | Required    | Konten title yang ditampilkan                         |
| `className`          | `string`                    | `undefined` | Class tambahan untuk container (merge dengan default) |
| `containerClassName` | `string`                    | `undefined` | Class untuk override container secara keseluruhan     |
| `titleClassName`     | `string`                    | `undefined` | Class untuk customize title text                      |

## Default Styling

- **Container**: `px-8 py-6 border-b bg-zinc-50/30 dark:bg-zinc-900/10`
- **Title**: `text-2xl font-bold text-primary` (yang mana di light mode = amber, dark mode = blue)

## Color Token

Komponen menggunakan `text-primary` yang secara otomatis beradaptasi dengan mode:

- **Light Mode**: Amber/Yellow (`oklch(0.84 0.17 85deg)`)
- **Dark Mode**: Blue (`oklch(48.8% 0.243 264.376deg)`)

## Example: Tentang Page

```tsx
import { SectionDivider } from '@/components/SectionDivider'

export function TentangPage() {
  return (
    <>
      <SectionDivider title="Sejarah" />
      {/* Content */}

      <SectionDivider title="Visi & Misi" />
      {/* Content */}

      <SectionDivider title="Peran Strategis Arces" />
      {/* Content */}
    </>
  )
}
```
