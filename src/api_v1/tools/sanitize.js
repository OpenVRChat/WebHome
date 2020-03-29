var subsetOfLanguages = {
    eng: "English",
    kor: "한국어",
    rus: "Русский",
    spa: "Español",
    por: "Português",
    zho: "中文",
    deu: "Deutsch",
    jpn: "日本語",
    fra: "Français",
    swe: "Svenska",
    nld: "Nederlands",
    pol: "Polski",
    dan: "Dansk",
    nor: "Norsk",
    ita: "Italiano",
    tha: "ภาษาไทย",
    fin: "Suomi",
    hun: "Magyar",
    ces: "Čeština",
    tur: "Türkçe",
    ara: "العربية"
},

validLanguageCodes = new Set(Object.keys(subsetOfLanguages)),

isValidLanguageCode = function(a) {
    return validLanguageCodes.has(a)
};

module.exports = {
    isValidLanguageCode: isValidLanguageCode,
    subsetOfLanguages: subsetOfLanguages,
    MAX_LANGUAGES: 3
};
