import ProductModal from "../Modals/Product.Modal.js"

export const getAllProducts = async (req, res) => {
    try {

        const allproducts = await ProductModal.find({}) //category: 'Shirt'

        if (allproducts?.length) {
            return res.status(200).json({ success: true, message: 'products found..', allproducts })
        }

        return res.status(404).json({ success: false, message: 'no products found..' })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const singleProducts = async (req, res) => {
    try {

        const { productId } = req.body;

        if (!productId) return res.status(404).json({ success: false, message: 'prodcut id required' })

        const singleProduct = await ProductModal.findById(productId).select('-description');  //if we want to exclude description 

        if (!singleProduct) return res.status(404).json({ success: false, message: 'product not found' })

        return res.status(200).json({ success: true, message: 'product found', singleProduct })


    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const addProducts = async (req, res) => {
    try {

        const { productName, productDescription, productPrice, productCategory, productImage, id } = req.body;

        if (!productName || !productDescription || !productPrice || !productCategory || !productImage || !id) return res.status(404).json({ success: false, message: 'all fields required' })

        const products = new ProductModal({
            name: productName,
            price: productPrice,
            description: productDescription,
            category: productCategory,
            image: productImage,
            userId: id
        })

        await products.save();

        return res.status(200).json({ success: true, message: "Product added successfully" })

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
    // return res.send('add products..')
}

export const filterProducts = async (req, res) => {

    try {
        const { skip = 0, page = 5, query, sorting } = req.body;

        //1 skip rkha aur 2 page rakha toh 5 shoes mai se 1 skip hoke 4 shoes mai se 2 dekhega shoes kyuki apan na limit mai page bheja hai mtlb ek page pe itna product hi show hoga asa show hota hai..

        const updatedQuery = { category: query };
        // updatedQuery.category = query;

        // console.log(updatedQuery, '- updatedQuery')

        const name = sorting.replace(/^-/, "");
        // const order = sorting[0] == "-"?"-":"";
        const order = sorting.startsWith("-") ? -1 : 1;

        // const updateSorting = {[name]:`${order}1`}
        const updateSorting = { [name]: order };

        console.log(updateSorting, '-updateSorting')

        const products = await ProductModal.find(updatedQuery).skip(skip).limit(page).sort(updateSorting);

        return res.status(200).json({ success: true, message: 'Products Found..', products })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'filter error', error: error.message })
    }

}
// to know who has added the product we need to store users id in our database..
// so we will build realtionship between user and product data model

// pagination: ek page pe kitna products show krna hai..
//  filter:

// single product mai sbse phele id lenge
// product modal mai id ke base pe find kro..findbyid
// agar product found return 200 else 404