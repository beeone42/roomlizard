    <!-- jQuery -->
    <script src="js/jquery.js"></script>
    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>
    <!-- Plugin JavaScript -->
    <script src="js/jquery.easing.min.js"></script>
    <script src="js/classie.js"></script>
    <script src="js/cbpAnimatedHeader.js"></script>
    <script type="text/javascript">
       if (myOnLoad !== undefined)
	 myOnLoad();


     setInterval(function() {
       var today = new Date();
       var h = today.getHours();
       var m = today.getMinutes();
       m = pad(m);
       $("#clock").html(h + ":" + m);
     }, 1000);

function pad(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

    </script>
</body>
</html>
