import { useState } from "react";
import { useAuth } from "../context/auth.context";
import { useItem } from "../context/item.context";

const Panel = () => {
    const { user } = useAuth();
    const { addItem } = useItem();

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        image: "",
        category: "",
        sizes: "",
        colors: "",
        inStock: false,
    });

    if (!user) {
        return <p>Loading...</p>;
    }

    const isAdmin = user.isAdmin === true;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({...prev, [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const itemData = {
            name: formData.name,
            price: Number(formData.price),
            description: formData.description,
            category: formData.category,
            inStock: formData.inStock,
            image: formData.image
                .split(",")
                .map((img) => img.trim())
                .filter(Boolean),
            sizes: formData.sizes
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            colors: formData.colors
                .split(",")
                .map((c) => c.trim())
                .filter(Boolean),
        };

        await addItem(itemData);

        // reset form
        setFormData({
            name: "",
            price: "",
            description: "",
            image: "",
            category: "",
            sizes: "",
            colors: "",
            inStock: false,
        });
    };

    return (
        <>
            <p>Account:</p>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <p>{isAdmin ? "Admin" : "User"}</p>

            {isAdmin && (
                <>
                    <h2>Add New Item</h2>

                    <form onSubmit={handleSubmit}>
                        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />

                        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />

                        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />

                        <input type="text" name="image" placeholder="Image URLs (comma separated)" value={formData.image} onChange={handleChange} />

                        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />

                        <input type="text" name="sizes" placeholder="Sizes (comma separated)" value={formData.sizes} onChange={handleChange} />
                        <input type="text" name="colors" placeholder="Colors (comma separated)" value={formData.colors} onChange={handleChange} />

                        <label>
                            In Stock:
                            <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleChange} />
                        </label>

                        <button type="submit">Add Item</button>
                    </form>
                </>
            )}
        </>
    );
};

export default Panel;
