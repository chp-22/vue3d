/**
 * Websocket Client
 * 适用于双JSON消息格式
 *
 *
 * @constructor
 * @author feng yong
 *
 * -----  示例  ----：
 * const client = new WsClient();
 *
 * // 订阅
 * client.subscribe("vehicle", (event) => {
 *     console.log(event.header, event.data)
 * })
 *
 * // 连接
 * client.connect("ws://8.133.169.20:9056/ws/event")
 *
 * // 取消订阅
 * client.unsubscribe("point");
 *
 * // 断开连接
 * client.disconnect();
 *
 * // 检查是否连接
 * client.isActive();
 *
 */
export function WsClient() {
  this._url = null

  /**
     *
     * @type {WebSocket}
     * @private
     */
  this._client = null

  /**
     * 事件处理器集合
     * @type {EventHandler[]}
     */
  this._handlers = []

  /**
     * 心跳定时器
     * @type {number}
     * @private
     */
  this._hearteartInterval = -1

  /**
     * 订阅主题
     * @param topic {string}
     * @param callback {Function}
     */
  this.subscribe = (topic, callback) => {
    for (const item of this._handlers) {
      if (item.topic === topic) {
        return
      }
    }
    this._handlers.push(new EventHandler(topic, callback))
    this._sendTopics()
  }

  /**
     * 取消订阅
     * @param topic {string}
     */
  this.unsubscribe = (topic) => {
    this._handlers = this._handlers.filter(item => item.topic !== topic)
    this._sendTopics()
  }

  /**
     * 消息处理器数目
     * @returns {number}
     */
  this.size = () => {
    return this._handlers.length
  }

  /**
     * 触发事件
     * @param message {string} 事件消息
     */
  this.onEvent = (message) => {
    /** @type {Notification} */
    const notices = JSON.parse(message)

    for (const notice of notices) {
      const messageType = notice.type
      if (messageType) {
        this._handlers.forEach(handler => {
          if (handler.topic === messageType) {
            handler.onEvent({
              data: notice.content
            })
          }
        })
      }
    }
  }

  /**
     * 开始连接
     * @param url {string}
     */
  this.connect = (url) => {
    if (!(url || this._url)) {
      console.error('url 不能为空')
    }
    if (!url) {
      url = this._url
    }

    if (this.isActive()) {
      return
    }
    const client = new WebSocket(url)

    client.onmessage = ev => {
      this.onEvent(ev.data)
    }

    client.onerror = ev => {
      console.log('websocket error...')
    }

    client.onclose = ev => {
      console.log('websocket close...')
    }

    client.onopen = ev => {
      console.log('websocket open...')
      this._sendTopics()
    }
    this._client = client
    this._url = url
    this._heartbeat()
  }

  /**
     * 断开连接
     * @param timeout {number}
     */
  this.disconnect = (timeout) => {
    if (!Number.isInteger(timeout)) {
      timeout = 0
    }
    setTimeout(() => {
      this._disconnect()
    }, timeout)
  }

  this._disconnect = () => {
    const client = this._client
    if (this.isActive()) {
      client.close()
      clearInterval(this._hearteartInterval)
    }
  }

  this._sendTopics = () => {
    if (this.isActive()) {
      const topics = this._handlers.map(handler => handler.topic)
      this._client.send(JSON.stringify(topics))
    }
  }

  this._heartbeat = () => {
    const t = setInterval(() => {
      if (this.isActive()) {
        this._client.send('1')
      } else {
        clearInterval(t)
        this.connect(this._url)
      }
    }, 10 * 1000)

    this._hearteartInterval = t
  }

  /**
     * 是否保持连接
     * @return boolean
     */
  this.isActive = () => {
    const client = this._client
    return client != null && client.readyState === WebSocket.OPEN
  }
}

/**
 * 事件处理器
 * @param topic {string}
 * @param callback {Function}
 * @constructor
 */
export function EventHandler(topic, callback) {
  this.topic = topic
  this.callback = callback

  /**
     * 触发事件
     * @param event {Object}
     */
  this.onEvent = (event) => {
    this.callback(event)
  }
}

/**
 *
 * @param type  {string}
 * @param to    {string}
 * @param time  {string}
 * @param level {string}
 * @constructor
 */
export function Notification(type, to, time, level, content) {
  this.type = type
  this.to = to
  this.time = new Date(time)
  this.level = level
  this.content = content
}

export function buildWsUrl(path) {
  const loc = window.location
  if (loc.protocol === 'https:') {
    return 'wss://' + loc.host + path
  } else {
    return 'ws://' + loc.host + path
  }
}
