var peer = new Peer('Alo');
var conn = peer.connect('new connect');
peer.on('open', function(id) {
	console.log('My peer ID is: ' + id);
});
peer.on('connection', function(conn) { 
    console.log('new connect', conn.id)
});