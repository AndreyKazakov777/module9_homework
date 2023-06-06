// Напишите код приложения, интерфейс которого представляет собой input и кнопку. 
// В input можно ввести любое число. При клике на кнопку происходит следующее:

// Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
// Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR 
// по URL https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.

//Функция-обертка над XMLHttpRequest, осуществляющая запрос
   //url 
 
   function useRequest(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	
	xhr.onload = function() {
	  if (xhr.status != 200) {
		console.log('Статус ответа: ', xhr.status);
	  } else {
		const result = JSON.parse(xhr.response);
		
		if (callback) {
		  callback(result);
		}
	  }
	  
	};
	
	
	xhr.onerror = function() {
	  console.log('Ошибка! Статус ответа: ', xhr.status);
	};
	
	xhr.send();
  }; 
  
  // Ищем ноду для вставки результата запроса
  const resultNode = document.querySelector('.error');
  // Ищем кнопку, по нажатии на которую будет запрос
  const btnNode = document.querySelector('.btn-request');
  const value = document.querySelector('input');
  
  
  
  
	// Функция обработки полученного результата
	// apiData - объект с результатом запроса
	
   function displayResult(apiData) {
	let cards = '';
	// console.log('start cards', cards);
	

	if( ! Number(value.value) || Number(value.value)  >= 10 || Number(value.value) <= 1 ) {
		resultNode.innerHTML = 'Число вне диапазона от 1 до 10';
	}else {
        apiData.forEach(item => {
			const cardBlock = `
			  <div class="card">
				<img
				  src="${item.download_url}"
				  class="card-image"
				/>
				<p>${item.author}</p>
			  </div>
			`;
			cards = cards + cardBlock;
		  });
		  resultNode.innerHTML = cards;
	}
  }
  
  // Вешаем обработчик на кнопку для запроса
  btnNode.addEventListener('click', () => {
	useRequest(`https://picsum.photos/v2/list?limit=10{parseInt(value.value)}`, displayResult);
  });