define(['Sockets'],

	function(io){

		var AppSockets = function(eventDispatcher){
 
			var connectSocket = function(){
				socket = io.connect();

				socket.on('connect_failed', function(reason) {
					console.error('[Socket.IO] Error: ', reason);
				}).on('connect', function() {
					console.log('[Socket.IO] Connected!');
				});

			}

			// Event that triggers establishes the connection socket
			eventDispatcher.on('app:loggedin', connectSocket);
		}

	return {
		initialize: function(eventDispatcher) {
			AppSockets(eventDispatcher);
		}
	}

});