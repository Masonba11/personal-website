import { PageHero } from "@/components/PageHero";
import { WinningAdsShowcase } from "@/components/WinningAds";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "The Actual Ads",
  description:
    "Watch the Meta ads MBall Marketing has run for window cleaning, solar screens, and general contracting. Lead counts are inquiries, not booked jobs or revenue.",
  path: "/results",
});

export default function ResultsPage() {
  return (
    <>
      <PageHero
        eyebrow="Advertising portfolio"
        title="The actual campaigns."
        lede="These are the Meta ads behind the home-service accounts. Spend and lead counts are included only where the ad account export supports them. There is no combined revenue total on this page."
      />
      <WinningAdsShowcase
        headline="These aren't examples. These are the actual campaigns."
        lede="These aren't mockups. These aren't hypothetical campaigns. These are real advertisements we've created and managed for real home service businesses. Take a look at the actual ads behind the results."
      />
    </>
  );
}
