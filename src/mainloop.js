function MainLoop(captor, buffer, dispatcher, scoreboard) {
    this.fps = 30;
    this.max_fps = 30;
    this.captor = captor;
    this.buffer = buffer;
    this.dispatcher = dispatcher;

    this.scoreboard = scoreboard;
    this.scoreboard.create_avg_item("total_frame_time", 100);
    this.scoreboard.create_avg_item("captor_time", 100);
    this.scoreboard.create_avg_item("buffer_add_time", 100);
    this.scoreboard.create_avg_item("update_display_time", 100);
    this.scoreboard.create_avg_item("garbage_collect_time", 100);
    this.scoreboard.create_avg_item("wait_time", 100);
    this.scoreboard.create_count_item("fps_limit");
    this.scoreboard.create_count_item("fps");
    this.scoreboard.report_count_item("fps", this.fps);
};

MainLoop.prototype.run = function() {
    /* consider adjusting the fps every 10 seconds */
    var that = this;
    setInterval(function() {
        that.adjust_fps();
    }, 10000);

    this.loop();
};

MainLoop.prototype.loop = function() {
    var start = (new Date).getTime();

    var frame = this.captor.get_frame();
    var captor_time = (new Date).getTime();

    this.buffer.append_frame(frame);
    this.dispatcher.update_displays(this.fps);
    var update_display_time = (new Date).getTime();

    this.buffer.collect_garbage(this.dispatcher.get_max_delay() * this.fps);

    this.scoreboard.report_avg_item("captor_time", captor_time - start);
    this.scoreboard.report_avg_item("update_display_time", update_display_time - captor_time);
    this.scoreboard.report_avg_item("total_frame_time", (new Date).getTime() - start);

    //reschedule this method to run X ms from now
    //time that should lapse from start to start
    var target_time = 1000 / this.fps;
    var end_time = (new Date).getTime();
    var wait_time = target_time - (end_time - start);
    var that = this;
    setTimeout(function() {
        that.loop();
    }, Math.max(0, wait_time));

    this.scoreboard.report_avg_item("wait_time", wait_time);
};

MainLoop.prototype.adjust_fps = function() {
    /* get a sense for how quickly the loop is running */
    var frame_time = this.scoreboard.get_avg_item("total_frame_time");

    /* what fps could be supported given the time it took to draw
     * the last few frames */
    var fps_limit = 1000 / frame_time;

    this.scoreboard.report_count_item("fps_limit", fps_limit);

    if (fps_limit < this.fps) {
        /* going too fast - reduce the fps */
        this.set_fps(fps_limit);
    } else {
        /* could potentially go faster */
        if (this.fps < this.max_fps) {
            /* set fps to lower of highest possible speed and max fps */
            this.set_fps(Math.min(fps_limit, this.max_fps));
        }
    }
};

MainLoop.prototype.set_fps = function(fps) {
    /* truncate fps to a whole number */
    if (fps - fps.toFixed(0) != 0) {
        /* if fps is not a whole number drop 0.5 and then
         * round to get truncate behavior */
        fps = fps - 0.5;
        fps = new Number(fps.toFixed(0));
    }

    this.fps = fps;
    this.scoreboard.report_count_item("fps", this.fps);
};
