const openai = require('./api/openai.cjs')

async function createFineTune() {
  try {
    const response = await openai.createFineTune({
      training_file: 'file-yrUwTAd3xiRQi4CXBr914uJz',
      model: 'davinci'
    })
    console.log('response: ', response)
  } catch (err) {
    console.log('error: ', err.response.data.error)
  }
}

createFineTune()