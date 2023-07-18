const PaginationButtons = ({handlePageClick, pageNumber, data}) => {
    return (
    <>
        <button 
            className={`btn btn-primary ${pageNumber === 1 ? 'active' : ''}`} 
            onClick={() => handlePageClick(1)}
        >
            1
        </button>
        <button 
            className={`btn btn-primary ${pageNumber === 2 ? 'active' : ''}`}
            onClick={() => handlePageClick(2)}
        >
            2
        </button>
        <button 
            className={`btn btn-primary ${pageNumber === 3 ? 'active' : ''}`}
            onClick={() => handlePageClick(3)}
        >
            3
        </button>
        <button 
            className={`btn btn-primary ${pageNumber === 4 ? 'active' : ''}`}
            onClick={() => handlePageClick(4)}
        >
            4
        </button>
        <button 
            className={`btn btn-primary ${pageNumber === 5 ? 'active' : ''}`}
            onClick={() => handlePageClick(5)}
        >
            5
        </button>
    </>
  )
}

export default PaginationButtons
