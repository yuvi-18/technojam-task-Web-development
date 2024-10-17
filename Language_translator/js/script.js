const selectTag = document.querySelectorAll("select"),
    fromText = document.querySelector(".textFrom"),
    fromSpeech = document.querySelector(".fromSpeech"),
    toSpeech = document.querySelector(".toSpeech"),
    fromCopy = document.querySelector(".fromCopy"),
    toCopy = document.querySelector(".toCopy"),
    switchIcon = document.querySelector(".switch"),
    toText = document.querySelector(".textTo"),
    translateBtn = document.querySelector("button");


selectTag.forEach((tag, id) => {
    for (const countryCode in countries) {
        let selected;
        if (id == 0 && countryCode == "en-GB") {
            selected = "selected"
        } else if (id == 1 && countryCode == "es-ES") {
            selected = "selected"
        }
        let option = `<option value="${countryCode}" ${selected}>${countries[countryCode]}</option>`
        tag.insertAdjacentHTML("beforeend", option)
    }
});

// for switching textarea and select tag values

switchIcon.addEventListener("click", () => {
    let tempText = fromText.value
    fromText.value = toText.value
    toText.value = tempText
    let tempLang = selectTag[0].value
    selectTag[0].value = selectTag[1].value
    selectTag[1].value = tempLang
});

// for translating the text

translateBtn.addEventListener("click", () => {

// for checking if the input field is empty
    if (fromText.value.trim() === "") {
        alert("Enter Text")
        toText.value = ''
    } 
    else {
        let text = fromText.value,
            translateFrom = selectTag[0].value,
            translateTo = selectTag[1].value,
            apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
        fetch(apiUrl).then(res => res.json()).then(data => {
            toText.value = data.responseData.translatedText
        })
    }
});

// for copying the text to user 

fromCopy.addEventListener("click", () => {
    navigator.clipboard.writeText(fromText.value)
});

toCopy.addEventListener("click", () => {
    navigator.clipboard.writeText(toText.value)
});

// for speech of text 

fromSpeech.addEventListener("click", () => {
    const utterance = new SpeechSynthesisUtterance(fromText.value);
    utterance.lang = selectTag[0].value; // Language from the first select
    speechSynthesis.speak(utterance);
});

toSpeech.addEventListener("click", () => {
    const utterance = new SpeechSynthesisUtterance(toText.value);
    utterance.lang = selectTag[1].value; // Language from the second select
    speechSynthesis.speak(utterance);
});