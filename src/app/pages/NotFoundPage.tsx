/**
 * -----------------------------------------------------------------------------
 * File: NotFoundPage.tsx
 *
 * Purpose:
 * Displays a friendly page when the requested route does not exist.
 * -----------------------------------------------------------------------------
 */

function NotFoundPage() {
  return (
    <main
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-slate-50
      "
    >
      <section className="text-center">
        <h1 className="text-7xl font-bold text-slate-900">404</h1>

        <p className="mt-4 text-slate-500">Page not found.</p>
      </section>
    </main>
  );
}

export default NotFoundPage;
