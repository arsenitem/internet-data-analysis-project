var socket = new WebSocket("ws://127.0.0.1:8765");
let binance_chart = new Chart("binance")
let k_chart = new Chart("kraken")
let ftx_chart = new Chart("ftx")
socket.onopen = function() {
    console.log("Соединение установлено.");
    socket.send("BTC/EUR");
    
};
  
socket.onclose = function(event) {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения'); // например, "убит" процесс сервера
    }
    console.log('Код: ' + event.code + ' причина: ' + event.reason);
};
  
socket.onmessage = function(event) {
   let data = JSON.parse(event.data)
   console.log(data)
   binance_chart.update(data.binance)
   k_chart.update(data.kraken)
   ftx_chart.update(data.ftx)
   
};
  
socket.onerror = function(error) {
    console.log("Ошибка " + error.message);
};
