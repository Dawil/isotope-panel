function httpGet(theUrl) {
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function makeDateObject(icsDate) {
    //0123456789012345
    //20130402T230000Z

    var icsYear = icsDate.substring(0, 4);
    var icsMonth = icsDate.substring(4, 6) - 1; //months are zero based
    var icsDay = icsDate.substring(6, 8);
    var icsHours = icsDate.substring(9, 11);
    var icsMins = icsDate.substring(11, 13);
    //new Date(year, month, day, hours, minutes, seconds, milliseconds)
    var jsDate = new Date(icsYear, icsMonth, icsDay, icsHours - 9, icsMins, 0, 0);

    return jsDate;
}

function makePrettyDate(aDate) {
    var jsDatev = makeDateObject(aDate);
    return jsDatev;
}

function descriptionAndTags(desc) {
    var tagStartIndex = desc.indexOf("```");
    var tagEndIndex = desc.lastIndexOf("```");
    var rawTags = desc.substr(tagStartIndex, tagEndIndex);
    desc = desc.replace(rawTags, "");
    rawTags = rawTags.replace("```", "");
    rawTags = rawTags.replace("```", "");
    rawTags = rawTags.split(",");

    return [desc, rawTags];
}