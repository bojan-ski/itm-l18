import { categoryList } from "../utils/categoryList"

const Categories = () => categoryList.map((category, idx) => {
    return <option key={idx} value={category}>
        {category}
    </option>
})

export default Categories