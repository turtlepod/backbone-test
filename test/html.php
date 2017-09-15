<?php
/**
 * HTML Test.
 */
?>

<div id="speakers">

	<p id="add-person-fields"><input id="name-input" type="text" placeholder="Name" name="bbtest" value=""> <input id="url-input" type="url" placeholder="http://" name="bbtest" value=""> <a id="add-person" class="button">Add</a></p>

	<h3>Lists:</h3>

	<ul id="persons"></ul>

</div>

<script id="tmpl-bbt-li" type="text/html">
	<i class="remove-person dashicons dashicons-trash" data-cid="{{data.cid}}"></i>
	<input type="text" name="bbtest[{{data.cid}}][name]" value="{{data.name}}">
	<input type="text" name="bbtest[{{data.cid}}][url]" value="{{data.url}}">
</script>