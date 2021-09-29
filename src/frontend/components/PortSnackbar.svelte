<script lang="ts">
  import Snackbar, {
    Label,
  } from '@smui/snackbar';
  import { onMount } from 'svelte';
  //declare snackbar and open it on load
  let snackbar;

  //variable for which port is being used
  let port = '5000';

  //load snackbar on mount
  onMount(async () => {
    snackbar.open();
  });

</script>

<Snackbar bind:this={snackbar}>
  <Label>Sylph is currently using port {port} for its child process.</Label>
</Snackbar>