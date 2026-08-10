import React, { useEffect } from "react";
import { handleNavigationClick } from "../utils/navigation";

interface NotFoundPageProps {
  title?: string;
  message?: string;
}

const DEFAULT_TITLE = "Page Not Found | Abu Rahat Sabir";
const DEFAULT_HEADING = "Oops! Page not found.";
const DEFAULT_DESCRIPTION =
  "The page you requested could not be found. Return to the portfolio index or browse the latest work and writing.";

function upsertMetaTag(name: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
  return element;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({
  title = DEFAULT_HEADING,
  message = "The page you are looking for does not exist or has moved.",
}) => {
  const pageTitle =
    title === DEFAULT_HEADING ? DEFAULT_TITLE : `${title} | Abu Rahat Sabir`;
  const pageDescription = message || DEFAULT_DESCRIPTION;

  useEffect(() => {
    const previousTitle = document.title;
    const existingRobots = document.querySelector<HTMLMetaElement>(
      'meta[name="robots"]',
    );
    const previousRobotsContent = existingRobots?.getAttribute("content");
    const shouldRemoveRobotsOnCleanup =
      !existingRobots || previousRobotsContent === "noindex,follow";
    const robotsElement = upsertMetaTag("robots", "noindex,follow");

    const existingDescription = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    const previousDescriptionContent =
      existingDescription?.getAttribute("content");
    const descriptionElement = upsertMetaTag("description", pageDescription);

    document.title = pageTitle;

    return () => {
      document.title = previousTitle;

      if (shouldRemoveRobotsOnCleanup) {
        robotsElement.remove();
      } else {
        robotsElement.setAttribute("content", previousRobotsContent ?? "");
      }

      if (
        previousDescriptionContent === null ||
        previousDescriptionContent === undefined
      ) {
        descriptionElement.remove();
      } else {
        descriptionElement.setAttribute("content", previousDescriptionContent);
      }
    };
  }, [pageDescription, pageTitle]);

  return (
    <section
      aria-labelledby="not-found-title"
      className="relative z-0 flex min-h-[800px] items-center justify-center bg-white px-6 pb-[180px] pt-[260px] font-sans max-lg:pt-[200px] max-md:min-h-[450px] max-md:pb-[100px] max-md:pt-[160px] max-sm:px-4 max-sm:pt-[120px]"
    >
      <div className="relative z-10 flex max-w-[720px] -translate-y-8 flex-col items-center text-center sm:-translate-y-10">
        <div className="mb-3 text-[120px] font-bold leading-[120px] tracking-[-0.04em] text-[#1a1b1e] sm:text-[150px] sm:leading-none lg:text-[181px] xl:text-[209px]">
          404
        </div>
        <h1
          id="not-found-title"
          className="mb-6 text-[40px] font-bold leading-[1.16] tracking-[-0.015em] text-[#1a1b1e] sm:text-[48px] lg:text-[56px] xl:text-[60px]"
        >
          {title}
        </h1>
        <p className="mb-10 max-w-[460px] text-[18px] font-medium leading-[1.66667] text-[#66666e] max-md:mb-4">
          {message}
        </p>
        <div className="flex items-center justify-center gap-6 max-sm:w-full max-sm:flex-col max-sm:gap-4">
          <a
            href="/"
            onClick={(event) => handleNavigationClick(event, "/")}
            className="inline-flex min-h-[66px] items-center justify-center rounded-[12px] border border-[#1a1b1e] bg-[#1a1b1e] px-10 py-[22px] text-center text-[18px] font-bold leading-[1.1] text-white no-underline shadow-[0_2px_4px_rgba(74,58,255,0.12)] transition-all duration-300 hover:scale-[0.94] hover:bg-transparent hover:text-[#1a1b1e] hover:shadow-[0_4px_10px_rgba(68,140,252,0.10)] max-lg:px-8 max-lg:py-5 max-sm:w-full"
          >
            <span>Go back home</span>
            <span aria-hidden="true" className="ml-2 text-[18px] leading-none">
              &rarr;
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
