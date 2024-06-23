function thankyou(){
    alert('Thank you for contacting us!')
}

document.getElementById('btnReset').addEventListener('click', function() {
    document.getElementById('results').innerHTML = '';
});



let data;

fetch('travel.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
        console.log(data)
    })
    .catch(error => console.error('Error fetching data:', error));

document.getElementById('btnSearch').addEventListener('click', function() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    
    let results = [];

    if (!data) {
        console.error('Data not yet fetched');
        return;
    }

    if(input == "beach" || input == "beaches"){
        data.beaches.forEach(beach => {
            results.push(beach)
        });
    }else if(input == "temples" || input == "temple"){
        data.temples.forEach(temple => {
            results.push(temple);
        });
    }else if(input == "country" || input == "countries"){
        data.countries.forEach(country => {
            country.cities.forEach(city => {
                results.push(city);
            });
        });
    }

    console.log(results)
    displayResults(results);
});


function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (results.length === 0) {
        resultsDiv.innerHTML = 'No results found.';
        return;
    }

    results.forEach(result => {
        const item = document.createElement('div');
        item.classList.add('result-item');
        item.innerHTML = `
            <h2>${result.name}</h2>
            <img src="${result.imageUrl}" alt="${result.name}">
            <p>${result.description}</p>
            <a href=\"${result.imageUrl}\"><button>Visit</button></a>
        `;
        resultsDiv.appendChild(item);
    });
}