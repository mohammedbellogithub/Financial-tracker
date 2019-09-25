// Character Counter jQuery plugin version 1.0
// (c) 2013 Ville Hellman
//
// http://github.com/efexen/jquery-character-counter
//
// Released under MIT license.
(function($) {
  $.fn.characterCounter = function() {
    return this.each(function() {
      var $this = $(this);
      var max_length = $this.data("max-length");

      if (max_length === undefined) {
        throw "jQuery Character Counter: Couldn't find data-max-length attribute on attached element"
      }

      if ($this.next(".character_counter").length > 0) { return; }
      var counter_label = $("<p class='character_counter'></p>");
      $this.after(counter_label);

      function updateCount(charCount) {
        counter_label.text(max_length - charCount);
        counter_label.toggleClass("invalid", (max_length - charCount) < 0);
      }

      updateCount($this.val().length);

      $this.on('keyup', function() {
        updateCount($(this).val().length);
      });
    });
  };
})(jQuery);