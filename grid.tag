<grid>
  
  <div id='wordcountsgrid'>
    <div id='leftpanel'>
      <div each="{gui.panels}" class="{class}" id="panel{id}" ondragover="{parent.dragOver}" ondragenter="{parent.dragEnter}" ondragleave="{parent.dragLeave}" ondrop="{parent.drop}" ondragend="{parent.dragEnd}">
        <div class="heading" id="heading{id}">{label}{value}</div>
        <div class="items {itemsdivclass}" id="items{id}">
          <span each="{items}"><span draggable="true" ondragstart="{parent.parent.dragStart}" class="item" id="item{id}">{key + "&nbsp;(" + count + ")"}</span> </span>
        </div>
      </div>
    </div>
    <div id='rightpanel'>
      <div each="{specialpanels}" class="{class}" id="{id}" ondragover="{parent.dragOver}" ondragenter="{parent.dragEnter}" ondragleave="{parent.dragLeave}" ondrop="{parent.drop}" ondragend="{parent.dragEnd}">
        <div class="heading" id=heading{id}>{label}{value}</div>
        <div class="items {itemsdivclass}" id="items{id}">
          <span each="{items}"><span draggable="true" ondragstart="{parent.parent.dragStart}" class="item" id="item{id}">{key + "&nbsp;(" + count + ")"}</span> </span>
        </div>
      </div>
    </div>
  </div>
  
  <script>
    var dragdata = null
    this.db = opts.db
    this.gui = opts.gui
    this.api = opts.api
    this.handlers = opts.handlers
    this.specialpanels = [null, null]
    //this.on('update', function(){
    this.specialpanels[0] = this.gui.others
    this.specialpanels[1] = this.gui.exclude
    //})
    
    $(window).on('resize', function(e){
      console.log("resize")
      var ht = parseInt($('#leftpanel').css('height'), 10)
      console.log('ht: ' + ht)
      var opanel = $('#others')
      var epanel = $('#exclude')
      console.log('opanel ht: ' + opanel.css('height'))
      console.log('epanel ht: ' + epanel.css('height'))
      
      //var oht = (600/1012) * ht
      //var eht = (350/1012) * ht
      var oht = ht * 0.7
      var eht = ht - oht - 65
      
      console.log('oht: ' + oht)
      console.log('eht: ' + eht)
      
      opanel.css('height', parseInt(oht, 10) + 'px')
      epanel.css('height', parseInt(eht, 10) + 'px')
    })
    
    dragStart(e){
      console.log("dragStart")
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/json', e.item)
      dragdata = e.item //a word item
      return true
    }
    
    dragOver(e){
      if (e.preventDefault)
        e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
    }
    
    dragEnter(e){
      console.log("dragenter")
      $(e.currentTarget).children().addClass('disablepointerevents')
      e.currentTarget.classList.add('over')
    }
    
    dragLeave(e){
      console.log("dragleave")
      e.currentTarget.classList.remove('over')
      $(e.currentTarget).children().removeClass('disablepointerevents')
    }
    
    drop(e){
      console.log("dragdrop")
      e.dragdata = dragdata
      this.handlers.drop(e)
      $(e.currentTarget).children().removeClass('disablepointerevents')
    }
    
    dragEnd(e){
      console.log("dragend")
      e.currentTarget.classList.remove('over')
      $(e.currentTarget).children().removeClass('disablepointerevents')
    }
  </script>
  
</grid>
