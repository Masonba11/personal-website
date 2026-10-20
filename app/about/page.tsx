import Link from "next/link";
import { CtaLink } from "@/components/CtaLink";
import { WinningAdsShowcase } from "@/components/WinningAds";
import { FounderPortrait } from "@/components/FounderPortrait";
import { PageHero } from "@/components/PageHero";
import { Shell } from "@/components/Shell";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "About Mason Ball",
  description:
    "Mason Ball owns home-service companies in Arizona and runs the marketing. He studies data analytics and computer programming at Mesa Community College.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="I Learned Marketing by Building Businesses That Needed Customers."
        lede="MBall Marketing exists because I needed customers for companies I was responsible for — not because I wanted a slogan about passion and innovation."
      />
      <Shell className="grid items-start gap-12 py-16 md:grid-cols-[0.8fr_1.2fr] md:py-24">
        <FounderPortrait />
        <div className="space-y-5 text-lg leading-relaxed text-body">
          <p>
            I&apos;m Mason Ball, an entrepreneur and a student pursuing a bachelor&apos;s degree in Data Analytics and Computer Programming at Mesa Community College. On the site I published before this one, I also noted a full academic scholarship and a 3.8 GPA. The degree is still in progress.
          </p>
          <p>
            I&apos;m based in Queen Creek, Arizona. I don&apos;t publish a storefront address because the work is the marketing, and the companies I operate go to the customer.
          </p>
          <p>
            I own and operate Arizona Window Washing Pros and Ball Bros Screens. I have also managed marketing for Sublime Design &amp; Build and The Yard Experts. Earlier Yard Experts work was done alongside Silverback Marketing. This site is my own practice: MBall Marketing.
          </p>
          <p>
            The background is operating home-service companies, Meta ads, Google Ads, local SEO, lead generation, web development, data analytics, customer acquisition, and sales and estimating. I understand an advertising budget from the owner&apos;s side of it, because I have written the checks.
          </p>
          <p>
            I know what it&apos;s like to spend money on advertising and wonder whether it&apos;s actually going to turn into revenue. I&apos;ve been there. I&apos;ve run campaigns that didn&apos;t work, changed strategies when the numbers weren&apos;t adding up, and built systems that helped my own businesses grow. That&apos;s the experience I bring to every company I work with.
          </p>
          <p>
            I&apos;ve made the mistakes so I know what to look for. The window-cleaning account is the one I want a contractor to read first. The first market did not work. We changed it because the spreadsheet said we had to.
          </p>
          <p>
            Leads don&apos;t pay the bills. Customers do. If you want the campaigns with the screenshots attached, start with the{" "}
            <Link href="/case-studies/arizona-window-washing-pros" className="text-gold-deep underline">
              Arizona Window Washing Pros turnaround
            </Link>
            .
          </p>
          <p>
            <a href="/transcript.pdf" className="text-gold-deep underline">
              Transcript PDF
            </a>{" "}
            from the previous education page.
          </p>
          <CtaLink href="/contact" variant="light">
            Let&apos;s Talk Growth
          </CtaLink>
        </div>
      </Shell>
      <WinningAdsShowcase
        variant="compact"
        headline="These aren't examples. These are the actual campaigns."
        lede="The same accounts described above. These are the Meta ads that ran for window cleaning, solar screens, and remodeling."
      />
    </>
  );
}
