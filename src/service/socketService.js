import io from 'socket.io-client'
import { StorageService } from '../service/StorageService.js'
const baseUrl = process.env.NODE_ENV === 'production' ? 'https://connect-i-app.herokuapp.com/' : '//localhost:3030/api/'



export const socketService = createSocketService()
// export const socketService = createDummySocketService()

window.socketService = socketService
const MSG_STORAGE_KEY = 'msgDB'

function createSocketService() {
  var socket
  const socketService = {
    setup() {
      socket = io.connect(baseUrl, { secure: true })
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb) {
      io(baseUrl).off(eventName, cb)
    },
    emit(eventName, data) {
      socket.emit(eventName, data)
    },
    terminate() {
      socket = null
    }
  }
  return socketService
}

// eslint-disable-next-line
function createDummySocketService() {
  var listenersMap = {}
  const socketService = {
    setup() {
      listenersMap = {}
    },
    terminate() {
      this.setup()
    },
    on(eventName, cb) {
      listenersMap[eventName] = [...(listenersMap[eventName]) || [], cb]
    },
    off(eventName, cb) {
      if (!listenersMap[eventName]) return
      listenersMap[eventName] = listenersMap[eventName].filter(l => l !== cb)
    },
    emit(eventName, data) {
      if (!listenersMap[eventName]) return
      listenersMap[eventName].forEach(listener => {
        listener(data)
      })
    },
    debugMsg() {
      this.emit('chat addMsg', { from: 'Someone', txt: 'Aha it worked!' })
    },
  }

  return socketService
}

export function saveMsgsToStorage(msgs) {
  StorageService.store(MSG_STORAGE_KEY, msgs)
}

export function getMsgsFromStorage() {
  return StorageService.load(MSG_STORAGE_KEY)
}

// Basic Tests
// function cb(x) {console.log(x)}
// socketService.on('baba', cb)
// socketService.emit('baba', 'DATA')
// socketService.off('baba', cb)
