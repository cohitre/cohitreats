$.fn.resetPosition = function() {
  return this.css({ top: '', left: '', right: '', bottom: '' });
}

$.fn.doOnce = function(){
  var self = this;
  if ( self.length > 0) {
    var callbacks = arguments;
    $.each(callbacks, function(){
      this.call(self);
    });
  }
  return self;
}

$.fn.bottomOffset = function() {
  return this.offset().top + this.height();
}

$.initializeOnce = function(selector){
  var callbacks = Array.prototype.slice.call(arguments, 1);
  $(function(){
    var items = $(selector);
    $.each(callbacks, function(index, callback){
      callback.call(items, items);
    });
  });
}

$.initializeEach = function(selector) {
  var callbacks = Array.prototype.slice.call(arguments, 1);
}

$.expr[":"].folded = function(element) {
  var topOffset = $(element).offset().top;
  var bottomOffset = topOffset + $(element).outerHeight();
  var scroll = $(window).scrollTop();

  return topOffset < scroll && bottomOffset > scroll;
}

Cohitre = {
  alignIcon: function(){
    var iconOffset = $(window).scrollTop() - this.offset().top;
    
    this.find(".thumbnail")
      .resetPosition()
      .doOnce(function(){
        var offset = $(this).css('bottom', 0).css('top','auto').position().top;
        if (offset > iconOffset) {
          $(this).resetPosition().css("top", iconOffset);
        }
      });
  }
}

// $(function(){
//   var projects = $(".project");
//   
//   var thumbnails = projects.find('.thumbnail');
//   
//   $(window).scroll(function(){
//     thumbnails.resetPosition()
//     projects
//       .removeClass("active")
//       .filter(":folded")
//         .addClass("active")
//         .doOnce(Cohitre.alignIcon);
//   });
// });