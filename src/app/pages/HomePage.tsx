/**
 * -----------------------------------------------------------------------------
 * File: HomePage.tsx
 * Feature: Home
 *
 * Purpose:
 * Temporary landing page until MainLayout is integrated.
 * -----------------------------------------------------------------------------
 */

function HomePage() {
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
        <h1 className="text-5xl font-bold text-slate-900">Welcome to Priciq</h1>

        <p className="mt-4 text-slate-500">
          Routing foundation successfully configured.
        </p>
      </section>
    </main>
  );
}

export default HomePage;
