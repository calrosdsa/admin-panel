import { DOTS, usePagination } from '@/utils/hooks/usePagination';


const Pagination = () => {
  const currentPage =  1
  const totalCount = 10
  const siblingCount =0;
  const pageSize =1
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
})

    return(
        <>      
            <div className='w-full items-center sm:justify-end flex space-x-3  px-1'> 
            <span className='iconM'  />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>

              {paginationRange != undefined&&
               paginationRange.map(pageNumber => {

                  if (pageNumber === DOTS) {
                      return <span key={pageNumber} className="text-2xl px-2">{DOTS}</span>;
                    }

                return (
                <span key={pageNumber}
                className={` ${currentPage != pageNumber ?
                    'button bg-white text-black border-[2px]':"border-[2px] border-primary button text-primary"}`}
                
                >
                    {pageNumber}
                </span>
                );
            })}
            <span className='iconM'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            </span>
            </div>
        </>
    )
}

export default Pagination;