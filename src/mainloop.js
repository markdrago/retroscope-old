function MainLoop(captor, buffer, dispatcher) {
    this.fps = 10;
    this.captor = captor;
    this.buffer = buffer;
    this.dispatcher = dispatcher;
};

MainLoop.prototype.run = function() {
    var that = this;
    setInterval(function() {
        that.loop()
    }, 1000 / this.fps);
};

MainLoop.prototype.loop = function() {
    var frame = this.captor.get_frame();
    this.buffer.append_frame(frame);
    this.dispatcher.update_displays(this.fps);
    this.buffer.collect_garbage(this.dispatcher.get_max_delay() * this.fps);
};
