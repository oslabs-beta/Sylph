<script lang="ts">
  export let name: string;
  import Router from 'svelte-spa-router'
  import SylphContainer from './containers/SylphContainer.svelte'
  import LandingPage from './components/LandingPage.svelte';

  const routes = {
    '/': LandingPage,
    '/new-project': SylphContainer
  }
</script>

<body>
  <Router {routes} />
</body>