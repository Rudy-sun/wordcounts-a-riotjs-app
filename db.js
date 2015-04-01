function DB(){
  var self = this
  
  this.Dictionary = Dictionary

  this.LookupList = LookupList
  
  this.Word = Word
  
  this.Stem = Stem
  
  this.Doc = Doc
  
  function test(){
    return "a"
  }
  
  function LookupList(){
    var self = this
    this.lookup  = {}
    this.list = []
  }
  
  function Word(value){
    var self = this
    this.id = null
    this.key = value.toLowerCase()
    this.value = value
    this.count = 0
    this.stemId = null
    this.currentPanel = null
  }
  
  function Stem(key){
    var self = this
    this.key = key
    this.id = null
    this.words = []
    this.count = 0
  }
  
  function Dictionary(){
    var self = this
    this.exclude = populateFrom(["a", "as", "and", "or", "yes", "no", "not", "for", "you", "is", "are", "be", "to", "too", "it", "its", "it's", "so", "the", "an", "of", "in", "out", "go", "on", "i", "yes", "no"])
    this.words = {}
    this.stems = {}
    
    function populateFrom(list){
      var o = {}
      list.forEach(function(item){
        //if (item['key'] !== undefined)
        //  o[item.key] = item
        //else
        //  o[item] = item
        o[item] = item
      })
      return o
    }
  }
  
  function Doc(db){
    var self = this
    this.words = null
    this.stems = null
    
    this.init = function(){
      self.words = new db.LookupList()
      self.stems = new db.LookupList()
    }
    
    this.addWordByValue = function(value){
      value = value.trim()
      if (value.length > 0 && isNaN(value)){
        var temp_word = new db.Word(value)
        var word = self.words.lookup[temp_word.key]
        if (word === undefined) {
          word = addWord(temp_word)
        }
        word.count++
      }
    }
    
    this.addStemByKey = function(key){
      var stem = self.stems.lookup[key]
      if (stem === undefined) {
        stem = new db.Stem(key)
        stem.id = self.stems.list.length
        self.stems.lookup[key] = stem
        self.stems.list.push(stem)
      }
      return stem
    }
    
    function addWord(word){
      word.id = self.words.list.length
      self.words.lookup[word.key] = word
      self.words.list.push(word)
      return word
    }
  }
}