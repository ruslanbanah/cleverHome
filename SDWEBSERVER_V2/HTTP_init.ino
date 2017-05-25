
void HTTP_init(void) {
  // Включаем работу с файловой системой
  FSSD_init();
  
  // SSDP дескриптор
  HTTP.on("/description.xml", HTTP_GET, []() {
    SSDP.schema(HTTP.client());
  });
  //Создание ответа
  HTTP.on("/Reley", handle_Reley); // обрашение к реле через web интерфейс
  HTTP.on("/xml", handleXML); // формирование xml страницы для передачи данных в web интерфейс
 
  // Добавляем функцию Update для перезаписи прошивки
  update();
  // Запускаем HTTP сервер
  HTTP.begin();
}


void handleXML() {
  buildXML();
  HTTP.send(200, "text/xml", XML);
}
// создаем xml данные
void buildXML() {
  XML = "<?xml version='1.0'?>";
  XML += "<Donnees>";
  XML += "<response>";
  XML += millis2time();
  XML += "</response>";
  
  
  for (int i=0; i <= 16; i++){
  XML += "<D";
  XML += i;
  XML += ">";
  XML += digitalRead(i);
  XML += "</D";
  XML += i;
  XML += ">";      
   } 
  XML += "</Donnees>";
}
String millis2time() {
  String Time = "";
  unsigned long ss;
  byte mm, hh;
  ss = millis() / 1000;
  hh = ss / 3600;
  mm = (ss - hh * 3600) / 60;
  ss = (ss - hh * 3600) - mm * 60;
  if (hh < 10)Time += "0";
  Time += (String)hh + ":";
  if (mm < 10)Time += "0";
  Time += (String)mm + ":";
  if (ss < 10)Time += "0";
  Time += (String)ss;
  return Time;
}





