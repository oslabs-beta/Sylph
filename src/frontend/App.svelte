<script lang="ts">
  export let name: string;
  import Router, { push } from 'svelte-spa-router'
  // import Textfield from '@smui/textfield';
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