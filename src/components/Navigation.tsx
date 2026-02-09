import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Coffee, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/menu', label: 'Menu' },
  { path: '/about', label: 'About' },
  { path: '/gallery', label: 'Galery' },
  { path: '/contact', label: 'Contact' },
];

export function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdminRoute = location.pathname.startsWith('/admin');
  if (isAdminRoute) return null;

  const isActive = (path: string) => location.pathname === path;
  const linkClassName = (active: boolean) =>
    `transition-colors hover:text-primary ${
      active ? 'text-primary font-medium' : 'text-muted-foreground'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Navigation Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Coffee className="w-8 h-8 text-primary" />
            <span className="hidden sm:inline text-xl font-semibold">SPanda Coffee</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={linkClassName(isActive(link.path))}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Admin & Mobile Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <Link to="/admin" className="hidden md:block">
              <Button variant="outline" size="sm" className="rounded-full">
                Admin
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Buka menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card/50 backdrop-blur-sm">
            <div className="flex flex-col gap-3 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-md transition-colors ${linkClassName(
                    isActive(link.path)
                  )} hover:bg-muted/50`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 px-4">
                <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full rounded-full">
                    Admin
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
