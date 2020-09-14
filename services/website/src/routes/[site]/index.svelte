<script context="module">
  import { getVisibility } from "../../api/settings";

  export async function preload(page, session) {
    const { user } = session;
    const siteVisibility = await getVisibility(this.fetch, page.host, page.path.substring(1));

    if (!user && siteVisibility === "private") {
      this.redirect(302, "auth");
      return;
    }
  };
</script>

<script>
  import { fetchAllStats } from "../../api/stats";
  import Card from "../../components/card.svelte";
  import DateRange from "../../components/date-range.svelte";
  import WebsiteSelect from "../../components/website-select.svelte";
  import Header from "../../components/header/index.svelte";
  import MainContent from "../../components/main-content.svelte";
  import Devices from "../../components/stats/devices.svelte";
  import TopPages from "../../components/stats/top-pages.svelte";
  import TopReferrers from "../../components/stats/top-referrers.svelte";
  import TotalPageviews from "../../components/stats/total-pageviews.svelte";
  import UniqueVisitors from "../../components/stats/unique-visitors.svelte";
  import Visitors from "../../components/stats/visitors.svelte";
  import WorldMap from "../../components/stats/world-map.svelte";

  fetchAllStats();
</script>

<div>
  <Header />
  <MainContent>
    <WebsiteSelect />
    <DateRange />
    <Card>
      <div class="flex">
        <UniqueVisitors />
        <TotalPageviews />
      </div>
    </Card>
    <Card>
      <Visitors />
    </Card>
    <div class="md:flex md:justify-between">
      <div class="md:w-1/2">
        <Card>
          <TopPages />
        </Card>
      </div>
      <div class="md:w-1/2 md:ml-5">
        <Card>
          <TopReferrers />
        </Card>
      </div>
    </div>
    <div class="md:flex md:justify-between">
      <div class="md:w-1/2">
        <Card>
          <Devices />
        </Card>
      </div>
      <div class="md:w-1/2 md:ml-5">
        <Card>
          <WorldMap />
        </Card>
      </div>
    </div>
  </MainContent>
</div>
