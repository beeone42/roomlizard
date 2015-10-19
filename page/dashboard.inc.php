<!-- Header -->
<header>
  <div class="container">
    <div class="row">
      <div class="col-lg-12 noselect">
        <h1 id="timeline_status">---</h1>
        <h2 id="timeline_time">---</h2>
      </div>
    </div>
  </div>
</header>
<section>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div id="timeline2" class="noselect" style="height: 80px;"></div>
      </div>
    </div>
  </div>
</section>

    <script type="text/javascript" src="js/timeline.js"></script>
    <script type="text/javascript">
   myOnLoad = function() {
     tl = Timeline("#timeline2");
     tl.bgcolor = "#3367d6";
     tl.row_bgcolor = "#3367d6";
     tl.draw();

     setInterval(function(){ 
	 tl.update();
	 $("#timeline_status").html(tl.current_name);
	 $("#timeline_time").html(tl.current_time);
       }, 1000);

   }
    </script>
