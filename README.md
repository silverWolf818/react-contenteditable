# React contenteditable

A simple component to make any element editable.

<img width="605" alt="image" src="https://github.com/silverWolf818/react-contenteditable/assets/7360502/60746930-6f71-418b-89b5-ddbe95dfc9fa">

# Usage

```jsx
const [value, setValue] = useState("Hello World")

return (
    <Contenteditable value={value} onChange={(event) => {
        setValue(event.currentTarget.innerHTML)
    }}/>
)
```
