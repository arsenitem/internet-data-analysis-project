import ccxt
import concurrent.futures
import threading
import logging

import websockets
import asyncio
import json
import os

kraken = ccxt.kraken()
binance = ccxt.binance()
ftx = ccxt.ftx()
bittrex = ccxt.bittrex()

def write_to_file(filename, data):
    file_dir = './data/{0}.txt'.format(filename)
    f = open(file_dir, "a+")
    f.write(data + "\n")
    f.close()

def fetch_binance(symbol):
    data = binance.fetch_ticker(symbol)
    write_to_file("binance", json.dumps(data))
    return data

def fetch_kraken(symbol):
    data = kraken.fetch_ticker(symbol)
    write_to_file("kraken", json.dumps(data))
    return data

def fecth_ftx(symbol):
    data =  ftx.fetch_ticker(symbol)
    write_to_file("ftx", json.dumps(data))
    return data

def fetch_bittrex(symbol):
    return bittrex.fetch_ticker(symbol)

def fetch_markets(symbol):
    ticker_binance = fetch_binance(symbol)
    ticker_kraken = fetch_kraken(symbol)
    ticker_ftx = fecth_ftx(symbol)
    data = {'binance': ticker_binance, 'kraken': ticker_kraken, 'ftx': ticker_ftx}
    js = json.dumps(data)
    return js

async def echo(websocket, path):
    async for message in websocket:
        print(message)
        js = fetch_markets(message)
        await websocket.send(js)

asyncio.get_event_loop().run_until_complete(
    websockets.serve(echo, 'localhost', 8765))
asyncio.get_event_loop().run_forever()