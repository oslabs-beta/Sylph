<div>
  <div class="editor-lable">{lang}</div>
  <AceEditor
    bind:value={value}
    theme="monokai"
    lang={lang}
    options={options}
    width="100%"
    height="512"
    on:init={editorInit}
    on:input={onEditorChange}
  />
</div>

<script>
  import "brace/theme/monokai";
import AceEditor from 'svelte-ace-editor'

import 'brace';
  // require('brace/ext/language_tools')
  // require('brace/ext/language_tools')
  // require('brace/mode/pgsql')
  // require('brace/mode/mysql')
  // require('brace/mode/sql')
  // require('brace/mode/sqlserver')
  import 'brace/theme/clouds_midnight'

let value = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />

    <title>Sylph</title>
  </head>

  <body>Hello World!</body>
</html>`
export let lang;
let options = {}

function editorInit (editor) {
  // @todo something with editor or something after init
}
function onEditorChange (newValue) {
  value = newValue.detail;
}

</script>

<style>
  *{
    text-align: left;
  }
</style>