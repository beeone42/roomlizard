<?php

(@include_once("inc/config.php")) or die("Edit inc/config.php.sample first !");
require_once("inc/functions.php");

$view = chooser($_REQUEST['view']);
display_view($view);

?>