<navbar>
  <nav class="navbar">
    <ul>
      <li><div class='navtext'><span>TOP</span>25<span>WORD</span>COUNTS</div></li>
      <li class="clickable" id="testbutton" onclick="{click}">
        <div class='navtext'><span>Select</span>a<span>Text</span>File</div>
      </li>
      <li><div id='filename' class='navitem'>{this.api.selectedFilename}</div></li>
      <li><input type="file" id="fileinput" style="display: none;" onchange="{change}"/></li>
      </ul>
  </nav>
  
  <script>
    this.api = opts.api
    
    click(e){
      fileinput.click()
    }
    
    change(e){
      this.api.handleFiles(e)
      riot.update()
    }
  </script>
</navbar>


