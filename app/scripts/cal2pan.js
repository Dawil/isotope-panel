var fEveryone = 'http://www.google.com/calendar/feeds/notionparallax.co.uk_qmhf4kl37u706rhgtg1viachko%40group.calendar.google.com/public/basic';

document.write("hello!<br>");
document.write(fEveryone);

var xmlhttp;
xmlhttp=new XMLHttpRequest();
xmlhttp.open('GET', fEveryone, false);
xmlhttp.send();

document.write(xmlhttp.responseText() + "res");