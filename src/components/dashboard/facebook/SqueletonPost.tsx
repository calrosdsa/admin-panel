

const EsqueletonPost = ()=>{

    return(
        <div role="status" className="max-w-xl animate-pulse  bg-white p-2">
    <div className="h-2.5 bg-gray-500 rounded-full  w-32 mb-2"></div>
    <div className="h-1.5 bg-gray-500 rounded-full  w-40 mb-3"></div>
    <div className="h-2 bg-gray-500 rounded-full  mb-2.5"></div>
    <div className="h-2 bg-gray-500 rounded-full  mr-4 mb-2.5"></div>
    <div className="h-2 bg-gray-500 rounded-full  mr-2 mb-2.5"></div>
    <div className="h-2 bg-gray-500 rounded-full  max-w-[300px] mb-2.5"></div>

    <div className="bg-gray-500  rounded-lg   h-[460px]"></div>

    <span className="sr-only">Loading...</span>
</div>
    )
}
export default EsqueletonPost