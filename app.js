$(document).ready(function(){

  // BUBBLES ANIMATION
  // Define a blank array for the effect positions. This will be populated based on width of the title.
  var bArray = [];
  // Define a size array, this will be used to vary bubble sizes
  var sArray = [4,6,8,10];
  // Push the header width values to bArray
  for (var i = 0; i < $('.bubbles').width(); i++) {
    bArray.push(i);
  }
  // Function to select random array element
  // Used within the setInterval a few times
  function randomValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  // setInterval function used to create new bubble every 350 milliseconds
  setInterval(function(){
    // Get a random size, defined as variable so it can be used for both width and height
    var size = randomValue(sArray);
    // New bubble appeneded to div with it's size and left position being set inline
    // Left value is set through getting a random value from bArray
    $('.bubbles').append('<div class="individual-bubble" style="left: ' + randomValue(bArray) + 'px; width: ' + size + 'px; height:' + size + 'px;"></div>');
    // Animate each bubble to the top (bottom 100%) and reduce opacity as it moves
    // Callback function used to remove finsihed animations from the page
    $('.individual-bubble').animate({
        'bottom': '100%',
        'opacity' : '-=0.7'
      }, 2000, function(){
        $(this).remove()
      }
    );
  }, 150); // end of Bubbles


    // GLOBAL VARIABLES and conditional to load data from local storage
    var timeStamp = new Date();
    if (localStorage.length !== 0) {
      for (var prop in localStorage) {
        if (prop !== 'undefined' && localStorage.getItem(prop)) {
          $('ul').prepend('<li class="toDos" data-storage-key="'+prop+'" oncontextmenu="return false;">' + localStorage.getItem(prop) + '</li>');
        }
      }
    }

    // ADD FUNCTION via click
    $('#addButton').on('click', function(){
      var input = $('.userInput').val();
      var toDo = $('.userInput').val() + '<div class="time"><em><font size="1">' + "  created " + moment(timeStamp).format('llll') + '</font></em></div>';

      if (input === ''){
        alert("empty input");
      } else {
          var key = $('.userInput').val();

          if (!localStorage.hasOwnProperty(key)) {
            var toDoListing = '<li class="toDos" data-storage-key="'+key+'" oncontextmenu="return false">' + toDo + '</li>';
            localStorage.setItem(key, toDo);
            $('ul').prepend(toDoListing);
          } else {
            alert ('duplicate entry found');
          }
        }
      });

    // ADD FUNCTION via ENTER
    $('.userInput').on('keyup', function(event){
      var input = $('.userInput').val();
      var toDo = $('.userInput').val() + '<div class="time"><em><font size="1">' + "  created " + moment(timeStamp).format('llll') + '</font></em></div>';
      if (event.keyCode === 13) {
        if (input === '') {
          alert("empty input");
        } else {
          var key = $('.userInput').val();
          if (!localStorage.hasOwnProperty(key)) {
            var toDoListing = '<li class="toDos" data-storage-key="' + key + '" oncontextmenu="return false">' + toDo + '</li>';
            localStorage.setItem(key, toDo);
            $('ul').prepend(toDoListing);
            $('.userInput').val('');
          } else {
            alert('duplicate entry found');
          }
        }
      }
    });


  // EDIT FUNCTION
    $(document).on('contextmenu', 'li', function(event) {
      var x = event.currentTarget;
      var y = $(this).html();

      var deleteKey = $(x).attr('data-storage-key');
      var current = y.slice(0, -58);

      $(this).html('<textarea>' + current + '</textarea>');
      $('textarea').select();


      $('.toDos').keyup('li', function (event) {
        var key = $('textarea').val();
        localStorage.removeItem(deleteKey);

        if (event.keyCode === 13 || event.keyCode === 27) {
          var current = $('textarea').val();
          var toDo = $('textarea').val() + '<div class="time"><em><font size="1">' + "  edited " + moment(timeStamp).format('llll') + '</font></em></div>';
          $(this).html('<li class="toDos" data-storage-key="'+key+'" oncontextmenu="return false">' + toDo + '</li>');
          localStorage.setItem(key, toDo);
          $(this).contents().unwrap();
        }
      });
    });

    // DELETE FUNCTION
    $('ul').on('dblclick','li', function(event){
      var x = event.currentTarget;
      var deleteKey = $(x).attr('data-storage-key');
      localStorage.removeItem(deleteKey);
      $(this).toggleClass('strike').fadeOut('slow');
    });

    $('.userInput').focus(function() {
      $(this).val('');
    });

    // ANIMATE ON HOVER HELPER FUNCTIONS
    function animationHover(element, animation){
      element = $(element);
      element.hover(
        function() {
          element.addClass('animated ' + animation);
        },
        function(){
          //wait for animation to finish before removing classes
          window.setTimeout( function(){
            element.removeClass('animated ' + animation);
          }, 1500);
        });
    } // end of Animation for title



    //INVOKE ANIMATE FUNCTION ON SPECIFIC ELEMENTS
    animationHover('h2', 'rubberBand');
    animationHover('#addButton', 'rubberBand')

  }
); // end of doc.ready
