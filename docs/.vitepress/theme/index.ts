import DefaultTheme from 'vitepress/theme'
import DocsHome from './components/DocsHome.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DocsHome', DocsHome)
  },
}
