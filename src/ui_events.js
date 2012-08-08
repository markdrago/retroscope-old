function UiEvents(scoreboard) {
    this.scoreboard = scoreboard;

    var that = this;
    $(document).ready(function() {
        that.init_events();
    });
}

UiEvents.prototype.init_events = function() {
    $("#toggle_debug").on('click', function(event) {
        $("#debug").toggle();
    });

    this.update_delay_labels();

    var that = this;

    //update scoreboard every second
    setInterval(function() {
        that.update_scoreboard();
    }, 3000);

    $(".delaylabel").on('click', function(event) {
        $(this).hide();
        var selectbox = "<select class=\"delaychanger\">";
        selectbox += "<option value=\"2\">2 seconds</option>";
        selectbox += "<option value=\"4\">4 seconds</option>";
        selectbox += "<option value=\"6\">6 seconds</option>";
        selectbox += "<option value=\"8\">8 seconds</option>";
        selectbox += "<option value=\"10\">10 seconds</option>";
        selectbox += "<option value=\"15\">15 seconds</option>";
        selectbox += "<option value=\"30\">30 seconds</option>";
        selectbox += "</select>";
        $(this).closest('.meta').append(selectbox);

        var delay = $(this).closest('.box').find(".delay").data('delay');
        $(this).closest('.meta').find("select").val(delay);
    });

    $(".meta").on('change blur', '.delaychanger', function(event) {
        var box = $(this).closest('.box');
        box.find(".delay").data('delay', $(this).val());
        $(this).remove();
        that.update_delay_labels();
        box.find(".delaylabel").show();
    });
};

UiEvents.prototype.update_scoreboard = function() {
    this.update_scoreboard_item("total_frame_time");
    this.update_scoreboard_item("captor_time");
    this.update_scoreboard_item("copy_to_canvas_time");
    this.update_scoreboard_item("to_data_url_time");
    this.update_scoreboard_item("update_display_time");

    var buffer_in_memory = this.scoreboard.get_count_item("buffer_in_memory");
    buffer_in_memory /= 1048576;
    $("#buffer_in_memory").text(buffer_in_memory.toFixed(2));
}

UiEvents.prototype.update_scoreboard_item = function(name) {
    $("#" + name).text(this.scoreboard.get_avg_item(name).toFixed(2));
}

UiEvents.prototype.update_delay_labels = function() {
    $(".delay").each(function(index, elem) {
        var delay = $(elem).data('delay');
        var label = delay + " seconds ago";
        $(elem).closest('.box').find(".delaylabel").text(label);
    });
}
