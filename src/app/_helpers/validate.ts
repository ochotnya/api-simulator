import Joi from 'joi'

const validate = <T>(data: unknown, schema: Joi.Schema): T => {
  const result = schema.validate(data)
  if (result.error) {
    throw new Error(result.error.message)
  }

  return result.value
}

export default validate
