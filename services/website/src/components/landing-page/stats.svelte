<script>
  import Card from "../card.svelte";
  import StatsCard from "./stats-card.svelte";
  import Section from "./section.svelte";

  import Devices from "../stats/devices.svelte";
  import TopPages from "../stats/top-pages.svelte";
  import TopReferrers from "../stats/top-referrers.svelte";
  import TotalPageviews from "../stats/total-pageviews.svelte";
  import UniqueVisitors from "../stats/unique-visitors.svelte";
  import Visitors from "../stats/visitors.svelte";
  import WorldMap from "../stats/world-map.svelte";
</script>

<Section title="Visibility into what matters" description="We keep it simple and focus on web analytics metrics that matter by also respecting your visitor's privacy.">
  <div class="pt-10">
    <StatsCard title="Visitors & page views" description={`See how many unique visitors your website has and how many pages they view.`}>
      <div class="flex">
        <UniqueVisitors />
        <TotalPageviews />
      </div>
    </StatsCard>
    <StatsCard title="Charts" description={`Visualize visitors, page views, bounce rate and time spent over a given time period.`}>
      <Card>
        <Visitors />
      </Card>
    </StatsCard>
    <StatsCard title="Top Pages" description={`Understand which of your website's pages are more or less popular. Learn how much time to users spend on individual pages and determine where to focus your effort in terms of SEO improvements and marketing.`}>
      <Card>
        <TopPages showTitle={false} showShowMore={false} />
      </Card>
    </StatsCard>
    <StatsCard title="Top Referrers" description={`Review where your website visitors come from. This helps you get a better picture of who talks about you online.`}>
      <Card>
        <TopReferrers showTitle={false} showShowMore={false} />
      </Card>
    </StatsCard>
    <StatsCard title="Devices" description={`What devices do your visitors use? Is your content mobile-friendly enough? Does your website work for all device combinations?`}>
      <Card>
        <Devices showTitle={false} />
      </Card>
    </StatsCard>
    <StatsCard title="Countries" description={`Do you reach a global audience? Is it time to translate your content into other languages? Learn all about your visitors and where they access your website from.`}>
      <WorldMap showTitle={false} />
    </StatsCard>
  </div>
</Section>
