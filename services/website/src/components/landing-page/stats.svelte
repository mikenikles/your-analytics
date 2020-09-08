<script>
  import { sub } from "date-fns";
  import { onMount } from "svelte";
  import { dateRange, siteVisibility } from "../../api/stats";
  import Card from "./stats-card.svelte";

  import Devices from "../stats/devices.svelte";
  import TopPages from "../stats/top-pages.svelte";
  import TopReferrers from "../stats/top-referrers.svelte";
  import TotalPageviews from "../stats/total-pageviews.svelte";
  import UniqueVisitors from "../stats/unique-visitors.svelte";
  import Visitors from "../stats/visitors.svelte";
  import WorldMap from "../stats/world-map.svelte";


  onMount(() => {
    siteVisibility.set("public");
    dateRange.set({
      from: sub(new Date(), {
        days: 30
      }).getTime(),
      to: new Date().getTime()
    })
  });
</script>

<div class="py-10 max-w-6xl mx-auto sm:py-32">
  <div class="px-4 sm:px-12">
    <h2 class="text-3xl text-center font-extrabold tracking-wide sm:text-5xl">Visibility into what matters</h2>
    <p class="mt-8 text-xl sm:text-2xl">We keep it simple and focus on web analytics metrics that matter by also respecting your visitor's privacy.</p>
  </div>
  <div class="pt-10">
    <Card title="Visitors & page views" description={`See how many unique visitors your website has and how many pages they view.`}>
      <UniqueVisitors />
      <TotalPageviews />
    </Card>
    <Card title="Charts" description={`Visualize visitors, page views, bounce rate and time spent over a given time period.`}>
      <Visitors />
    </Card>
    <Card title="Top Pages" description={`Understand which of your website's pages are more or less popular. Learn how much time to users spend on individual pages and determine where to focus your effort in terms of SEO improvements and marketing.`}>
      <TopPages showTitle={false} showShowMore={false} />
    </Card>
    <Card title="Top Referrers" description={`Review where your website visitors come from. This helps you get a better picture of who talks about you online.`}>
      <TopReferrers showTitle={false} showShowMore={false} />
    </Card>
    <Card title="Devices" description={`What devices do your visitors use? Is your content mobile-friendly enough? Does your website work for all device combinations?`}>
      <Devices showTitle={false} />
    </Card>
    <Card title="Countries" description={`Do you reach a global audience? Is it time to translate your content into other languages? Learn all about your visitors and where they access your website from.`}>
      <WorldMap showTitle={false} />
    </Card>
  </div>
</div>

