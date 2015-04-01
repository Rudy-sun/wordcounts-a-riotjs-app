function API(riot, db, gui){
  var self = this
  var dictionary = new db.Dictionary()
  var doc = new db.Doc(db)
  var suffixes = ['ing', 'ies', 'es', 'ed', 'er', 'y', 'e', 's']
  
  this.selectedFilename = "no file selected"
  
  this.test = function(){
    alert("api test");
  }
  
  this.handleFiles =  function(e){
    //alert('handlefiles')
    var files = e.target.files
    if(files.length > 0){
      loadFile(files[0]);
    }
  }
  
  function loadFile(file){
    self.selectedFilename = file.name
    gui.clearPanels()
    //stems = {lookup: {}, list: []}
    //doc = initDoc()
    doc.init()
    riot.update()
    alert('loadfile')
    
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(){
      analyzeFile(reader.result);
    }
  }
  
  function analyzeFile(contents){
    var allWords = getWords(contents)
    
    // tally up word counts:
    for (var i=0; i < allWords.length; i++){
      doc.addWordByValue(allWords[i])
    }
    
    calculateStems(doc.words)
    var sortedstems = getStems()
    showStems(sortedstems)
  }
  
  //function addToDictionary
   
  function getWords(contents){
    //handle apostrophes and quotes
    var c = contents.replace(/`/g, "ZAPOSZ")
    c = c.replace(/'/g, "ZQUOTEZ")
    c = c.replace(/"/g, 'ZDBLQUOTEZ')
    
    //split on all non-alphnumeric characters:
    var allWords = c.split(/\W|_/)
    
    var wordsLeft = []
    for(var i=0; i<allWords.length; i++){
      w = allWords[i]
      w = w.replace(/ZAPOSZ/g, "`")
      w = w.replace(/ZQUOTEZ/g, "'")
      w = w.replace(/ZDBLQUOTEZ/g, '"')
      w = removeOuterQuotes(w)
      
      //word could be empty now
      if (w.length > 0)
        wordsLeft.push(w)
    }
    wordsLeft.sort()
    return wordsLeft
  }
  
  function removeOuterQuotes(w){
    //remove leading or trailing single or double quotes:
    while (w.length > 0) {
      if (w[0] == "'" || w[0] == '"')
        w = w.substr(1)
      else if (w.length > 0 && (w[w.length - 1] == "'" || w[w.length - 1] == '"'))
        w = w.substr(0, w.length - 1)
      else
        break
    }
    return w  
  }
  
  function calculateStems(words){
    for(var i=0; i<words.list.length; i++){
      var word = words.list[i]
      if (dictionary.exclude[word.key] === undefined)
        calculateStem(word)
      else {
        word.currentPanel = gui.exclude
        gui.exclude.items.push(word)
      }
    }
    gui.exclude.items.sort(sortAlpha)
  }
  
  function calculateStem(word){
    if (!word.stemId) {
      var stemkey = null;
      for(var i=0; i<suffixes.length; i++){
        var suffix = suffixes[i];
        if (word.key.length > 4 && word.key.substr(-suffix.length) == suffix) {
          stemkey = word.key.substr(0, word.key.length - suffix.length)
          break
        }
      }
      if (!stemkey) {
        stemkey = word.key
      }
      var stem = doc.addStemByKey(stemkey)
      stem.words.push(word)
      stem.count = stem.count + word.count
      word.stemid = stem.id
    }
  }
  
  function removeWordFromItsCurrentStem(word){
    if (word.stemid) {
      var stem = doc.stems.list[word.stemid]
      var i = stem.words.indexOf(word)
      if (i > -1){
        stem.words.splice(i, 1) //remove word
        stem.count = stem.count - word.count
      }
      word.stemid = null
    }
  }
  
  function addWordToStem(word, stem){
    stem.words.push(word)
    stem.count = stem.count + word.count
    word.stemid = stem.id
  }
  
  function getStems() {
    var sortedstems = []
    for(var i=0; i<doc.stems.list.length; i++){
      sortedstems.push(doc.stems.list[i]);
    }
    sortedstems.sort(function(a, b){return b.count - a.count})
    var show = ""
    for(var i=0; i<sortedstems.length; i++) {
      var stem = sortedstems[i];
      show = show + stem.key + ": " + stem.count + "\n"
      var list = ""
      for(var j=0; j<stem.words.length; j++){
        word = stem.words[j];
        list = list + word.key + "(" + word.count + "), "
      }
      show = show + "  " + list.substr(0, list.length - 2) + "\n"
    }
    return sortedstems
  }
  
  function showStems(sortedstems){
    //Populate panels
    for (var j=0; j<sortedstems.length; j++) {
      var stem = sortedstems[j]
      if (j < 25) {
        gui.panels[j].stem = stem
        updatePanelValue(gui.panels[j])
        for (var k=0; k<stem.words.length; k++){
          var word = stem.words[k]
          word.currentPanel = gui.panels[j]
          gui.panels[j].items.push(word)
        }
      }
      else {
        for (var k=0; k<stem.words.length; k++){
          var word = stem.words[k]
          word.currentPanel = gui.others
          gui.others.items.push(word)
        }
      }
    }
    gui.others.items.sort(sortAlpha)
    riot.update()
  }
  
  function updatePanelValue(panel){
    if (panel.stem) {
      panel.value = panel.stem.key + " (" + panel.stem.count + ")"
    }
  }
  
  function removeWordFromPanel(word){
    var panel = word.currentPanel
    var i = panel.items.indexOf(word)
    if (i > -1){
      panel.items.splice(i, 1)
      word.currentPanel = null
    }
    return panel
  }
  
  this.moveWord = function(panelId, word){
    //alert('panelId: ' + panelId + '. word.key: ' + word.key + ".")
    
    //no change?
    if (panelId == word.currentPanel.id)
      return
    
    //remove from old panel:
    var oldPanel = removeWordFromPanel(word)
    
    //add to new panel
    if (panelId == "others"){
      removeWordFromItsCurrentStem(word)
      updatePanelValue(oldPanel)
      word.currentPanel = gui.others
      gui.others.items.push(word)
      gui.others.items.sort(sortAlpha)
      delete dictionary.exclude[word.key]
    }
    else if (panelId == "exclude"){
      removeWordFromItsCurrentStem(word)
      updatePanelValue(oldPanel)
      word.currentPanel = gui.exclude
      gui.exclude.items.push(word)
      gui.exclude.items.sort(sortAlpha)
      dictionary.exclude[word.key] = word.key
    }
    else {
      removeWordFromItsCurrentStem(word)
      updatePanelValue(oldPanel)
      addWordToStem(word, gui.panels[panelId].stem)
      word.currentPanel = gui.panels[panelId]
      gui.panels[panelId].items.push(word)
      gui.panels[panelId].items.sort(sortAlpha)
      updatePanelValue(gui.panels[panelId])
      delete dictionary.exclude[word.key]
    }
    
    riot.update()
  }
  
  function sortAlpha(a, b) {
    if (a.key < b.key)
      return -1;
    if(a.key > b.key)
      return 1;
    return 0
  }
}
