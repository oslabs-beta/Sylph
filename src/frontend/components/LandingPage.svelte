<script lang="ts">
  import { push } from 'svelte-spa-router'
</script>

  <section>
    <button on:click={() => {
      push('/sylph');
    }}>
      Start a new Svelte prototyping project
    </button>
    <p>[NOT FUNCTIONAL] EXAMPLE 2</p>
    <p>[NOT FUNCTIONAL] EXAMPLE 3</p>
  </section>
