<script lang='ts'>
  import { createEventDispatcher, onMount } from "svelte";
  import ace from "brace";
  import "brace/mode/html";
  import "brace/theme/monokai";


  const dispatch = createEventDispatcher<{
    init: ace.Editor;
    
  }>();

  //props
  export let text :string;
  export let filename :string;

  let editor: ace.Editor
  
  onMount(()=>{
    editor = ace.edit('html-editor')
    
    // dispatch("init", editor);
    editor.$blockScrolling = Infinity;
    editor.getSession().setMode('ace/mode/html')
    editor.setTheme('ace/theme/monokai');
    editor.setValue(text, 1);
    editor.setReadOnly(true)
    editor.setOptions({useWorker: false})
  })

console.log('text:', text);
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