
import { Button } from './Button';


interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;

  nextPage: () => void;
  prevPage: () => void;
}

const PaginationControls = ({ currentPage, totalPages, nextPage, prevPage }: PaginationControlsProps) => {
    

    return (
        <div className="flex justify-center items-center gap-4 mt-4 ">
            <Button type="button" onClick={prevPage} variant="ghost" disabled={currentPage === 1}>Anterior</Button>
            <span className='text-primary' >
                {currentPage} / {totalPages}
            </span>
            <Button type="button" onClick={nextPage} variant="ghost" disabled={currentPage === totalPages}>Siguiente</Button>
        </div>
    )
}

export default PaginationControls
