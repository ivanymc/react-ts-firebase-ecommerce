import React from 'react'
import { FilterState } from './ProductsFilter';
import { AiOutlineClose } from "../assets/Icon";

interface SelectedFilterProps {
  sortingBy: string;
  filterBy: FilterState[];
  removePriceFilter: (indexToRemove: number) => void;
  removeColorFilter: (indexToRemove: number, colorToRemove: string) => void;
  removeCategoryFilter: (indexToRemove: number, categoryToRemove: string) => void;
  removeFeaturesFilter: (indexToRemove: number) => void;
}

const SelectedFilter: React.FC<SelectedFilterProps> = ( { sortingBy, filterBy, removePriceFilter, removeColorFilter, removeCategoryFilter, removeFeaturesFilter } ) => {

  const sortedFilterBy = filterBy && filterBy.sort( (a, b) => {
    const order = ['PRICE', 'COLOR', 'CATEGORY', 'FEATURES'];
    return order.indexOf(a.filterMethod) - order.indexOf(b.filterMethod);
  } );

  // console.log("IVAN", sortedFilterBy)

  return (
    <>
      <div className='-ml-2'>
        
        { sortingBy && <div className='btn btn-ghost btn-xs justify-start'> Sort by: {sortingBy} </div> }
        { sortingBy && sortedFilterBy.length > 0 && <span> | </span> }

        { sortedFilterBy && sortedFilterBy.map( (filter, index) => (
          ( filter.filterMethod === "PRICE" && (filter.minPrice || filter.minPrice === 0) && filter.maxPrice )
            ? ( <div key={index} onClick={ () => removePriceFilter(index) } className='btn btn-ghost btn-xs justify-start'>
                { filter.filterMethod === "PRICE" &&  <> 
                  <span> £{ filter.minPrice } - £{ filter.maxPrice } </span>
                  <AiOutlineClose /> </> 
                }
              </div> )
            : null
        )) }

        { sortedFilterBy && sortedFilterBy.map((filter, index) => (
          ( filter.filterMethod === "COLOR" && filter.color && filter.color.length > 0)
            ? ( filter.color.map( (color, colorIndex) => (
                <div key={`${index}-${colorIndex}`} onClick={ () => removeColorFilter(index, color)} className='btn btn-ghost btn-xs justify-start'>
                  <span> {color} </span>
                  <AiOutlineClose />
                </div>
              )) )
            : null
        )) }

        { sortedFilterBy && sortedFilterBy.map((filter, index) => (
          (filter.filterMethod === "CATEGORY" && filter.category && filter.category.length > 0)
            ? ( filter.category.map( (category, categoryIndex) => (
                <div key={`${index}-${categoryIndex}`}  onClick={ () => removeCategoryFilter(index, category)} className='btn btn-ghost btn-xs justify-start'>
                  <span> {category} </span>
                  <AiOutlineClose />
                </div>
              )) )
            : null
        )) }

        { sortedFilterBy && sortedFilterBy.map( (filter, index) => (
          ( filter.filterMethod === "FEATURES" && filter.feature ) 
            ? ( <div key={index}  onClick={ () => removeFeaturesFilter(index) } className='btn btn-ghost btn-xs justify-start'>
                { filter.filterMethod === "FEATURES" && <> 
                  <span> { filter.feature } </span>
                  <AiOutlineClose /> </>
                }
              </div> )
            : null
        )) }

      </div>

          
    </>
  )
}

export default SelectedFilter