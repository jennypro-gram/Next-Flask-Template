import { useState } from "react";
import { getList } from "../../Fetching";

export function DisplayList() {
    const [list, setList] = useState<(string | undefined | number)[]>([]);
    const parseList = async () => {
        try {
            const serverResponse = await getList();
            console.log(
                `Get List Api: ${serverResponse.status}, ${serverResponse.statusText}`
            );
            setList(Object.values(serverResponse.data[0]));
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <button onClick={parseList}>Show List</button>
            {list}
        </div>
    );
}
