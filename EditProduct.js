
import React,{ useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditProduct = () => {
    const navigate = useNavigate();
    const params = useParams();

    const userDetails = JSON.parse(localStorage.getItem("loggedInUser")) || [];

    const userId = userDetails.id;

    const userProducts = JSON.parse(localStorage.getItem(userId));
    
    const productToEdit = userProducts.find((product) => product.id == params.id);
    
    const [formData, setFormData] = useState({
         title: productToEdit.title,
         price: productToEdit.price
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
        console.log(formData);
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        const productIndex = userProducts.findIndex((product) => product.id == params.id);

        const updatedUserProducts = [...userProducts];
        updatedUserProducts[productIndex] = {
          ...productToEdit,
          ...formData,
        };

        console.log(updatedUserProducts);
    
        localStorage.setItem(userId, JSON.stringify(updatedUserProducts));
        navigate('/dashboard')
}
return (
    <div className="container"> 
    
    <form onSubmit={handleSubmit} className="text-white p-5">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Product Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Product Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
     
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
    </form>

    </div>
  )

}

export default EditProduct
