function GUI(){
  var self = this
  
  this.clearPanels = function(){
    self.panels.forEach(function(panel){
      panel.items.length = 0
    })
    self.others.items.length = 0
    self.exclude.items.length = 0
  }
  
  this.panels = [
    {class: 'panel', id: 0, label: '1: ', value: '', items: [], itemsdivclass: 'itemsdiv'},
    {class: 'panel', id: 1, label: '2: ', value: '', items: [], itemsdivclass: 'itemsdiv'},
    {class: 'panel', id: 2, label: '3: ', value: '', items: [], itemsdivclass: 'itemsdiv'},
    {class: 'panel', id: 3, label: '4: ', value: '', items: [], itemsdivclass: 'itemsdiv'},
    {class: 'panel', id: 4, label: '5: ', value: '', items: [], itemsdivclass: 'itemsdiv'},
    {class: 'panel', id: 5, label: '6: ', value: '', items: [], itemsdivclass: 'itemsdiv'},
    {class: 'panel', id: 6, label: '7: ', value: '', items: [], itemsdivclass: 'itemsdiv'},
    {class: 'panel', id: 7, label: '8: ', value: '', items: [], itemsdivclass: 'itemsdiv'},
    {class: 'panel', id: 8, label: '9: ', value: '', items: [], itemsdivclass: 'itemsdiv'},
    {class: 'panel', id: 9, label: '10: ', value: '', items: [], itemsdivclass: 'itemsdiv'},
    {class: 'panel', id: 10, label: '11: ', value: '', items: [], itemsdivclass: 'itemsdiv'},
    {class: 'panel', id: 11, label: '12: ', value: '', items: [], itemsdivclass: 'itemsdiv'},
    {class: 'panel', id: 12, label: '13: ', value: '', items: [], itemsdivclass: 'itemsdiv'},
    {class: 'panel', id: 13, label: '14: ', value: '', items: [], itemsdivclass: 'itemsdiv'},
    {class: 'panel', id: 14, label: '15: ', value: '', items: [], itemsdivclass: 'itemsdiv'},
    {class: 'panel', id: 15, label: '16: ', value: '', items: [], itemsdivclass: 'itemsdiv'}, 
    {class: 'panel', id: 16, label: '17: ', value: '', items: [], itemsdivclass: 'itemsdiv'},
    {class: 'panel', id: 17, label: '18: ', value: '', items: [], itemsdivclass: 'itemsdiv'},
    {class: 'panel', id: 18, label: '19: ', value: '', items: [], itemsdivclass: 'itemsdiv'},
    {class: 'panel', id: 19, label: '20: ', value: '', items: [], itemsdivclass: 'itemsdiv'},
    {class: 'panel', id: 20, label: '21: ', value: '', items: [], itemsdivclass: 'itemsdiv'},
    {class: 'panel', id: 21, label: '22: ', value: '', items: [], itemsdivclass: 'itemsdiv'},
    {class: 'panel', id: 22, label: '23: ', value: '', items: [], itemsdivclass: 'itemsdiv'},
    {class: 'panel', id: 23, label: '24: ', value: '', items: [], itemsdivclass: 'itemsdiv'},
    {class: 'panel', id: 24, label: '25: ', value: '', items: [], itemsdivclass: 'itemsdiv'}
  ]
  this.others = {class: 'panel wide', id: 'others', label: 'Others', value: '', items: [], itemsdivclass: ''}
  this.exclude = {class: 'panel wide', id: 'exclude', label: 'Excluded', value: '', items: [], itemsdivclass: ''}
}