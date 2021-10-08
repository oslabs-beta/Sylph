<script lang='ts'>
  import { onDestroy, onMount } from "svelte";
  import ace from "brace";
  import "brace/mode/html";
  import "brace/theme/monokai";


  //props
  export let text :string;
  export let filename :string;

  let contentBackup: string = "";
  let editor: ace.Editor

  $: watchValue(text);
  function watchValue(val: string) {
    if (contentBackup !== val && editor && typeof val === "string" && val!=='') {
      editor.session.setValue(val);
      contentBackup = val;
    }
  }
  
  onDestroy(() => {
    // console.log('onDestroy')
    if (editor) {
      editor.destroy();
      editor.container.remove();
    }
  });

  onMount(()=>{
    // console.log('onMount')
    editor = ace.edit('html-editor')
    editor.$blockScrolling = Infinity;
    editor.getSession().setMode('ace/mode/html')
    editor.setTheme('ace/theme/monokai');
    editor.setValue(text, 1);
    editor.setReadOnly(true)
    editor.setOptions({useWorker: false})
  })

</script>

<div class="editor-container">
  <div class="editor-lable">{filename}</div>
  <div id="html-editor" style="height: 100%; width:100%"></div>
</div>

<style>
  * {
    text-align: left;
  }

  .editor-container {
    height: 80%;
    width: 85%;
  }
</style>