<script lang="ts">
  export let refreshHandler: (event: Event) => void;
</script>

<button on:click={refreshHandler} class="p-1 border rounded"> Refresh </button>
