// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .

Rails.ajax({
  url: "/tokens",
  type: "POST",
  success: function(data) {
    Twilio.Chat.Client
      .create(data.token)
      .then(function(chatClient) {
        chatClient.getChannelByUniqueName("general")
          .then(function(channel) {

          })
          .catch(function(){
            chatClient.createChannel({
              uniqueName: "general",
              friendlyName: "General Chat Channel"
            }).then(function(channel) {
              if(channel.state.status !== "joined") {
                channel.join().then(function(channel) {
                  console.log("Joined General Channel");
                })
              }
            })
          })
      });
  }
});
