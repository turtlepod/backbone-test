<?php
/**
 * HTML Test.
 */
?>
<p id="add-person-fields"><input id="name-input" type="text" placeholder="Name" name="bbtest" value=""> <input id="url-input" type="url" placeholder="http://" name="bbtest" value=""> <a id="add-person" class="button">Add</a></p>

<h3>Lists:</h3>

<ul id="persons"></ul>

<?php /* TEMPLATES */ ?>
<script id="tmpl-bbt-li" type="text/html">
	<# if ( data.name ) { #>
		<li>
			<i class="remove-person dashicons dashicons-trash"></i>
			<# if ( '' === data.url ) { #>
				{{{data.name}}}
			<# } else { #>
				<a href="{{data.url}}" target="_blank">{{{data.name}}}</a>
			<# } #>
			<input type="hidden" name="bbtest[{{data.name}}][name]" value="{{data.name}}">
			<input type="hidden" name="bbtest[{{data.name}}][url]" value="{{data.url}}">
		</li>
	<# } #>
</script>