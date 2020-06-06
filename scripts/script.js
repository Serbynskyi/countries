function showCountries(filterValue) {

	$("#loader").attr("style","{opacity: '1'}");
	$("section").html("");
	$("#progressLabel").html("Initiated");

	var countries = [];

	var xhr = new XMLHttpRequest();

	xhr.open('GET', filterValue, false);

	xhr.send();

	if (xhr.status != 200) {
  		alert( xhr.status + ': ' + xhr.statusText );
	} else {
		countries = JSON.parse(xhr.responseText);
	}

	$("#progressLabel").html("Loading");

	for (var i = 0; i < countries.length; i++) {
		$("#progressbar").attr("value", (i + 1 ) / countries.length);
		
		var countryTimezonesList = "";
		for (var j = 0; j < countries[i].timezones.length; j++) {
			countryTimezonesList += `<li>${countries[i].timezones[j]}</li>`
		}

		var countryCurrenciesList = "";
		for (var j = 0; j < countries[i].currencies.length; j++) {
			countryCurrenciesList += `<li>${countries[i].currencies[j].code} ${countries[i].currencies[j].symbol}</li>`
		}

		country = `<div class="country">
						<p><img src="${countries[i].flag}"></p>
						<h1>${countries[i].name}</h1>
						<p>Capital : <b>${countries[i].capital}</b></p>
						<p>Region : <b>${countries[i].region}</b></p>
						<p>Population : <b>${countries[i].population}</b></p>
						<p>Timezones : <b><ul>${countryTimezonesList}</ul></b></p>
						<p>Currencies : <b><ul>${countryCurrenciesList}</ul></b></p>
						<p>Name translations : <b><ul>
													<li>de: ${countries[i].translations.de}</li>
													<li>es: ${countries[i].translations.es}</li>
													<li>it: ${countries[i].translations.it}</li>
												</ul></b></p>
					</div>`;
    	$("section").append(country);
	};

	$("#progressLabel").html("Loaded");
	$("#loader").animate({opacity: '0'}, 2000);
};

$(document).ready(function(){

	showCountries("https://restcountries.eu/rest/v2/all");

	$("input").on('change',function(){
		switch($(this).attr("value")) {
  			case 'all':  
  				showCountries("https://restcountries.eu/rest/v2/all");
				break;
  			case 'africa':  
  				showCountries("https://restcountries.eu/rest/v2/region/africa");
				break;
  			case 'americas':  
  				showCountries("https://restcountries.eu/rest/v2/region/americas");
				break;
  			case 'asia':
  				showCountries("https://restcountries.eu/rest/v2/region/asia");  
				break;
  			case 'europe':  
  				showCountries("https://restcountries.eu/rest/v2/region/europe");
 				break;
  			case 'oceania':  
  				showCountries("https://restcountries.eu/rest/v2/region/oceania");
 				break;
		};
	});
});