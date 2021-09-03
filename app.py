import websockets
import asyncio
import os

connected = set()

async def echo(websocket, path):
    print("A client just connected")
    connected.add(websocket)

    try:
        async for message in websocket:
            print("Received message from client: " + message)
            for node in connected:
                await node.send(message)
    finally:
        connected.remove(websocket)

start_server = websockets.serve(echo, "", int(os.environ["PORT"]))
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()