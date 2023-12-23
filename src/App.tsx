import Contenteditable from './react-contenteditable'
import {useState} from 'react'
import './global.css'

function App() {
    const [value, setValue] = useState("Hello World")

    return (
        <Contenteditable className={'input'} value={value} onChange={(event) => {
            setValue(event.currentTarget.innerHTML)
        }}/>
    )
}

export default App
