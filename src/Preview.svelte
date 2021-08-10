<script>
  import Editor from "./Editor.svelte";
</script>

<style>
  section {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
</style>

<section>
  <Editor lang='html' text='<h1> Hello World </h1>' filename='index.svelte'/>
</section>
