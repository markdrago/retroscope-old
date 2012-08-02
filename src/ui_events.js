function UiEvents(scoreboard) {
    this.scoreboard = scoreboard;

    this.init_events();
}

UiEvents.prototype.init_events = function() {
    $("#toggle_debug").on('click', function(event) {
        $("#debug").toggle();
    });

    //update scoreboard every second
    var that = this;
    setInterval(function() {
        that.update_scoreboard();
    }, 3000);
};

UiEvents.prototype.update_scoreboard = function() {
    this.update_scoreboard_item("total_frame_time");
    this.update_scoreboard_item("captor_time");
    this.update_scoreboard_item("copy_to_canvas_time");
    this.update_scoreboard_item("to_data_url_time");
    this.update_scoreboard_item("update_display_time");
}

UiEvents.prototype.update_scoreboard_item = function(name) {
    $("#" + name).text(this.scoreboard.get_avg_item(name).toFixed(2));
}
