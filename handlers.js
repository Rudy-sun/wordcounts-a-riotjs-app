function Handlers(riot, api){
  this.drop = function(e){
    if (e.stopPropagation)
      e.stopPropagation()
    e.currentTarget.classList.remove('over')
    
    console.log('currentTarget: ' + e.currentTarget)
    console.log('target: ' + e.target)
    console.log('e:' + e)
    var dragdata = e.dragdata
    console.log("dragdata: " + dragdata)
    
    api.moveWord(e.item.id, dragdata)
  }
}
