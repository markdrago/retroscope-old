function Dispatcher(buffer) {
    this.buffer = buffer;
}

Dispatcher.prototype.update_displays = function(fps) {
    var displays = $(".delay");
    var that = this;
    displays.each(function(index, elem) {
        that.update_display(elem, fps);
    });
}

Dispatcher.prototype.update_display = function(display, fps) {
    var delay_seconds = $(display).data("delay");

    var frame_offset = fps * delay_seconds;

    if (this.buffer.get_frame_count() >= frame_offset) {
        display.src = this.buffer.get_frame(frame_offset);
    }
}

Dispatcher.prototype.get_max_delay = function() {
    var displays = $(".delay");
    var max_delay = 0;
    displays.each(function(index, elem) {
        max_delay = Math.max(max_delay, $(elem).data("delay"));
    });
    return max_delay;
}
