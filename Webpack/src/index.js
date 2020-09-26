import {config} from './modules/config'
import AppService from "./modules/app.service";
import './modules/header.component'
import './css/styles.css'
import './scss/index.scss'

console.log(config.key)

const service = new AppService('Hello world')
service.log()
