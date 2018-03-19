var google = require('googleapis');
     var youtube = google.youtube('v3');
     var authClient = new google.auth.JWT(
          'plataforma@api-project-1011506978456.iam.gserviceaccount.com',
          'youtube.pem',
          null,
       ['https://www.googleapis.com/auth/youtube','https://www.googleapis.com/auth/youtube.upload'],
       null
     );
    authClient.authorize(function(err, tokens) {
        if (err) {
           console.log(err);
           return;
    }
    youtube.videos.list({auth:authClient,part:'snippet',chart:'mostPopular'}, function(err, resp) {
       console.log(resp);
       console.log(err);
     });
    });