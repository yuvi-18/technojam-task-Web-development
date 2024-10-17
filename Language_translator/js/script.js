const selectTag = document.querySelectorAll("select"),
fromText = document.querySelector(".textFrom"),
toText = document.querySelector(".textTo"),
translateBtn = document.querySelector("button");


selectTag.forEach((tag , id) => {
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
})

translateBtn.addEventListener("click", ()=>{
    let text = fromText.value,
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value,
    apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText
    });
})
