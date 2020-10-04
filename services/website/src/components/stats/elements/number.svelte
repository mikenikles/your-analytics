<script lang="ts">
  export let number: number;
  export let locale: string = "en";

  $: formattedNumber = number.toLocaleString(locale, {
    notation: "compact",
    // @ts-ignore Should be fixed by https://github.com/microsoft/TypeScript/pull/40039
    compactDisplay: "short",
  });
</script>

<span class="tabular-nums">{formattedNumber}</span>
