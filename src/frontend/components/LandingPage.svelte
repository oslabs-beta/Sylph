<script lang="ts">
  import Router from 'svelte-spa-router'
  import SylphContainer from '../containers/SylphContainer.svelte'

  const routes = {
    '/sylph': SylphContainer
  }
</script>

<section>
  <Router {routes} />

  <a href="#/sylph">Start a new Svelte prototyping project</a>
  <p>[NOT FUNCTIONAL] EXAMPLE 2</p>
  <p>[NOT FUNCTIONAL] EXAMPLE 3</p>
</section>