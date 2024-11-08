import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineUp, AiOutlineDown, FaSortAmountDown, FaSortAmountUp, FaRegStar, AiOutlineFilter, AiOutlineClose } from "../assets/Icon";
import { Product } from '../api/FirebaseContext';
import ShoppingList from './ShoppingList';
import SelectedFilter from './SelectedFilter';

interface ProductFilterProps {
  products: Product[]
}

export interface FilterState {
  filterMethod: string,
  minPrice?: number,
  maxPrice?: number,
  color?: string[],
  category?: string[],
  type?: string[],
  feature?: string,
}

const ProductsFilter: React.FC<ProductFilterProps> = ({ products }) => {  
  const [sortingBy, setSortingBy] = useState<string>("");
  const [filterBy, setFilterBy] = useState<FilterState[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  // const [optionsChecked, setOptionsChecked] = useState<boolean>(false); // todos
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const drawerLabelRef = useRef<HTMLLabelElement>(null);

  // Sorting products
  const setSortingMethod = ( sortingMethod: string) => {
    setSortingBy(sortingMethod);
    setIsDropdownOpen(false);
  }

  // Set dropdown arrow direction
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Clicking outside the menu to set dropdown close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownMenuRef.current && !dropdownMenuRef.current.contains(event.target as Node)) { setIsDropdownOpen(false); }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Set filter drawer close tab
  const closeDrawer = () => {
    drawerLabelRef.current ? drawerLabelRef.current.click() : null;
  }

  // Set Filter in the drawer
  const setFilterMethod = (filterMethod: string, e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    let target = e.target as HTMLInputElement;
    if (target && target.nextElementSibling instanceof HTMLElement) {
      let filterText = target.nextElementSibling.innerText;

      if (filterMethod === "PRICE") {
        let [minPriceStr, maxPriceStr] = filterText.split(" - ");
        let minPrice = parseFloat(minPriceStr.replace("£", ""));
        let maxPrice = parseFloat(maxPriceStr.replace("£", ""));
        filterBy && filterBy.length === 0
                    ? setFilterBy( [ { filterMethod, minPrice, maxPrice } ] )
                    : setFilterBy( prevFilters => {
                      let updatedFilters = prevFilters.filter(prevFilter => prevFilter.filterMethod !== "PRICE");
                      return [ ...updatedFilters, { filterMethod, minPrice, maxPrice } ];
                    });

      } else if (filterMethod === "COLOR") {
        let color = filterText;
        filterBy && filterBy.length === 0
                    ? setFilterBy( [ { filterMethod, color: [color] } ] )
                    : setFilterBy( prevFilters => {
                      let updatedFilters = prevFilters.filter(prevFilter => prevFilter.filterMethod !== "COLOR");
                      let prevColorsFilter = prevFilters.find(prevFilter => prevFilter.filterMethod === "COLOR");
                      let prevColors = prevColorsFilter ? prevColorsFilter.color : null;
                      // Update Color Array with no prevColor
                      let updatedColorArray = prevColors ? prevColors.filter(prevColor => prevColor !== color) : [];
                      if (!prevColors || prevColors.indexOf(color) === -1) { updatedColorArray.push(color); }
                      return [...updatedFilters, { filterMethod, color: updatedColorArray }];
                  });

      } else if (filterMethod === "CATEGORY") {
        let category = filterText;
        filterBy && filterBy.length === 0
                    ? setFilterBy( [ { filterMethod, category: [category] } ] )
                    : setFilterBy( prevFilters => {
                      let updatedFilters = prevFilters.filter(prevFilter => prevFilter.filterMethod !== "CATEGORY");
                      let prevCategoriesFilter = prevFilters.find(prevFilter => prevFilter.filterMethod === "CATEGORY");
                      let prevCategories = prevCategoriesFilter ? prevCategoriesFilter.category : null;
                      let updatedCategoryArray = prevCategories ? prevCategories.filter(prevCategory => prevCategory !== category) : [];
                      if (!prevCategories || prevCategories.indexOf(category) === -1) { updatedCategoryArray.push(category); }
                      return [...updatedFilters, { filterMethod, category: updatedCategoryArray }];
                  });
      } else if (filterMethod === "FEATURES") {
        let feature = filterText;
        setFilterBy(prevFilters => {
          const isFeatureSelected = prevFilters.some(filter => filter.filterMethod === "FEATURES" && filter.feature === feature);
          return isFeatureSelected
            ? prevFilters.filter(filter => !(filter.filterMethod === "FEATURES" && filter.feature === feature))
            : [...prevFilters, { filterMethod, feature: feature }];
        });
      }

    }
  }

  // Remove Filter
  const removePriceFilter = (indexToRemove: number) => {
    setFilterBy(prevFilters => prevFilters.filter( (_, index) => index !== indexToRemove));
    const radioInputs = document.querySelectorAll<HTMLInputElement>('input[type="radio"][name="PRICE"]');
    radioInputs.forEach(( input: HTMLInputElement) => { input.checked = false; } );
  };

  // to check to rework
  const removeColorFilter = (filterIndex: number, colorToRemove: string) => {
    setFilterBy(prevFilters => {
      const updatedFilters = prevFilters.map((filter, index) => {
        if (index === filterIndex && filter.filterMethod === "COLOR" && filter.color) {
          const updatedColors = filter.color.filter(color => color !== colorToRemove);
          if (updatedColors.length === 0) {
            const checkbox = document.querySelector<HTMLInputElement>(`input[type="checkbox"][name="COLOR"][value="${colorToRemove}"]`);
            if (checkbox) { checkbox.checked = false; }
            return null;
          } else if (!updatedColors.includes(colorToRemove)) {
            const checkbox = document.querySelector<HTMLInputElement>(`input[type="checkbox"][name="COLOR"][value="${colorToRemove}"]`);
            if (checkbox) { checkbox.checked = false; }
          }
          return { ...filter, color: updatedColors };
        }
        return filter;
      }).filter(filter => filter !== null) as FilterState[];
      return updatedFilters;
    });
  };

  const removeCategoryFilter = (filterIndex: number, categoryToRemove: string) => {
    setFilterBy(prevFilters => {
      const updatedFilters = prevFilters.map((filter, index) => {
        if (index === filterIndex && filter.filterMethod === "CATEGORY" && filter.category) {
          const updatedCategories = filter.category.filter(category => category !== categoryToRemove);
          if (updatedCategories.length === 0) {
            const checkbox = document.querySelector<HTMLInputElement>(`input[type="checkbox"][name="CATEGORY"][value="${categoryToRemove}"]`);
            if (checkbox) { checkbox.checked = false; }
            return null;
          } else if (!updatedCategories.includes(categoryToRemove)) {
            const checkbox = document.querySelector<HTMLInputElement>(`input[type="checkbox"][name="CATEGORY"][value="${categoryToRemove}"]`);
            if (checkbox) { checkbox.checked = false; }
          }
          return { ...filter, category: updatedCategories };
        }
        return filter;
      }).filter(filter => filter !== null) as FilterState[];
      return updatedFilters;
    });
  };

  const removeFeaturesFilter = (indexToRemove: number) => {
    setFilterBy(prevFilters => prevFilters.filter( (_, index) => index !== indexToRemove));
    const checkboxInputs = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"][name="FEATURES"]');
    checkboxInputs.forEach( (input: HTMLInputElement) => { input.checked = false; } );
  };



  

  return (
    <>
      <div className='flex items-center justify-between'>
        <div className='' ref={dropdownMenuRef}>
            <button onClick={toggleDropdown} className="flex items-center align-middle">
              <span className='mr-1.5'>Sort by </span>
              { isDropdownOpen ? <AiOutlineUp /> : <AiOutlineDown /> }
            </button>
            { isDropdownOpen && (
              <ul className="menu menu-sm dropdown-content absolute z-40 shadow bg-base-100 rounded-box w-36 p-0 py-1.5 -ml-1 mt-2">
                <li onClick={ () => {setSortingMethod("Rating")} } ><a>
                  <FaRegStar />
                  <span> Rating </span>
                </a></li>
                <li onClick={ () => {setSortingMethod("Lowest Price")} }><a>
                  <FaSortAmountUp />
                  <span> Lowest Price </span>
                </a></li>
                <li onClick={ () => {setSortingMethod("Highest Price")} }><a>
                  <FaSortAmountDown />
                  <span> Highest Price </span>
                </a></li>
              </ul>
            ) }
        </div>

        <div className="drawer-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label ref={drawerLabelRef} htmlFor="my-drawer-4" className="flex items-center justify-end">
              <div className='flex items-center'>
                <span className='cursor-pointer pr-1'> Filter </span>
                <AiOutlineFilter className='w-5 h-5 cursor-pointer'/>
              </div>
            </label>
          </div> 
          
          <div className="drawer-side z-50">
            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-11/12 sm:w-80 min-h-full bg-base-100 text-base-content">

            <div className="grid grid-cols-12">
              <div className="col-span-11 ml-1">
                {/* <button onClick={ () => {
                  setFilterBy([])
                  setOptionsChecked(false)
                  } } className="btn btn-xs"> Reset All Filter </button> */}
              </div>
              <div>
                <AiOutlineClose onClick={closeDrawer} className='cursor-pointer mr-1 w-5 h-5'/>
              </div>
            </div>


            {/* TodO: remove filter, drawer input show sync */}
              <details id="priceFilter" className="group mb-2" open>
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2  divider">
                  <span className="text-sm font-medium "> Price </span>
                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </summary>                
                  <div className="grid grid-cols-2">
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input onClick={ e => setFilterMethod("PRICE", e) } type="radio" name="PRICE" value="£0 - £9.9" className="radio radio-xs mr-2 text-gray-200"/>
                        <span className="label-text mr-auto"> £0 - £9.9 </span> 
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input onClick={ e => setFilterMethod("PRICE", e) } type="radio" name="PRICE" value="£10 - £19.9" className="radio radio-xs mr-2 text-gray-200"/>
                        <span className="label-text mr-auto"> £10 - £19.9 </span> 
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input onClick={ e => setFilterMethod("PRICE", e) } type="radio" name="PRICE" value="£20 - £29.9" className="radio radio-xs mr-2 text-gray-200"/>
                        <span className="label-text mr-auto"> £20 - £29.9 </span> 
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input onClick={ e => setFilterMethod("PRICE", e) } type="radio" name="PRICE" value="£30 - £39.9" className="radio radio-xs mr-2 text-gray-200"/>
                        <span className="label-text mr-auto"> £30 - £39.9 </span> 
                      </label>
                    </div>
                  </div>
              </details>

              <details id="colorFilter" className="group mb-2" open>
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2  divider">
                  <span className="text-sm font-medium "> Color </span>
                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </summary>                
                  <div className="grid grid-cols-2"> 
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input onClick={ e => setFilterMethod("COLOR", e) } type="checkbox" name="COLOR" value="Black" className="checkbox checkbox-xs mr-2 text-black checked:bg-black bg-black"/>
                        <span className="label-text mr-auto"> Black </span> 
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input onClick={ e => setFilterMethod("COLOR", e) } type="checkbox" name="COLOR" value="White" className="checkbox checkbox-xs mr-2 text-white checked:bg-white bg-white"/>
                        <span className="label-text mr-auto"> White </span> 
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input onClick={ e => setFilterMethod("COLOR", e) } type="checkbox" name="COLOR" value="Yellow" className="checkbox checkbox-xs mr-2 text-yellow-600 checked:bg-yellow-600 bg-yellow-600"/>
                        <span className="label-text mr-auto"> Yellow </span>  
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input onClick={ e => setFilterMethod("COLOR", e) } type="checkbox" name="COLOR" value="Red" className="checkbox checkbox-xs mr-2 text-red-600 checked:bg-red-600 bg-red-600"/>
                        <span className="label-text mr-auto"> Red </span> 
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input onClick={ e => setFilterMethod("COLOR", e) } type="checkbox" name="COLOR" value="Blue" className="checkbox checkbox-xs mr-2 text-blue-600 checked:bg-blue-600 bg-blue-600"/>
                        <span className="label-text mr-auto"> Blue </span> 
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input onClick={ e => setFilterMethod("COLOR", e) } type="checkbox" name="COLOR" value="Orange" className="checkbox checkbox-xs mr-2 text-orange-600 checked:bg-orange-600 bg-orange-600"/>
                        <span className="label-text mr-auto"> Orange </span> 
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input onClick={ e => setFilterMethod("COLOR", e) } type="checkbox" name="COLOR" value="Green" className="checkbox checkbox-xs mr-2 text-green-600 checked:bg-green-600 bg-green-600"/>
                        <span className="label-text mr-auto"> Green </span> 
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input onClick={ e => setFilterMethod("COLOR", e) } type="checkbox" name="COLOR" value="Purple" className="checkbox checkbox-xs mr-2 text-purple-600 checked:bg-purple-600 bg-purple-600"/>
                        <span className="label-text mr-auto"> Purple </span> 
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input onClick={ e => setFilterMethod("COLOR", e) } type="checkbox" name="COLOR" value="Gray" className="checkbox checkbox-xs mr-2 text-gray-600 checked:bg-gray-600 bg-gray-600"/>
                        <span className="label-text mr-auto"> Gray </span> 
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input onClick={ e => setFilterMethod("COLOR", e) } type="checkbox" name="COLOR" value="Brown" className="checkbox checkbox-xs mr-2 text-yellow-800 checked:bg-yellow-800 bg-yellow-800"/>
                        <span className="label-text mr-auto"> Brown </span> 
                      </label>
                    </div>
                  </div>
              </details>

              <details id="categoryFilter" className="group mb-2" open>
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2  divider">
                  <span className="text-sm font-medium "> Category </span>
                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </summary>                
                  <div className="grid grid-cols-2"> 
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input onClick={ e => setFilterMethod("CATEGORY", e) } type="checkbox" value="Tshirt" name="CATEGORY" className="checkbox checkbox-xs mr-2 text-gray-200"/>
                        <span className="label-text mr-auto"> Tshirt </span> 
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input onClick={ e => setFilterMethod("CATEGORY", e) } type="checkbox" value="Shirt" name="CATEGORY" className="checkbox checkbox-xs mr-2 text-gray-200"/>
                        <span className="label-text mr-auto"> Shirt </span> 
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input onClick={ e => setFilterMethod("CATEGORY", e) } type="checkbox" value="Dresses" name="CATEGORY" className="checkbox checkbox-xs mr-2 text-gray-200"/>
                        <span className="label-text mr-auto"> Dresses </span> 
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input onClick={ e => setFilterMethod("CATEGORY", e) } type="checkbox" value="Trousers" name="CATEGORY" className="checkbox checkbox-xs mr-2 text-gray-200"/>
                        <span className="label-text mr-auto"> Trousers </span> 
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input onClick={ e => setFilterMethod("CATEGORY", e) } type="checkbox" value="Jacket" name="CATEGORY" className="checkbox checkbox-xs mr-2 text-gray-200"/>
                        <span className="label-text mr-auto"> Jacket </span> 
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input onClick={ e => setFilterMethod("CATEGORY", e) } type="checkbox" value="Hat" name="CATEGORY" className="checkbox checkbox-xs mr-2 text-gray-200"/>
                        <span className="label-text mr-auto"> Hat </span> 
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input onClick={ e => setFilterMethod("CATEGORY", e) } type="checkbox" value="Bag" name="CATEGORY" className="checkbox checkbox-xs mr-2 text-gray-200"/>
                        <span className="label-text mr-auto"> Bag </span> 
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input onClick={ e => setFilterMethod("CATEGORY", e) } type="checkbox" value="Shoe" name="CATEGORY" className="checkbox checkbox-xs mr-2 text-gray-200"/>
                        <span className="label-text mr-auto"> Shoe </span> 
                      </label>
                    </div>
                  </div>
              </details>

              <details id="featuresFilter" className="group mb-2" open>
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2  divider">
                  <span className="text-sm font-medium "> Features </span>
                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </summary>                
                  <div className="grid grid-cols-2"> 
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <input onClick={ e => setFilterMethod("FEATURES", e) } type="checkbox" name="FEATURES" value="New Arrivals" className="checkbox checkbox-xs mr-2 text-gray-200"/>
                        <span className="label-text mr-auto"> New Arrivals </span> 
                      </label>
                    </div>
                  </div>
              </details>

            </ul>
          </div>

        </div>

      </div>

      <div className="mt-2 mb-4"> <SelectedFilter sortingBy={sortingBy} filterBy={filterBy} removePriceFilter={removePriceFilter} removeColorFilter={removeColorFilter} removeCategoryFilter={removeCategoryFilter} removeFeaturesFilter={removeFeaturesFilter} /> </div>
      <div className='mt-2'> <ShoppingList products={products} sortingBy={sortingBy} filterBy={filterBy} /> </div>
    </>
  )
}

export default ProductsFilter
