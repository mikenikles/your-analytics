<script>
  import FeatureCard from "./feature-card.svelte";
</script>

<div class="py-10 max-w-6xl mx-auto sm:py-32">
  <div class="px-4 sm:px-12">
    <h2 class="text-3xl text-center font-extrabold tracking-wide sm:text-5xl">Your data, your way</h2>
    <p class="mt-8 text-xl sm:text-2xl">See your analytics on a web dashboard, export it to a spreadsheet or process events in real-time within your own environment.</p>
  </div>
  <div class="pt-10 flex flex-col sm:flex-row">
    <FeatureCard title="Dashboard" icon="template" description={`Use the web-based dashboard to see your website analytics at a glance. Slice and dice the data with filters available for all metrics, e.g. date range, referrer, page, country, etc.`} />
    <FeatureCard title="Data export" icon="document-report" description={`It's called Your Analytics for a reason and you can export unsampled, raw data for your website to a variety of tools you are already familiar with. Data exports can be scheduled to run periodically or you can subscribe to real-time updates.`} />
    <FeatureCard title="Email reports" icon="mail" description={`Schedule email reports to be sent to your team members. You decide who receives reports, when they are sent and what they include.`} />
  </div>
</div>
