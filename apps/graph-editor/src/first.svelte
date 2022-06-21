<script>
  import { onMount } from "svelte"

  export let foo = "bar"

  onMount(() => {
    setInterval(() => {
      foo = new Date().toLocaleTimeString()
    }, 1000)
  })
</script>

<div class="text-sky-400">Hello {foo}!</div>