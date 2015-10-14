<!-- Header -->
<header>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <h1>Occupee</h1>
        <h2>14h00 - 16h00</h2>
      </div>
    </div>
  </div>
</header>
<section>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div id="timeline2" style="height: 80px;"></div>
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
   }
    </script>
