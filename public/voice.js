  var accessToken = "a3c5981fbb6a44cda1f428b5da4361f0"
  var subscriptionKey = "1055e537-3ab0-4f92-b3a4-e2d7342bfc7f"
  var baseUrl = "https://api.api.ai/v1/"
  var recognition


    $(document).ready(function() {
      $("#input").keypress(function(event) {
        if (event.which == 13) {
          //if code error with browser , send event error 
          event.preventDefault()
          send()
        }
      })
      $("#rec").click(function(event) {
        //input voice to switchRecognition
        switchRecognition()
      })
    })

    //voice insert to function here
    function switchRecognition() {
      if (recognition != null) {
          stopRecognition()
      } else {
          startRecognition()
      }
    }
    /** stop function fisrt if ()*/
     // voice if (recognition) run function here!
    function stopRecognition() {
      if (recognition) {
        //method .stop()
        recognition.stop()
        recognition = null
      }
        updateRec();
    }

    //check change (button text)
      function updateRec() {
      $("#rec").text(recognition ? "Stop" : "Speak")
    }
    /////////////////////////////////////////////
      // satrt function () eles {}

    function startRecognition() {
      recognition = new webkitSpeechRecognition()
        //webkit () function basic voice input
        recognition.onstart = function(event) {
        updateRec()
      }

      
      recognition.onresult = function(event) {
        var text = "";
          for (var i = event.resultIndex; i < event.results.length; ++i) {
            text += event.results[i][0].transcript;
          }
          setInput(text);
        stopRecognition();
      };
      recognition.onend = function() {
        stopRecognition();
      };
      recognition.lang = "en-US";
      recognition.start();
    }
  
    
  
    function setInput(text) {
      $("#input").val(text);
      send();
    }
    
    function send() {
      var text = $("#input").val();
      $.ajax({
        type: "POST",
        url: baseUrl + "query/",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
          "Authorization": "Bearer " + accessToken,
          "ocp-apim-subscription-key": subscriptionKey
        },
        data: JSON.stringify({ q: text, lang: "en" }),
        success: function(data) {
          setResponse(JSON.stringify(data, undefined, 2));
        },
        error: function() {
          setResponse("Internal Server Error");
        }
      });
      setResponse("Loading...");
    }
    function setResponse(val) {
      $("#response").text(val);
    }