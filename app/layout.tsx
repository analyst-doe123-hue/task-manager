import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 text-gray-900">
        {/* Navbar with glassmorphism effect */}
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/30 border-b border-white/40 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link
                href="/"
                className="text-xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent hover:from-blue-800 hover:to-indigo-900 transition"
              >
                Smart Task Manager
              </Link>
              <div className="flex gap-6">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-blue-700 font-medium transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/tasks"
                  className="text-gray-700 hover:text-blue-700 font-medium transition-colors"
                >
                  Tasks
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main content – wider max-width, more padding */}
        <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          {children}
        </main>

        {/* Optional footer (remove if not needed) */}
        <footer className="text-center text-gray-500 text-sm py-6 border-t border-white/40 mt-12">
          <p>© 2025 Smart Task Manager – Stay organized</p>
        </footer>
      </body>
    </html>
  );
}