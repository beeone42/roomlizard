<?php

include("inc/config.php");
include("inc/functions.php");

$view = chooser($_REQUEST['view']);
display_view($view);

?>