<script lang='ts'>
  import 'codemirror/lib/codemirror.css'
  import 'codemirror/theme/material.css'
  import 'codemirror/mode/xml/xml'
  import 'codemirror/mode/javascript/javascript'
  import 'codemirror/mode/css/css'
	import CodeMirror from '@joshnuss/svelte-codemirror'
  
  
  //props
  export let lang;

  const options = {
		mode: lang,
		lineNumbers: true,
    lineWrapping: true,
    lint: true,
    theme: 'material',
    // readOnly: true,
	}
	
	let code = `function test() {\n  return 42\n}`
	let editor

</script>

<div class="editor-container">
  <div class="editor-title">
    {lang}
  </div>
  <CodeMirror bind:editor {options} class="editor" bind:value={code}/>
</div>


<style>
  
  
  *{
    text-align: left;
  }
	
</style>