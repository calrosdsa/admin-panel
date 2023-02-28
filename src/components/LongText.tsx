import {useState } from 'react'

interface Props {
    content:string,
    limit:number
}

const LongText = ({ content,limit}:Props) => {
  const [showAll, setShowAll] = useState(false);

  const showMore = () => setShowAll(true);
  const showLess = () => setShowAll(false);
console.log(content)
  if (content.length <= limit) {
    // there is nothing more to show
    return <div>{content}</div>
  }
  if (showAll) {
    // We show the extended text and a link to reduce it
    return <p> 
      {content} 
      <span className="text-indigo-500  text-xs  px-2
           cursor-pointer underline" onClick={showLess}>Mostrar Menos</span>
    </p>
  }
  // In the final case, we show a text with ellipsis and a `Read more` button
  const toShow = content.substring(0, limit) + "...";
  return <p> 
    {toShow} 
    <span className="text-indigo-500  text-xs px-2
           cursor-pointer underline" onClick={showMore}>Mostrar Mas</span>
  </p>
}

export default LongText;