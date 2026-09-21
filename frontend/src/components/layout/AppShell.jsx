import { Link, NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { LayoutGrid, KeyRound } from "lucide-react"

/**
 * Sidebar navigation items
 */
const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutGrid },
  { to: "/passwords", label: "Mots de passe", icon: KeyRound },
]

export default function AppShell({ title, actions, children }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6">

        {/* ================= Sidebar ================= */}
        <aside className="hidden w-64 shrink-0 md:block">
          <div className="rounded-xl border bg-card p-4">
            {/* Logo / App title */}
            <Link to="/" className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-lg border bg-background">
                <KeyRound className="h-4 w-4" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold">
                  Gestion Mots de Passe
                </div>
                <div className="text-xs text-muted-foreground">
                  Dashboard
                </div>
              </div>
            </Link>

            <Separator className="my-4" />

            {/* Navigation */}
            <nav className="space-y-1">
  {navItems.map((item) => (
    <NavLink
      key={item.to}
      to={item.to}
      className={({ isActive }) =>
        [
          "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
          isActive
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        ].join(" ")
      }
    >
      <item.icon className="h-4 w-4 shrink-0" />
      <span>{item.label}</span>
    </NavLink>
  ))}
</nav>

          </div>
        </aside>

        {/* ================= Main Content ================= */}
        <main className="min-w-0 flex-1">
          <div className="rounded-xl border bg-card">
            {/* Header */}
            <header className="flex items-center justify-between gap-3 border-b px-5 py-4">
              <div className="min-w-0">
                <h1 className="truncate text-base font-semibold">
                  {title}
                </h1>
                <p className="truncate text-sm text-muted-foreground">
                  Interface de gestion
                </p>
              </div>

              <div className="flex items-center gap-2">
                {actions ?? <Button variant="outline">Action</Button>}
              </div>
            </header>

            {/* Page content */}
            <section className="p-5">
              {children}
            </section>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            © {new Date().getFullYear()} • Tailwind + shadcn/ui
          </p>
        </main>
      </div>
    </div>
  )
}
