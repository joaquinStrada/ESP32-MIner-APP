export const formValidate = {
    required: {
        value: true,
        message: 'Campo obligatorio'
    },
    minLength(value) {
        return {
            value,
            message: `El campo debe tener como minimo ${value} caracteres`
        }
    },
    maxLength(value) {
        return {
            value,
            message: `El campo debe tener como maximo ${value} caracteres`
        }
    },
    patternEmail: {
        value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
        message: 'Formato de email invalido'
    },
    asNumber: {
        value: true,
        message: 'El valor debe ser un numero'
    },
    minNumber(minValue) {
        return value => value < minValue ? `El valor minimo admitido es ${minValue}` : true
    },
    maxNumber(maxValue) {
        return value => value > maxValue ? `El valor maximo admitido es ${maxValue}` : true
    }
}