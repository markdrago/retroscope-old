function Buffer(scoreboard) {
    this.scoreboard = scoreboard;
    this.buffer = new Array();
    this.buffer_in_memory = 0;

    this.scoreboard.create_count_item("buffer_in_memory");
}

Buffer.prototype.append_frame = function(frame) {
    this.buffer.push(frame);
    this.buffer_in_memory += frame.length;
    this.scoreboard.report_count_item("buffer_in_memory", this.buffer_in_memory);
};

Buffer.prototype.get_frame = function(frame_offset) {
    /* to get a delay of 0 we show the frame at length - 1 */
    if (frame_offset == 0) {
        frame_offset = 1;
    }

    return this.buffer[this.buffer.length - frame_offset]
};

Buffer.prototype.collect_garbage = function(frame_retention) {
    while (this.buffer.length > frame_retention) {
        var oldframe = this.buffer.shift();
        if (oldframe != undefined) {
            this.buffer_in_memory -= oldframe.length
        }
    }
};

Buffer.prototype.get_frame_count = function() {
    return this.buffer.length;
}
