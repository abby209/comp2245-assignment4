document.getElementById('searchButton').addEventListener('click', function() {
    // Create an AJAX request
    const xhr = new XMLHttpRequest();

    // Handle the response
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Display the list of superheroes in an alert
            alert(xhr.responseText);
        } else {
            // Handle errors if the request fails
            alert('Failed to fetch superheroes');
        }
    };

    // Open and send the request
    xhr.open('GET', 'superheroes.php'); // Replace 'superheroes.php' with your actual endpoint
    xhr.send();
});
