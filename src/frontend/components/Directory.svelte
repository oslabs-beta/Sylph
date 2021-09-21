<script lang="ts">
  let dirObj: object;
  const handleClick = ()=> {
    globalThis.api.project.send('getDirectory')
    globalThis.api.project.receive('directorySent', dir=>dirObj = dir);
    console.log('dirObj', dirObj)
    }
</script>

<div>
  <button on:click={handleClick}>log dir</button>
</div>

<style></style>