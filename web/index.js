
let binance_chart = new Chart("binance")
let k_chart = new Chart("kraken")
let ftx_chart = new Chart("ftx")
let socket = new WebSocket("ws://127.0.0.1:8765");
let symbol = "BTC/USDT"


socket.onopen = function() {

  document.getElementById("btn").addEventListener("click", function() {
    symbol = document.getElementById("select-symbol").value
    binance_chart.setData()
    k_chart.setData()
    ftx_chart.setData()
    socket.send(symbol);
  })
  
}

socket.onmessage = function(event) {
  console.log("received message")
   let data = JSON.parse(event.data)
   binance_chart.update(data.binance)
   k_chart.update(data.kraken)
   ftx_chart.update(data.ftx)
   socket.send(symbol);
};

