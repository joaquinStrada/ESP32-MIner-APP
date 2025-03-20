export const config = {
    imageProfile: {
        exts: ['jpg', 'jpeg', 'gif', 'png', 'bmp']
    },
    api: {
        host: process.env.REACT_APP_API_HOST || 'http://localhost:3000'
    },
    mqtt: {
        host: process.env.REACT_APP_MQTT_HOST || '127.0.0.1',
        port: process.env.REACT_APP_MQTT_PORT || 8083
    }
}