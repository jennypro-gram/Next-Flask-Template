import { useState } from "react";
import { addToList } from "../../Fetching";

export function AddToList() {
    const [addValue, setAddValue] = useState("");
    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            if (addValue !== "") {
                const serverResponse = await addToList({
                    message: addValue,
                });
                console.log(
                    `Add To List Api: ${serverResponse.status}, ${serverResponse.statusText}`
                );
            } else {
                console.log("Invalid input: cannot be empty");
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <form onSubmit={handleAddSubmit}>
                <input
                    type="text"
                    placeholder="Message to add to list"
                    value={addValue}
                    onChange={(e) => setAddValue(e.target.value)}
                ></input>
                <button type="submit">Add to List</button>
            </form>
        </div>
    );
}
