cd  %~dp0
jsduck.exe --config config-doc.json --output ../build-min/doc
echo �������ɾ�� template.html�µ�
echo //(function(){
echo   //  var protocol = (document.location.protocol === "https:") ? "https:" : "http:";
echo   //  document.write("<link href='"+protocol+"//fonts.googleapis.com/css?family=Exo' rel='stylesheet' type='text/css' />");
echo //})();