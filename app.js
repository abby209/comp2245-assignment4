$(document).ready(function() {
  $('#searchButton').on('click', function() {
    var userInput = $('#searchInput').val().trim().toLowerCase();
    var resultDiv = $('#result');

    var sanitizedInput = encodeURIComponent(userInput);

    $.ajax({
      url: 'superheroes.php',
      data: { query: sanitizedInput },
      dataType: 'json',
      success: function(data) {
        resultDiv.empty();

        if (userInput !== '') {
          var foundSuperheroes = searchSuperheroes(data, userInput);
          if (foundSuperheroes.length > 0) {
            displaySuperheroes(foundSuperheroes, resultDiv);
          } else {
            resultDiv.html('Superhero not found');
          }
        } else {
          showAliases(data, resultDiv); // Display aliases when search is empty
        }
      },
      error: function() {
        resultDiv.html('Error: Unable to fetch data');
      }
    });
  });

  function showAliases(superheroes, resultDiv) {
    superheroes.forEach(function(superhero) {
      resultDiv.append(`<p>${superhero.alias}</p>`);
    });
  }

  function searchSuperheroes(superheroes, query) {
    var found = [];
    superheroes.forEach(function(superhero) {
      if (superhero.alias.toLowerCase().includes(query) || superhero.name.toLowerCase().includes(query)) {
        found.push(superhero);
      }
    });
    return found;
  }

  function displaySuperheroes(superheroes, resultDiv) {
    superheroes.forEach(function(superhero) {
      resultDiv.append(`
        <h3>${superhero.alias}</h3>
        <h4>${superhero.name}</h4>
        <p>${superhero.biography}</p>
      `);
    });
  }
});
