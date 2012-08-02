function MainLoop(captor, buffer, dispatcher, scoreboard) {
    this.fps = 30;
    this.captor = captor;
    this.buffer = buffer;
    this.dispatcher = dispatcher;

    this.scoreboard = scoreboard;
    this.scoreboard.create_avg_item("total_frame_time", 100);
    this.scoreboard.create_avg_item("captor_time", 100);
    this.scoreboard.create_avg_item("buffer_add_time", 100);
    this.scoreboard.create_avg_item("update_display_time", 100);
    this.scoreboard.create_avg_item("garbage_collect_time", 100);
};

MainLoop.prototype.run = function() {
    var that = this;
    setInterval(function() {
        that.loop()
    }, 1000 / this.fps);
};

MainLoop.prototype.loop = function() {
    var start = (new Date).getTime();

    var frame = this.captor.get_frame();
    var captor_time = (new Date).getTime();

    this.buffer.append_frame(frame);
    this.dispatcher.update_displays(this.fps);
    var update_display_time = (new Date).getTime();

    this.buffer.collect_garbage(this.dispatcher.get_max_delay() * this.fps);
    var end_time = (new Date).getTime();

    this.scoreboard.report_avg_item("captor_time", captor_time - start);
    this.scoreboard.report_avg_item("update_display_time", update_display_time - captor_time);
    this.scoreboard.report_avg_item("total_frame_time", end_time - start);
};
