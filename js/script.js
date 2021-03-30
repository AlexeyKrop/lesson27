// функция, которая фильтрует значения по типу из (массива преобразованного values-там у нам все значение из input) (тип данных выбранное в значение в select совпадало с типом данных введенное в input)
const filterByType = (type, ...values) =>
    values.filter((value) => typeof value === type),
  hideAllResponseBlocks = () => {
    // записываем в переменную массив с элементами внутри div.dialog__response-block
    const responseBlocksArray = Array.from(
      document.querySelectorAll("div.dialog__response-block")
    );
    // перебор элементов, присваиваем display none каждому элементу
    responseBlocksArray.forEach((block) => (block.style.display = "none"));
  },
  showResponseBlock = (blockSelector, msgText, spanSelector) => {
    // запускаем функцию hideAllResponseBlocks
    hideAllResponseBlocks();
    // присваиваем display block элементу с классом, который приходит в параметр blockSelector
    document.querySelector(blockSelector).style.display = "block";
    // если span есть
    if (spanSelector) {
      // то присваиваем результат в данный span
      document.querySelector(spanSelector).textContent = msgText;
    }
  },
  showError = (msgText) =>
    showResponseBlock(".dialog__response-block_error", msgText, "#error"),
  // функция которая показывает результаты в теле которой попадаем в функцию showResponseBlock
  showResults = (msgText) =>
    showResponseBlock(".dialog__response-block_ok", msgText, "#ok"),
  // функция если у нас нет введенного значения
  showNoResults = () => showResponseBlock(".dialog__response-block_no-results"),
  // функция проверки по типу данных
  tryFilterByType = (type, values) => {
    try {
      /* присваиваем переменной valuesArray строку со значение введенным в инпут
			тут происходит вызов функции filterByType с двумя параметрами type и values,
			 мы попадаем во вторую строку, где у нас функция фильтр, далее 
			с помощью join мы преобразуем в строку наши введенные значение
			*/
      const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
      /* присваиваем переменной alertMsg строку если есть введенное значение
			`Данные с типом ${type} - тип в select: ${valuesArray}-введенное значение`, 
			если значения нет, то `Отсутствуют данные типа ${type}`;
			*/
      const alertMsg = valuesArray.length
        ? `Данные с типом ${type}: ${valuesArray}`
        : `Отсутствуют данные типа ${type}`;
      // запускаем функцию showResults с параметром alertMsg попадаем в 19 строку
      showResults(alertMsg);
      /* если мы вводим данные с ошибкой(к примеру строку без кавычек при выборе в select string)
			попадаем в catch которая выдаст ошибку в блоке результаты, но код будет продолжаться дальше*/
    } catch (e) {
      showError(`Ошибка: ${e}`);
    }
  };
// присваиваем переменной filterButton кнопку с id = filter-btn;
const filterButton = document.querySelector("#filter-btn");
// навешиваем событие при клике на кнопку(переменная filterButton)
filterButton.addEventListener("click", (e) => {
  //присваиваем переменной  typeInput select(в этом поле выбираем тип данных) c id = type
  const typeInput = document.querySelector("#type");
  //присваиваем переменной  dataInput input(в это поле вводим значение) c id = data
  const dataInput = document.querySelector("#data");
  // проверка на пустоту введенного значение в поле "Данные"
  if (dataInput.value === "") {
    // если поле пустое , то выводится сообщение
    dataInput.setCustomValidity("Поле не должно быть пустым!");
    // и запуск функции showNoResults
    showNoResults();
  } else {
    // если поле не пустое, то указываем пустую строку впараметре(т.к нет ошибки пользователя)
    dataInput.setCustomValidity("");
    // отменяем стандартные действия браузера
    e.preventDefault();
    // запускаем функцию с параметрами указаные в скобках(с помощью trim убираем пробелы)
    tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
  }
});
