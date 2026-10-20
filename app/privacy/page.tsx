import type { Metadata } from "next";
import { pageMeta, site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Privacy",
  description: "What MBall Marketing collects on its forms and how those details are used.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <article className="mx-auto w-full max-w-3xl space-y-6 px-5 py-16 text-lg leading-relaxed text-body md:px-8 md:py-24">
      <h1 className="font-serif text-4xl text-ink">Privacy</h1>
      <p>
        Forms on masonball.com ask for your name, business name, email, phone number, and details about your services, service area, project value, and advertising budget. Website URL and extra comments are optional.
      </p>
      <p>
        Those answers are sent to {site.founder} at {site.email} so he can review whether a pay-per-qualified-lead campaign is a fit. The site does not ask for passwords or payment card numbers.
      </p>
      <p>
        Paid landing pages may store campaign parameters such as utm values and advertising click IDs with the application. They are used to tell which ad the request came from. They are not published.
      </p>
      <p>
        Meta Pixel records page visits and an application event after a form is accepted. You can turn that measurement off under Advertising measurement preferences, and a browser Global Privacy Control signal turns it off as well. Declining measurement does not prevent applying. Application answers are not placed in the page address or Pixel event parameters. Conversions API is not currently active.
      </p>
      <p>
        To ask about a submission, email <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </article>
  );
}
