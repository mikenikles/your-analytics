<script lang="ts">
  export let number: number;
  export let locale: string = "en";

  $: formattedNumber = number.toLocaleString(locale, {
    notation: "compact",
    compactDisplay: "short",
  });
</script>

<span class="tabular-nums">{formattedNumber}</span>
