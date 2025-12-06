import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";
import { deletePost, getPost } from "../services/services";

// read opeartion
export default function Wrapper() {
    const [data, setData] = useState([]);
    const getApiData = async () => {
        try {
            const response = await getPost();
            setData(response.data.slice(0, 12));

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { getApiData() }, []);

    // delete operation
    const handelDeletePost = async (id) => {
        try {
            confirm("Are you shure ?")
            const response = await deletePost(id);
            if (response.status === 200) {
                const updatedData = data.filter((data)=>{
                    return (data.id !== id)
                })
                setData(updatedData);
            } else {
                throw new Error("There was connection error");

            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div
                className="
                    p-5
                    bg-white shadow-lg hover:shadow-2xl transition duration-300 flex flex-wrap items-center
                    justify-center gap-4 rounded-xl overflow-hidden border border-gray-200 w-full
                
                ">

                {
                    // mapping card component
                    data.map((data) =>
                        <div key={data.id} className="max-w-sm bg-white shadow-lg hover:shadow-2xl transition duration-300 rounded-xl overflow-hidden border border-gray-200">

                            {/* Card Header */}
                            <div className="bg-blue-600 text-white text-lg font-semibold px-4 py-2">
                                {data.title}
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {data.body}
                                </p>
                            </div>

                            {/* Footer */}
                            <div className="p-4 flex justify-between">
                                <button className="text-blue-600 font-medium hover:text-blue-800">Edit</button>
                                <button className="text-red-600 font-medium hover:text-red-800" onClick={()=>handelDeletePost(data.id)}>Delete</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}