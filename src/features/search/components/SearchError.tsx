/**
 * -----------------------------------------------------------------------------
 * File: SearchError.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays search errors.
 * -----------------------------------------------------------------------------
 */

interface SearchErrorProps {
  message: string;
}

function SearchError({ message }: SearchErrorProps) {
  return (
    <section
      className="
        flex
        min-h-[420px]
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-red-200
        bg-red-50
        px-8
        py-16
        text-center
      "
    >
      <div
        className="
          mb-6
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-red-100
          text-3xl
        "
      >
        ⚠️
      </div>

      <h2
        className="
          text-xl
          font-semibold
          text-red-700
        "
      >
        Something went wrong
      </h2>

      <p
        className="
          mt-3
          max-w-md
          text-sm
          leading-6
          text-red-600
        "
      >
        {message}
      </p>
    </section>
  );
}

export default SearchError;
