$(document).ready(function() {
  $('#searchButton').on('click', function() {
    var userInput = $('#searchInput').val().trim();
    var resultDiv = $('#result');

    var sanitizedInput = encodeURIComponent(userInput);

    $.ajax({
      url: 'superheroes.php',
      data: { query: sanitizedInput },
      dataType: 'json',
      success: function(data) {
        resultDiv.empty();

        if (userInput !== '') {
          if (data.length > 0) {
            var foundSuperhero = findSuperhero(data, userInput);
            if (foundSuperhero) {
              displaySuperhero(foundSuperhero, resultDiv);
            } else {
              resultDiv.html('Superhero not found');
            }
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

  function findSuperhero(superheroes, query) {
    return superheroes.find(function(superhero) {
      return (
        superhero.alias.toLowerCase() === query.toLowerCase() ||
        superhero.name.toLowerCase() === query.toLowerCase()
      );
    });
  }

  function displaySuperhero(superhero, resultDiv) {
    resultDiv.html(`
      <h3>${superhero.alias}</h3>
      <h4>${superhero.name}</h4>
      <p>${superhero.biography}</p>
    `);
  }
});
