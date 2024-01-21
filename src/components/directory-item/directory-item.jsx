import CategoryItem from "../category-item/category-item-component"
import './directory-item.styles.scss';

const Directory=({categoryList})=>{
    return <div className="categories-container">
        {categoryList.map((item)=>{
         return <CategoryItem key={item.id} category={item}/>
        })}
      </div>
}
export default Directory;