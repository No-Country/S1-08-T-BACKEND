import { config } from 'dotenv'
config()

const {
  CLIEN_ID,
  PROJECT_ID,
  CLIENT_SECRET

} = process.env

export const client_secret_google = {
  client_id: CLIEN_ID,
  project_id: PROJECT_ID,
  client_secret: CLIENT_SECRET
 
}
