import axios from "axios";
import { useState } from "react";

export const useRequest = ({ url, method, body }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            const response = await axios[method](url, body)
            return response.data
        } catch (err) {
            setErrors(
                <div className="alert alert-danger">
                    <h4>Ooooops...</h4>
                    <ul className="my-0">
                        {err.response.data.errors.map(err => <li key={err.message}>{err.message}</li>)}
                    </ul>
                </div>
            )
        }
    }

    return { doRequest, errors }
}