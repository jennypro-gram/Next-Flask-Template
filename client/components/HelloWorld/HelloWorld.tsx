import { useState } from "react";
import { helloWorld } from "../../Fetching";

export function HelloWorld() {
    const [message, setMessage] = useState("");
    const getHelloWorld = async () => {
        try {
            const serverResponse = await helloWorld(undefined);
            console.log(
                `Hello World Api: ${serverResponse.status}, ${serverResponse.statusText}`
            );
            setMessage(serverResponse.data.message);
        } catch (err: unknown) {
            console.log(err);
        }
    };
    return (
        <div>
            <button onClick={getHelloWorld}>Click</button>
            {message}
        </div>
    );
}
