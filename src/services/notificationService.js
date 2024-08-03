import * as signalR from '@microsoft/signalr'

const createSignalRConnection = () => {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7036/notificationHub', {
      withCredentials: true
    })
    .withAutomaticReconnect()
    .build()

  connection.onclose(() => console.log('SignalR connection closed'))
  connection.onreconnecting(() => console.log('SignalR reconnecting'))
  connection.onreconnected(() => console.log('SignalR reconnected'))

  return connection
}

export default createSignalRConnection
