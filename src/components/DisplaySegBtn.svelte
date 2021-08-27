
<SegmentedButton segments={choices} let:segment singleSelect bind:selected>
    <!-- Note: the `segment` property is required! -->
    <Segment {segment}>
      <Label>{segment}</Label>
    </Segment>
  </SegmentedButton>
   

   
  <pre class="status">Selected: {selected}</pre>
   
  <script>
    import SegmentedButton, { Segment } from '@smui/segmented-button';
    import { Label } from '@smui/common';
   
    let choices = ['block', 'inline-block', 'flex', 'grid'];
    let selected = 'block';
  </script>