<script>
  export let number;
  export let locale = "en";

  $: formattedNumber = number.toLocaleString(locale, {
    notation: "compact",
    compactDisplay: "short",
  });
</script>

<span class="tabular-nums">{formattedNumber}</span>
