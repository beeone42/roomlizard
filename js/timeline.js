function Timeline (el) {
    this.data = [
	['Accueil',          'ns@staff.42.fr', [09, 00], [11, 00]],
	['CSS Fundamentals', 'Andre AUBIN', [11, 30], [14, 00]],
	['Intro JavaScript', 'sebastien.benoit@gmail.com', [14, 30], [16, 15]],
	['Advanced Javascript', 'jacob@staff.42.fr', [16, 30], [19, 00]]
    ];
    this.color = "#fff";
    this.bgcolor = "#00e";
    this.row_color = "#d00";
    this.row_bgcolor = "#00f";
    this.row_height = 50;
    this.row_padding = 5;
    this.elname = el;
    this.el = $(el);
    this.x = this.el.width();
    this.y = this.el.height();
    this.first_hour = 7;
    this.last_hour = 19;
    this.graph_padding = 10;
    this.graph_cell = 0;
    this.axis_padding_top = 20;
    this.axis_font_family = "Arial";
    this.axis_font_size = 13;
    this.row_font_family = "Arial";
    this.row_font_size = 18;
    this.row_font_color = "white";
    this.tooltip_width = 300;
    this.tooltip_height = 100;
    this.tooltip_bgcolor = "#fff";
    this.tooltip_opacity = 0.8;

    this.parse_data = function() {
	this.graph_left = this.graph_padding;
	this.graph_right = this.x - this.graph_padding;
	this.graph_witdh = this.graph_right - this.graph_left;

	for (i = 0; i < this.data.length; i++)
	{
	    if (i == 0)
	    {
		this.first_hour = this.data[i][2][0];
		this.last_hour = this.data[i][3][0];
	    }
	    if (this.data[i][2][0] < this.first_hour)
		this.first_hour = this.data[i][2][0];
	    if (this.data[i][3][0] > this.last_hour)
		this.last_hour = this.data[i][3][0];
	    if ((this.data[i][3][0] == this.last_hour)
		&& (this.data[i][3][1] > 0))
		this.last_hour++;
	}
	    
	this.nb_hours = this.last_hour - this.first_hour;
	if (this.nb_hours > 0)
	    this.graph_cell = Math.round(this.graph_witdh) / Math.round(this.nb_hours);
	this.axis_left = this.graph_left;
	this.axis_top = this.row_height + this.axis_padding_top;


    }

    this.t_to_x = function(h, m) {
	t = parseFloat(h) + (parseFloat(m)  / 60.0);
	return (parseFloat(this.graph_cell) * t);
    };

    this.t_to_str = function(h, m) {
	tmp = h + ":";
	if (m < 10)
	    tmp = tmp + "0";
	tmp = tmp + m;
	return (tmp);
    };

    this.draw = function () {
	this.parse_data();
	res = '<div style="position: relative;">'
	    + '<div dir="ltr" style="position: relative; width: ' + this.x +'px; height: ' + this.y + 'px;">'
            + '<div style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%;">'
	    + '<svg width="' + this.x + '" height="' + this.y + '" aria-label="timeline" style="overflow: hidden;">'
	    + '<defs id="defs"></defs>'
	    + '<g>'
	    + '<rect x="0" y="0" width="' + this.x + '" height="' + this.y
	    + '" stroke="none" stroke-width="0" fill="' + this.bgcolor + '"></rect>'
	    + '<rect x="' + this.graph_left + '" y="0" width="' + this.graph_witdh + '" height="' + this.row_height
	    + '" stroke="#808080" stroke-width="1" fill="' + this.row_bgcolor + '"></rect>'
	    + '</g>';
	u = Math.round;

	// graduations

	res = res + '<g>';
	for (i = 0; i <= this.nb_hours; i++)
	{
	    x = u(this.graph_left + this.t_to_x(i, 0));
	    res = res + '<path d="M' + x + ',0L' + x + ',' + this.row_height
		+ '" stroke="#2e5dc1" stroke-width="1" fill-opacity="1" fill="none"></path>';
	}
	res = res + '</g>';

	// x axis labels

	res = res + '<g>';
	for (i = 0; i <= this.nb_hours; i++)
	{
	    res = res + '<text x="' + u(this.axis_left + this.t_to_x(i, 0))
		+ '" y="' + this.axis_top
		+ '" text-anchor="' + (i == 0 ? 'start' : (i == this.nb_hours ? 'end' : 'middle'))
		+ '" font-family="' + this.axis_font_family + '" font-size="' + this.axis_font_size 
		+'" stroke-width="0" stroke="#000000">' + u(this.first_hour + i) + '</text>';
	}
	res = res + '</g>';

	// items rectangles + labels

	res = res + '<g>';
	for (i = 0; i < this.data.length; i++)
	{
	    d = this.data[i];
	    label = d[0];
	    owner = d[1];
	    start = d[2];
	    stop = d[3];
	    sstart = this.t_to_str(start[0], start[1]);
	    sstop = this.t_to_str(stop[0], stop[1]);
	    shoraire = sstart + " - " + sstop;
	    x1 = this.graph_left + this.t_to_x(u(start[0] - this.first_hour), start[1]);
	    x2 = this.graph_left + this.t_to_x(u(stop[0] - this.first_hour), stop[1]);
	    w = x2 - x1;
	    max = u((w * 1.5) / this.row_font_size);
	    res = res + '<rect id="T_' + i + '" class="timerect" '
		+ '" x="' + x1 + '" y="' + this.row_padding + '" width="' + u(x2 - x1) + '" height="'
		+ u(this.row_height - this.row_padding * 2)
		+ '" stroke="#000000" stroke-width="0" fill="' + this.row_color + '"></rect>';

	    fulllabel = label;
	    if (label.length > max)
		label = label.substring(0, max - 3) + "...";
	    res = res + '<text title="' + fulllabel + '" owner="' + owner +'" horaire="' + shoraire
		+ '" id="TT_' + i + '" rid="T_' + i
		+ '" x="' + u(x1 + 10) + '" y="' + u(this.row_height - this.row_padding - 12)
		+ '" text-anchor="start" width="' + u(x2 - x1) + '"' 
		+ ' font-family="' + this.row_font_family + '" font-size="' + this.row_font_size 
		+ '" stroke-width="0" stroke="#000000" fill="' + this.row_font_color + '">' + label + '</text>';

	}
	res = res + '</g>';

	// tooltips

	res = res + '</svg></div>'
            + '<div id="tl_tooltip" style="position: absolute; padding: 5px; '
	    + 'left: 0px; top: -' +u(20 + this.tooltip_height) + 'px; width: '
	    + this.tooltip_width + 'px; height:' + this.tooltip_height + 'px; opacity: ' + this.tooltip_opacity + '; '
	    + 'background-color: ' + this.tooltip_bgcolor + '; color: #000; visibility: hidden;"></div>'
	    + '</div></div>';

	this.el.html(res);

	for (i = 0; i < this.data.length; i++)
	{
	    $("#TT_" + i).click(function (){
		//alert($(this).attr("title"));
		rid = "#" + $(this).attr("rid");
		$(".timerect").attr("stroke-width", "0px");
		$(rid).attr("stroke-width", "5px");
		$("#tl_tooltip").html(
		    $(this).attr("title") + "<br />\n"
			+ $(this).attr("owner") + "<br />\n"
			+ $(this).attr("horaire"));
		$("#tl_tooltip").css("visibility", "visible");
		x = u($(this).attr("x"));
		max = u(u(graph_right) - u(tooltip_width));
		if (x > max)
		    x = max;
		$("#tl_tooltip").css("left", x + "px");
	    });
	    $("#T_" + i).click(function (){
		$("#T" + $(this).attr('id')).trigger("click");
	    });
	}
    };

    this.add_item = function (label, tooltip, start, end) {
    };
    return (this);
}