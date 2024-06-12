export const config = {
    imageProfile: {
        exts: ['jpg', 'jpeg', 'gif', 'png', 'bmp']
    },
    api: {
        host: process.env.REACT_APP_API_HOST || 'http://localhost:3000'
    }
}