//import express 和 ws 套件
const express = require('express')
const SocketServer = require('ws').Server
const PORT = 3000 //指定 port

//創建 express 物件，綁定監聽  port , 設定開啟後在 console 中提示
const server = express().listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
//將 express 交給 SocketServer 開啟 WebSocket 的服務
const wss = new SocketServer({ server })
//當有 client 連線成功時
wss.on('connection', ws => {
  console.log('Client connected')
  // 當收到client消息時
  ws.on('message', data => {
    // 收回來是 Buffer 格式、需轉成字串
    data = data.toString()  
    console.log(data) // 可在 terminal 看收到的訊息

    var obj = JSON.parse(data);
    if(obj.action = "p2s") {  // player to servers
      obj.action = "s2c";     // server to scene

      if(obj.playerAction = "attack") {
        obj.playerMessage = obj.playerName + " 對 史萊姆 攻擊造成 " + (Math.floor(Math.random() * 10) + 1) + " 點物理傷害";
      } else if(obj.playerAction = "superAttack") {
        obj.playerMessage = obj.playerName + " 對 史萊姆 使用 迴旋斬 造成 " + (Math.floor(Math.random() * 50) + 20) + " 點物理傷害";

      }

      else if(obj.playerAction = "fire") {
        obj.playerMessage = obj.playerName + " 對 史萊姆 使用 ファイア 造成 " + (Math.floor(Math.random() * 10) + 1) + " 點魔法傷害";
      } else if(obj.playerAction = "fire2") {
        obj.playerMessage = obj.playerName + " 對 史萊姆 使用 ファイラ 造成 " + (Math.floor(Math.random() * 50) + 1) + " 點魔法傷害";
      } else if(obj.playerAction = "fire3") {
        obj.playerMessage = obj.playerName + " 對 史萊姆 使用 ファイガ 造成 " + (Math.floor(Math.random() * 100) + 50) + " 點魔法傷害";
      }
    }

    /// 發送消息給client 
    // ws.send(JSON.stringify(obj));

    /// 發送給所有client： 
    let clients = wss.clients  //取得所有連接中的 client
    clients.forEach(client => {
        client.send(JSON.stringify(obj));  // 發送至每個 client
    })
  })
  // 當連線關閉
  ws.on('close', () => {
    console.log('Close connected')
  })
})