import { okaidia } from '@uiw/codemirror-theme-okaidia';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
interface Props {
    value:string
    onChange:(value: any, viewUpdate: any)=>void
}
const extensions = [html()];

const CodeEditor = ({value,onChange}:Props)=>{

    return(
  <CodeMirror
      value={value || ''}
      className="text-base"
      extensions={extensions}
      theme={okaidia}
      onChange={onChange}
      height={'100vh'}
      />
    )
}

export default CodeEditor;