import { useItem } from "../context/item.context";
import { useAuth } from "../context/auth.context";

const Items = () => {
    const { items, deleteItem, updateItem } = useItem();
    const { user } = useAuth();
    const isAdmin = user?.isAdmin === true;

    return (
        <>
            <h1>Items</h1>

            {
                items.length === 0 && (
                    <p>No items found</p>
                )
            }

            {
                items.map((item) => (
                    <div key={item._id}>
                        <img src={item.image[0]} alt={item.name} width="200" />
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                        <p>{item.description}</p>
                        <p>{item.category}</p>
                        <p>{item.sizes.join(", ")}</p>
                        <p>{item.colors.join(", ")}</p>
                        <p>{item.inStock ? "In Stock" : "Out of Stock"}</p>

                        {
                            isAdmin && (
                                <>
                                    <button onClick={() => updateItem(item._id)}>Update</button>
                                    <button onClick={() => deleteItem(item._id)}>Delete</button>
                                </>
                            )
                        }
                    </div>
                ))

            }

        </>
    );
};

export default Items;
