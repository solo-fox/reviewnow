const { exec } = require('child_process')

const PROJECT_REF = 'obxpomwskhwjnngpqkmf'
const OUTPUT_FILE = 'database.types.ts'

const command = `npx supabase gen types typescript --project-id "${PROJECT_REF}" --schema public > ${OUTPUT_FILE}`

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing command: ${error.message}`)
    return
  }

  if (stderr) {
    console.error(`Error output: ${stderr}`)
    return
  }

  console.log(`Database types written to ${OUTPUT_FILE}`)
})
